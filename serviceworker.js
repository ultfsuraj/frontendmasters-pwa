const assets = [
    '/',
    'style.css',
    'app.js',
    'sw-register.js',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
]

self.addEventListener('install', (event) => {
    // browser kills within 40s. if there's a large file it may not cache, so waitUntill
    event.waitUntil(
        caches.open('assets').then((cache) => {
            try {
                cache.addAll(assets)
            } catch (e) {
                console.log('error in caching asset')
            }
        })
    )
})

// serve content
// Cache first strategy
self.addEventListener('fetch', (event) => {
    if (event.request.url == 'http://127.0.0.1:5500/fake') {
        const response = new Response(
            `Dummy Response from ${event.request.url}`
        )
        event.respondWith(response)
    } else {
        event.respondWith(
            caches
                .match(event.request) // searching in the cache
                .then((response) => {
                    return response || fetch(event.request)
                })
        )
    }
})
