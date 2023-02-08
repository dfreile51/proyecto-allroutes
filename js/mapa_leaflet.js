let map = L.map('map')
           .setView([40.463667, -3.74922], 6);
L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=8fea5469271547bdaa2bc623555e4432', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.thunderforest.com/terms/">ThunderForest</a>' 
}).addTo(map);

