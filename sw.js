const CACHE_NAME = 'ganjena-v1';
const urlsToCache = [
  '/ganjena/',
  '/ganjena/index.html',
  '/ganjena/style.css',
  '/ganjena/script.js',
  '/ganjena/maintenance.js',
  '/ganjena/data/dictionary.json',
  '/ganjena/icons/favicon.ico',
  '/ganjena/icons/icon-192x192.png',
  '/ganjena/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});