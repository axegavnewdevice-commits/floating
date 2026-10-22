const SHELL_CACHE = 'arabic-scrabble-shell-v8-beautiful-icon';
const RUNTIME_CACHE = 'arabic-scrabble-runtime-v8-beautiful-icon';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './favicon.ico'
];
const EXTERNAL_CACHE_HOSTS = new Set([
  'cdn.tailwindcss.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'www.gstatic.com'
]);

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(SHELL_FILES.map((path) => new Request(new URL(path, self.registration.scope), { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('arabic-scrabble-') && ![SHELL_CACHE, RUNTIME_CACHE].includes(key)).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate') {
      event.respondWith((async () => {
        try {
          const response = await fetch(request);
          if (response && response.ok) {
            const cache = await caches.open(SHELL_CACHE);
            cache.put(new URL('./index.html', self.registration.scope), response.clone()).catch(() => {});
          }
          return response;
        } catch (_) {
          return (await caches.match(new URL('./index.html', self.registration.scope))) || Response.error();
        }
      })());
      return;
    }
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(SHELL_CACHE);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch (_) {
        return Response.error();
      }
    })());
    return;
  }

  // Cache fonts and app dependencies after their first successful load for better offline reopening.
  if (EXTERNAL_CACHE_HOSTS.has(url.hostname) && (['script', 'style', 'font'].includes(request.destination) || url.hostname === 'www.gstatic.com')) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(request);
      const network = fetch(request).then((response) => {
        if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone()).catch(() => {});
        return response;
      }).catch(() => cached || Response.error());
      return cached || network;
    })());
  }
});
