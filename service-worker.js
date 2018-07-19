let cacheName = "condsis-cache";
let filesToCache = [
  "/",
  "./offline.html",
  "./styles.css",
  "./images/icons/exclamation-triangle-solid.png",
  
];

self.addEventListener('beforeinstallprompt', function (e) {
  e.userChoice.then(function (choiceResult) {
    if (choiceResult.outcome == 'dismissed') {
      console.log('evento foi cancelado pelo usuario');
    } else {
      console.log('usuario add');
    }
  }).catch(function (err) {
    console.log(err);
  });
});

self.addEventListener("install", function (e) {
  console.log("Service Worker installer");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[ServiceWorker] caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", function (e) {
  console.log("service worker active");
  console.log(e);  
});
self.addEventListener("fetch", function (e) {
  console.log("fetch", e.request.url);

  e.respondWith(
    caches
    .match(e.request)
    .then(function (resp) {
      return resp || fetch(e.request);
    })
    .catch(function (err) {
      console.log("Erro", err);
      return caches.match('./offline.html');
    })
  );
});