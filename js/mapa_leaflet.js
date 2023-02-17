let map = L.map('map')
           .setView([40.463667, -3.74922], 6);
L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=8fea5469271547bdaa2bc623555e4432', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.thunderforest.com/terms/">ThunderForest</a>' 
}).addTo(map);

addMarkers();

function addMarkers() {
    let inputNombreRuta = document.querySelector("#nombre_ruta").value;
    let inputDistMin = document.querySelector("#dist_min").value;
    let inputDistMax = document.querySelector("#dist_max").value;

    let url = `http://localhost/proyecto-allroutes/php/api/routes?name=${inputNombreRuta}`;

    inputDistMin != '' ? url += `&min_dist=${inputDistMin}` : '';
    inputDistMax != '' ? url += `&min_dist=${inputDistMax}` : '';

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let marker = '';
            data.forEach(item => {
                marker += L.marker([item['start_lat'], item['start_lon']], {
                    title: `${item['route_name']}`,
                    opacity: 1,
                    draggable: false,
                }).addTo(map);
            });
        })
}
