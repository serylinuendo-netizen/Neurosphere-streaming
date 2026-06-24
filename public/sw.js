// NeuroSphere Cyber-Engine Service Worker
const CACHE_NAME = "neurosphere-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/neurosphere_logo_1782126680004.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // cache core assets
      return cache.addAll(ASSETS).catch(() => {
        // tolerate failures during dev compile
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Skip non-HTTP/HTTPS schemes (e.g. chrome-extension, ws, etc.)
  if (!e.request.url.startsWith("http")) {
    return;
  }
  // Let it pass through to server API or load from caches when offline
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
