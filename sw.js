/* Cache app shell only. Mapillary/OSM always from network. */
const CACHE = "mapmapmaps-shell-v7";
const SHELL = [
  "/",
  "/index.html",
  "/script.js",
  "/js/i18n.js",
  "/js/sfx.js",
  "/css/style.css",
  "/manifest.webmanifest",
  "/data/seeds.json",
  "/image/mascot-pin.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return;
  if (url.hostname.includes("mapillary") || url.hostname.includes("tile.openstreetmap")) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.status === 200 && url.origin === self.location.origin) {
            const copy = response.clone();
            caches
              .open(CACHE)
              .then((cache) => cache.put(request, copy))
              .catch(() => {});
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
