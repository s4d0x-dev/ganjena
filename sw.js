const CACHE_NAME = 'ganjena-v1_0_3';
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
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === '/ganjena/data/dictionary.json') {
    // Cache-then-network strategy for dictionary.json
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        caches.match(event.request).then((cachedResponse) =>
          fetch(event.request)
            .then((networkResponse) => {
              // Update cache with new response
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => {
              // If offline, return cached response
              return cachedResponse || new Response(JSON.stringify({ error: 'Offline, using cached data' }), {
                status: 503,
                statusText: 'Service Unavailable'
              });
            })
        )
      )
    );
  } else {
    // Cache-first for other resources
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
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