/* Cache app shell only. Mapillary/OSM always from network. */
const CACHE = "mapmapmaps-shell-v12";
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
  "/image/favicon.svg",
  "/image/apple-touch-icon.svg",
  "/image/app-icon-maskable.svg",
  "/image/title.svg",
];

/** Path without query — bust ?v= on CSS/JS still hits network-first. */
function assetPath(url) {
  return url.pathname;
}

function isShellAsset(pathname) {
  return (
    pathname === "/" ||
    pathname === "/index.html" ||
    pathname === "/version.json" ||
    pathname === "/script.js" ||
    pathname.startsWith("/js/") ||
    pathname.startsWith("/css/") ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/data/seeds.json" ||
    pathname.startsWith("/image/mascot-pin") ||
    pathname.startsWith("/image/favicon") ||
    pathname.startsWith("/image/apple-touch-icon") ||
    pathname.startsWith("/image/app-icon-maskable") ||
    pathname.startsWith("/image/title")
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
    return;
  }
  if (event.data?.type === "clearShell") {
    event.waitUntil(
      caches.delete(CACHE).then(() => {
        event.ports[0]?.postMessage({ ok: true });
      })
    );
  }
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

  const pathname = assetPath(url);

  if (isShellAsset(pathname)) {
    event.respondWith(
      fetch(new Request(request, { cache: "no-store" }))
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
