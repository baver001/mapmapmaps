/**
 * Shared Mapillary API logic (VPS Node + Cloudflare Pages Functions).
 */

const MAX_LIVE_ATTEMPTS = 10;

const HUBS = [
  [48.8566, 2.3522],
  [51.5074, -0.1278],
  [52.52, 13.405],
  [40.7614, -73.9776],
  [37.7749, -122.4194],
  [35.6595, 139.7005],
  [13.7563, 100.5018],
  [45.4642, 9.19],
  [41.9028, 12.4964],
  [55.7539, 37.6208],
  [50.0755, 14.4378],
  [47.4979, 19.0402],
  [43.6532, -79.3832],
  [49.2827, -123.1207],
  [25.2048, 55.2708],
  [-23.5505, -46.6333],
  [-34.6037, -58.3816],
  [1.3048, 103.8318],
  [-33.8688, 151.2093],
  [47.6062, -122.3321],
];

function isPano(img) {
  return (
    img.is_pano === true ||
    img.camera_type === "spherical" ||
    img.camera_type === "equirectangular"
  );
}

function toPayload(image) {
  const [lng, lat] = image.geometry?.coordinates || [null, null];
  return {
    id: String(image.id),
    lat,
    lng,
    isPano: true,
  };
}

function pickSeed(seeds) {
  return seeds[Math.floor(Math.random() * seeds.length)];
}

async function fetchNear(token, lat, lng) {
  const url =
    `https://graph.mapillary.com/images` +
    `?access_token=${encodeURIComponent(token)}` +
    `&fields=id,geometry,is_pano,camera_type` +
    `&lat=${lat}&lng=${lng}&radius=50&limit=10`;

  const response = await fetch(url, {
    headers: { "User-Agent": "MapMapMaps/1.2 (free-tier)" },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error?.message || `Mapillary HTTP ${response.status}`);
  }
  return Array.isArray(data.data) ? data.data : [];
}

async function livePanoFallback(token) {
  for (let i = 0; i < MAX_LIVE_ATTEMPTS; i++) {
    const hub = HUBS[Math.floor(Math.random() * HUBS.length)];
    const lat = hub[0] + (Math.random() - 0.5) * 0.004;
    const lng = hub[1] + (Math.random() - 0.5) * 0.004;
    try {
      const images = await fetchNear(token, lat, lng);
      const panos = images.filter(isPano);
      if (!panos.length) continue;
      const chosen = panos[Math.floor(Math.random() * panos.length)];
      const payload = toPayload(chosen);
      if (payload.lat != null && payload.lng != null) return payload;
    } catch {
      /* try next hub */
    }
  }
  throw new Error("No 360° Mapillary imagery found");
}

async function randomRound(loadSeeds, token) {
  try {
    const seeds = await loadSeeds();
    const seed = pickSeed(seeds);
    return {
      id: String(seed.id),
      lat: seed.lat,
      lng: seed.lng,
      isPano: true,
      source: "seed",
    };
  } catch (seedErr) {
    const live = await livePanoFallback(token);
    return { ...live, source: "live", seedError: seedErr.message };
  }
}

/**
 * @param {{ action: string, token: string | null, loadSeeds: () => Promise<object[]> }}
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function handleMapillaryAction({ action, token, loadSeeds }) {
  if (!token) {
    return {
      status: 500,
      body: {
        error:
          "MAPILLARY_ACCESS_TOKEN is not configured. Set env on VPS or use .dev.vars locally.",
      },
    };
  }

  try {
    if (action === "config") {
      return {
        status: 200,
        body: { accessToken: token, provider: "mapillary", onlyPano: true },
      };
    }

    if (action === "stats") {
      try {
        const seeds = await loadSeeds();
        return { status: 200, body: { seedCount: seeds.length, onlyPano: true } };
      } catch (e) {
        return { status: 200, body: { seedCount: 0, error: e.message } };
      }
    }

    if (action === "random") {
      return { status: 200, body: await randomRound(loadSeeds, token) };
    }

    return {
      status: 400,
      body: { error: "Unknown action. Use action=random|config|stats" },
    };
  } catch (error) {
    return {
      status: 502,
      body: {
        error: "Failed to start round",
        message: error.message || String(error),
      },
    };
  }
}

let seedsCache = null;

/** Cloudflare Pages / wrangler dev */
export async function loadSeedsFromRequest(request, env) {
  if (seedsCache?.length) return seedsCache;

  const seedsUrl = new URL("/data/seeds.json", request.url);
  let response;

  if (env.ASSETS?.fetch) {
    response = await env.ASSETS.fetch(seedsUrl);
  } else {
    response = await fetch(seedsUrl);
  }

  if (!response.ok) {
    throw new Error(`seeds.json missing (${response.status}) — run npm run seeds`);
  }

  const data = await response.json();
  const list = Array.isArray(data.seeds) ? data.seeds : [];
  if (!list.length) throw new Error("seeds.json is empty — run npm run seeds");
  seedsCache = list;
  return seedsCache;
}

/** VPS Node — read seeds from disk */
export async function loadSeedsFromFile(seedsPath) {
  if (seedsCache?.length) return seedsCache;

  const { readFile } = await import("node:fs/promises");
  const raw = await readFile(seedsPath, "utf8");
  const data = JSON.parse(raw);
  const list = Array.isArray(data.seeds) ? data.seeds : [];
  if (!list.length) throw new Error("seeds.json is empty — run npm run seeds");
  seedsCache = list;
  return seedsCache;
}

export function clearSeedsCache() {
  seedsCache = null;
}
