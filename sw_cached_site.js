//set of cache versions
const cacheName = 'v2'

//Call Install Event On SW
self.addEventListener('install', (event) =>{
    console.log("SW: Installed");
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
        fetch(event.request)
        .then(res => {
            //make copy/clone of response
            const resClone = res.clone();

            //open cache
            caches.open(cacheName)
            .then(cache => {
                //add response to cache
                cache.put(event.request, resClone);
            })
            //return original response
            return res
        }).catch(err => caches.match(event.request).then(res => res))
    )
})