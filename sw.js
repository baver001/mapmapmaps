/* Cache app shell only. Mapillary/OSM always from network. */
const CACHE = "mapmapmaps-shell-v10";
const SHELL = [
  "/",
  "/index.html",
  "/script.js",
  "/js/version.js",
  "/js/build-diagnostics.js",
  "/js/i18n.js",
  "/js/sfx.js",
  "/css/style.css",
  "/manifest.webmanifest",
  "/version.json",
  "/data/seeds.json",
  "/image/mascot-pin.svg",
];

const NETWORK_FIRST = new Set([
  "/",
  "/index.html",
  "/version.json",
  "/script.js",
  "/js/version.js",
  "/js/build-diagnostics.js",
  "/js/i18n.js",
  "/js/sfx.js",
  "/css/style.css",
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function cachePut(request, response) {
  if (response.ok && response.status === 200) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return;
  if (url.hostname.includes("mapillary") || url.hostname.includes("tile.openstreetmap")) {
    return;
  }

  if (NETWORK_FIRST.has(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          cachePut(request, response);
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          cachePut(request, response);
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
