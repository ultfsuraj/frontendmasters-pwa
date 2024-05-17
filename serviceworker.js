const assets = ["/","style.css","app.js","sw-register.js",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
]

// storing assets
self.addEventListener("install", (event)=>{
    // browser kills within 40s. if there's a large file it may not cache, so waitUntill
    event.waitUntil(
        caches.open("assets").then(cache=>{
            cache.addAll(assets)
        })
    )
})

