const CACHE_NAME = 'lubeasy-v2';
const urlsToCache = [
  '/LubEasy/',
  '/LubEasy/index.html',
  '/LubEasy/login.html',
  '/LubEasy/consulta.html',
  '/LubEasy/admin.html',
  '/LubEasy/icon.svg',
  '/LubEasy/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
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
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(function() {
        return caches.match('/LubEasy/index.html');
      });
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