let cacheName = "condsis-cache";
let filesToCache = [
  "/",
  "./offline.html",
  "./styles.css",
  "./images/icons/android-chrome-48x48.png",  
  "./images/icons/android-chrome-72x72.png",
  "./images/icons/android-chrome-96x96.png",
  "./images/icons/android-chrome-144x144.png",
  "./images/icons/android-chrome-192x192.png",
  "./images/icons/android-chrome-512x512.png"
];

self.addEventListener('beforeinstallprompt', function (e) {
  e.userChoice.then(function (choiceResult) {
    console.log(choiceResult.outcome);
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