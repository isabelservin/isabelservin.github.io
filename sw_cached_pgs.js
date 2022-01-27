//set of cache versions
const cacheName = 'v1'

//assets cached
 const cachedAssets = [
    '/about.html',
    '/index.html',
    '/css/style.css',
    '/js/main.js'
]

//Call Install Event On SW
self.addEventListener('install', (event) =>{
    console.log("SW: Installed");
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('SW: Caching Files');
            cache.addAll(cachedAssets)  //can also pass all assets directly as an array here instead of passing the variable that contains them
        })
        .then(() => self.skipWaiting())
    );
})

//Call Activate - clean up old cache
self.addEventListener('activate', (event) => {
    console.log("SW: Activated")

    //remove unwanted cache
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('SW: Clearing Old Cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//Call Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('SW: Fetching')

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
})