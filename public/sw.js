const CACHE_NAME = 'changevideospeed-offline-v4';

const FALLBACK_ASSETS = [
  '/',
  '/es/',
  '/pt/',
  '/de/',
  '/fr/',
  '/ja/',
  '/zh/',
  '/ru/',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/ffmpeg/ffmpeg-core.js',
  '/ffmpeg/ffmpeg-core.wasm',
];

async function collectPrecacheList() {
  try {
    const res = await fetch('/sw-assets.json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.assets) && data.assets.length > 0) {
        return Array.from(new Set([...FALLBACK_ASSETS, ...data.assets]));
      }
    }
  } catch {
    // Fallback when sw-assets.json is absent in dev server
  }
  return FALLBACK_ASSETS;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const urls = await collectPrecacheList();
      await Promise.allSettled(
        urls.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'no-cache' });
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch {
            // Skip individual offline/unreachable asset cleanly
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

function isImmutableAsset(pathname) {
  return pathname.startsWith('/_astro/') || pathname.startsWith('/ffmpeg/');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached =
        (await cache.match(request, {
          ignoreSearch: true,
          ignoreVary: true,
        })) ||
        (await cache.match(url.pathname, {
          ignoreSearch: true,
          ignoreVary: true,
        }));

      if (cached) {
        if (!isImmutableAsset(url.pathname)) {
          event.waitUntil(
            fetch(request)
              .then((networkRes) => {
                if (networkRes && networkRes.ok) {
                  return cache.put(request, networkRes.clone());
                }
              })
              .catch(() => {})
          );
        }
        return cached;
      }

      try {
        const networkRes = await fetch(request);
        if (networkRes && networkRes.ok) {
          await cache.put(request, networkRes.clone());
        }
        return networkRes;
      } catch {
        if (request.mode === 'navigate') {
          const fallbackRoot = await cache.match('/');
          if (fallbackRoot) return fallbackRoot;
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })()
  );
});
