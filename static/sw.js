self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('pwa').then(function(cache) {
            return cache.addAll([
                '/',
                '/static/js/app.js',
                '/static/css/styles.css',
                '/static/assets/astronaut-icon.jpg',
                '/static/assets/favicon.ico',
                '/static/assets/github-brands.svg'
            ])
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    )
})

// Update a service worker
const cacheWhitelist = ['pwa'];
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });