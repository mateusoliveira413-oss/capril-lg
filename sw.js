// Guarda a "casca" do app (tela de abertura e ícones) para abrir rápido.
// Os dados sempre vêm do Google na hora.
const CACHE = 'capril-lg-v1';
const ARQUIVOS = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'logo-abertura.png', 'icone-192.png', 'icone-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;               // o sistema (Google) não passa pelo cache
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request)));
});
