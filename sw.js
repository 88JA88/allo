const CACHE = 'allo-shell-v11';
const ASSETS = ['./','./index.html','./styles.css?v=3','./app.js?v=4','./manifest.webmanifest?v=2','./icons/app-icon.svg'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('activate', event => event.waitUntil(Promise.all([self.clients.claim(), caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))])));
self.addEventListener('fetch', event => { if(event.request.method !== 'GET') return; if(event.request.mode === 'navigate'){event.respondWith(fetch(event.request).then(response => {const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));return response;}).catch(()=>caches.match('./index.html')));return;} event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,copy)); return response; }))); });
self.addEventListener('message', event => { if(event.data === 'skipWaiting') self.skipWaiting(); });
