let cacheName = "conhecendo service-workers";
let filesToCache = [
  "/",
  "index.html",
  "styles.css",
  "https://schoolofnetcom.github.io/pwa/img/icons/icon-128x128.png",
  "https://schoolofnetcom.github.io/pwa/img/icons/icon-144x144.png",
  "https://schoolofnetcom.github.io/pwa/img/icons/icon-152x152.png",
  "https://schoolofnetcom.github.io/pwa/img/icons/icon-192x192.png",
  "https://schoolofnetcom.github.io/pwa/img/icons/icon-256x256.png",
  "https://schoolofnetcom.github.io/pwa/img/icons/icon-512x512.png"
];

self.addEventListener("install", function(e) {
  console.log("Service Worker installer");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", function(e) {
  console.log("service worker active");
});
self.addEventListener("fetch", function(e) {
  console.log("fetch", e.request.url);
  
  e.respondWith(
    caches
      .match(e.request)
      .then(function(resp) {
        return resp || fetch(e.request);
      })
      .catch(function(err) {
        console.log("Erro", err);
      })
  );
});


