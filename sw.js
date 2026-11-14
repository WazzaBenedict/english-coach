// 離線支援：優先用網路取得最新版本，沒有網路時改用快取
const CACHE = 'english-coach-v3';
const FILES = ['./', 'index.html', 'css/style.css', 'js/core.js', 'js/sync.js', 'js/views.js', 'data/plan.js', 'data/words.js', 'data/ipa-gb.js',
  'data/dialogues.js', 'data/sounds.js', 'data/grammar.js', 'data/ielts.js', 'manifest.json', 'icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
