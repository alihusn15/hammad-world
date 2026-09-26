/* HAMMAD WORLD static app shell only. Never cache API calls or account data. */
const VERSION='2026.09.26-r34-live-worker';
const BASE=new URL('./',self.location.href);
const PREFIX='hw-shell-'+BASE.pathname+'-';
const CACHE=PREFIX+VERSION;
const FILES=['index.html','vendor/firebase-app-compat.js','vendor/firebase-auth-compat.js','vendor/firebase-firestore-compat.js','manifest.webmanifest','icon.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 for(const file of FILES){const request=new Request(new URL(file,BASE),{cache:'reload'});const response=await fetch(request);if(!response.ok)throw Error('Offline file unavailable: '+file);if(file==='index.html'&&!(await response.clone().text()).includes(VERSION))throw Error('Upload the matching HTML before activating this offline version.');await cache.put(request,response);}
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==BASE.origin)return;
 const navigation=req.mode==='navigate'&&(url.pathname===BASE.pathname||url.pathname===new URL('index.html',BASE).pathname);
 const asset=FILES.some(file=>url.pathname===new URL(file,BASE).pathname);
 if(!navigation&&!asset)return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE),key=navigation?new URL('index.html',BASE).href:new URL(url.pathname,BASE.origin).href;const saved=await cache.match(key);if(saved)return saved;return fetch(req);})());
});
self.addEventListener('message',event=>{if(event.data?.type==='HW_STATUS')event.waitUntil((async()=>{const cache=await caches.open(CACHE),checks=await Promise.all(FILES.map(file=>cache.match(new URL(file,BASE).href)));event.ports[0]?.postMessage({version:VERSION,ready:checks.every(Boolean)});})());});
