// Minimaler Service Worker: macht Votum als App installierbar.
// Alles läuft live über den Server, daher wird bewusst nichts zwischengespeichert.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
