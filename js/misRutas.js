/* Funcion para quitar el comportamiento por defecto de los formularios */
function funcionSubmit(event) {
    event.preventDefault();
}

let mr__header = document.querySelector('.mr__header').clientHeight;
let mr__body = document.querySelector('.mr__body');

mr__body.setAttribute('style', `max-height: calc(765px - ${mr__header + 25}px)`);

cargarRutas();

function cargarRutas() {
    let id_user = localStorage.getItem('id');
    let inputNombreRuta = document.querySelector("#nombre_ruta").value;
    let inputDistMin = document.querySelector("#dist_min").value;
    let inputDistMax = document.querySelector("#dist_max").value;

    let url = `http://localhost/proyecto-allroutes/php/api/routes?id=${id_user}`;

    inputNombreRuta != '' ? url += `&name=${inputNombreRuta}` : '';
    inputDistMin != '' ? url += `&min_dist=${inputDistMin}` : '';
    inputDistMax != '' ? url += `&min_dist=${inputDistMax}` : '';

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let datos = "";
            if (data.length > 0) {
                data.forEach(item => {
                    datos += `
                        <a class='enlaces' href='detalle-ruta.php?id=${item['id']}'>
                            <div class='trail' style='border: .1rem solid var(--blanco_oscuro)'>
                                <div class='trail__header'>
                                    <span>${item['route_name']}</span>
                                </div>
                                <div class='trail__body'>
                                    <div class='trail_item'>
                                        <small>Distancia</small>
                                        <h4>${item['distance']}</h4>
                                    </div>
                                    <div class='trail_item'>
                                        <small>Altura Máxima</small>
                                        <h4>${item['max_height']}m</h4>
                                    </div>
                                    <div class='trail_item'>
                                        <small>Altura Mínima</small>
                                        <h4>${item['min_height']}m</h4>
                                    </div>
                                </div>
                                <div class='trail__image'><img src='imgs/default-image.jpg' alt='imagen'></div>
                            </div>
                        </a>
                `;
                });
            } else {
                datos = "<h2>No se encontraron rutas</h2>";
            }
            mr__body.innerHTML = datos;
        })
}