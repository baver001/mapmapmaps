/**
 * Build a free Mapillary 360° seed DB for GeoGuessr-like random rounds.
 * Usage: node scripts/build-seeds.mjs
 * Needs MAPILLARY_ACCESS_TOKEN in env or .dev.vars
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadToken() {
  if (process.env.MAPILLARY_ACCESS_TOKEN) return process.env.MAPILLARY_ACCESS_TOKEN;
  try {
    const raw = readFileSync(resolve(root, ".dev.vars"), "utf8");
    const line = raw.split(/\r?\n/).find((l) => l.startsWith("MAPILLARY_ACCESS_TOKEN="));
    if (line) return line.split("=").slice(1).join("=").trim();
  } catch {
    /* ignore */
  }
  throw new Error("Set MAPILLARY_ACCESS_TOKEN or create .dev.vars");
}

/** City hubs with multiple offsets (degrees) to sample different streets. */
const HUBS = [
  // Europe
  [48.8566, 2.3522], [48.8738, 2.295], [48.8606, 2.3376], // Paris
  [51.5074, -0.1278], [51.5155, -0.0922], [51.5033, -0.1195], // London
  [52.52, 13.405], [52.5163, 13.3777], [52.5074, 13.3903], // Berlin
  [52.3676, 4.9041], [52.3731, 4.8922], // Amsterdam
  [50.8503, 4.3517], [50.8466, 4.3528], // Brussels
  [41.9028, 12.4964], [41.8902, 12.4922], [41.9009, 12.4833], // Rome
  [45.4642, 9.19], [45.4654, 9.1859], // Milan
  [41.3851, 2.1734], [41.4036, 2.1744], // Barcelona
  [40.4168, -3.7038], [40.415, -3.684], // Madrid
  [38.7223, -9.1393], [38.7108, -9.1403], // Lisbon
  [55.6761, 12.5683], [55.6794, 12.5806], // Copenhagen
  [59.3293, 18.0686], [59.3251, 18.0709], // Stockholm
  [59.9139, 10.7522], // Oslo
  [60.1699, 24.9384], // Helsinki
  [48.2082, 16.3738], [48.2038, 16.369], // Vienna
  [47.3769, 8.5417], // Zurich
  [50.0755, 14.4378], [50.087, 14.421], // Prague
  [47.4979, 19.0402], // Budapest
  [52.2297, 21.0122], [50.0647, 19.945], // Warsaw / Krakow
  [53.3498, -6.2603], [55.9533, -3.1883], // Dublin / Edinburgh
  [55.7558, 37.6173], [55.76, 37.618], [55.7512, 37.6184], // Moscow
  [41.0082, 28.9784], [41.0369, 28.985], // Istanbul
  // Americas
  [40.7614, -73.9776], [40.7308, -73.9973], [40.7484, -73.9857], [40.7061, -74.0087], // NYC
  [37.7749, -122.4194], [37.7849, -122.4094], [37.7955, -122.3937], // SF
  [34.0522, -118.2437], [34.0407, -118.2468], [34.1016, -118.3267], // LA
  [41.8781, -87.6298], [41.8827, -87.6233], // Chicago
  [47.6062, -122.3321], [47.61, -122.34], // Seattle
  [25.7617, -80.1918], [29.7604, -95.3698], // Miami / Houston
  [43.6532, -79.3832], [45.5017, -73.5673], [49.2827, -123.1207], // Canada
  [-23.5505, -46.6333], [-22.9068, -43.1729], [-34.6037, -58.3816], // SA
  [19.4326, -99.1332], // Mexico City
  // Asia / Oceania / Africa / ME
  [35.6595, 139.7005], [35.6812, 139.7671], [35.7101, 139.8107], // Tokyo
  [22.2819, 114.158], [22.3193, 114.1694], // HK
  [1.3048, 103.8318], [1.2806, 103.8501], // Singapore
  [13.7563, 100.5018], [13.746, 100.534], // Bangkok
  [25.2048, 55.2708], [25.1972, 55.2744], // Dubai
  [31.2304, 121.4737], [39.9163, 116.3972], // Shanghai / Beijing
  [19.0596, 72.8295], [28.6328, 77.2197], // Mumbai / Delhi
  [-33.8688, 151.2093], [-37.8136, 144.9631], // Sydney / Melbourne
  [-26.2041, 28.0473], [30.0444, 31.2357], [-1.2864, 36.8172], // Africa
];

const OFFSETS = [
  [0, 0],
  [0.0015, 0],
  [-0.0015, 0],
  [0, 0.0015],
  [0, -0.0015],
  [0.001, 0.001],
  [-0.001, 0.001],
  [0.002, -0.001],
  [-0.002, 0.002],
];

const token = loadToken();
const seeds = new Map();
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchNear(lat, lng) {
  const url =
    `https://graph.mapillary.com/images` +
    `?access_token=${encodeURIComponent(token)}` +
    `&fields=id,geometry,is_pano,camera_type` +
    `&lat=${lat}&lng=${lng}&radius=50&limit=10`;
  const res = await fetch(url, {
    headers: { "User-Agent": "MapMapMaps-seed-builder/1.0" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text.slice(0, 120)}`);
  }
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

function isPano(img) {
  return (
    img.is_pano === true ||
    img.camera_type === "spherical" ||
    img.camera_type === "equirectangular"
  );
}

let calls = 0;
let hits = 0;

for (const [baseLat, baseLng] of HUBS) {
  for (const [dLat, dLng] of OFFSETS) {
    const lat = baseLat + dLat;
    const lng = baseLng + dLng;
    calls++;
    try {
      const images = await fetchNear(lat, lng);
      for (const img of images) {
        if (!isPano(img) || !img.geometry?.coordinates) continue;
        const [ilng, ilat] = img.geometry.coordinates;
        const id = String(img.id);
        if (!seeds.has(id)) {
          seeds.set(id, { id, lat: ilat, lng: ilng });
          hits++;
        }
      }
      process.stdout.write(
        `\rHubs scanned… calls=${calls} unique360=${seeds.size}   `
      );
    } catch (err) {
      process.stdout.write(`\nskip ${lat},${lng}: ${err.message}\n`);
    }
    await delay(120); // stay polite under free rate limits
  }
}

const list = [...seeds.values()];
mkdirSync(resolve(root, "data"), { recursive: true });
const out = {
  version: 1,
  source: "mapillary",
  onlyPano: true,
  generatedAt: new Date().toISOString(),
  count: list.length,
  seeds: list,
};
const path = resolve(root, "data", "seeds.json");
writeFileSync(path, JSON.stringify(out));
console.log(`\nWrote ${list.length} seeds → ${path}`);
