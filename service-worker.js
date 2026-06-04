const CACHE_NAME = 'lubeasy-v3';
const urlsToCache = [
  '/lubeasy/',
  '/lubeasy/index.html',
  '/lubeasy/login.html',
  '/lubeasy/consulta.html',
  '/lubeasy/admin.html',
  '/lubeasy/icon.svg',
  '/lubeasy/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  // SEMPRE busca da rede primeiro (sem cache)
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});
