const CACHE_NAME = 'lubeasy-v1';
const urlsToCache = [
  '/lubeasy/',
  '/lubeasy/index.html',
  '/lubeasy/login.html',
  '/lubeasy/consulta.html',
  '/lubeasy/admin.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// INSTALAR E CACHEAR ARQUIVOS
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// BUSCAR DO CACHE QUANDO OFFLINE
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(function() {
        return caches.match('/lubeasy/index.html');
      });
    })
  );
});

// ATUALIZAR CACHE
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
});