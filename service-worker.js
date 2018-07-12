var cacheName = "dp-pwa";
var filesToCache = [    
    '/',
    'img/',
    'index.html',
];

self.addEventListener("install", function (e) {

    console.log('Service Worker instalador.')
    this.skipWaiting();
    e.waitUntil(caches.open(cacheName).then(function (cache) {
        return cache.addAll(filesToCache);
    }).catch(function (err) {
        console.log(err)
    }));
});
self.addEventListener("fetch", function (e) {
    console.log('Service Worker fetch', e.request.url)
    e.respondWith(
            caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
    }).catch(function (err) {
        console.log(err)
    })
            );
});
