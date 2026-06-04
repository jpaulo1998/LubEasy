const CACHE_NAME = 'lubeasy-v99';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(nomes) {
      return Promise.all(
        nomes.map(function(nome) {
          // Apaga todos os caches antigos
          return caches.delete(nome);
        })
      );
    })
  );
  self.clients.claim();
});

// Sempre busca da rede primeiro
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
