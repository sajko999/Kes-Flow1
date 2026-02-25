self.addEventListener("install",event=>{
    event.waitUntil(
        caches.open("kesflow-cache").then(cache=>{
            return cache.addAll([
                "/",
                "./index.html",
                "./invest.html",
                "./style.css",
                "./utils/dateUtilis.js",
                "./utils/investicija.js",
                "./app.js",
                "./img/logoKF.png"
            ]);
        })
    );
});

self.addEventListener("fetch",event=>{
    event.respondWith(
        caches.match(event.request).then(response=>{
            return response || fetch(event.request);
        })
    );
});