const CACHE = 'rdx-v7';
const FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon.svg',
  '/core/events.js',
  '/core/router.js',
  '/core/store.js',
  '/core/sync.js',
  '/components/sidebar.js',
  '/components/achievements.js',
  '/components/timer.js',
  '/data/ads-arq.js',
  '/data/ads-bootcamp.js',
  '/data/ads-estrutura.js',
  '/data/ads-java.js',
  '/data/ads-mysql.js',
  '/data/ads-vendy.js',
  '/data/ads-web.js',
  '/data/jr-backend.js',
  '/data/jr-base.js',
  '/data/jr-frontend.js',
  '/data/jr-fundamentos.js',
  '/views/dashboard.js',
  '/views/exercises.js',
  '/views/notes.js',
  '/views/projects.js',
  '/views/reviews.js',
  '/views/roadmap.js',
  '/views/stats.js',
  '/views/topic.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('/progress')) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
