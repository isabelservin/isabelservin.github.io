//check if sw is supported - Chrome Built In
if(navigator.serviceWorker){
    console.log("SW: Supported")

    //onload register sw
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('./sw_cached_site.js')
        .then(reg => console.log("SW: Registered"))
        .catch(err => console.log(`SW: Error: ${err}`))
    })
}