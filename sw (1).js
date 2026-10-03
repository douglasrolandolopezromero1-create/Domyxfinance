const V="domyx-v1",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.open(V).then(async c=>{const m=await c.match(e.request);
  const n=fetch(e.request).then(r=>{if(r.ok||r.type==="opaque")c.put(e.request,r.clone());return r}).catch(()=>m);return m||n}))});
