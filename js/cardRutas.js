let containerRutas = document.querySelector('.container-rutas');

cargarRutas();

function cargarRutas() {
    let url = `http://localhost/proyecto-allroutes/php/api/routes/`;

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
            if (data) {
                console.log(data);
                let datos = "";
                if (data.length > 0) {
                    data.forEach(item => {
                        datos += `
                        <div class="card-ruta">
                            <img src="imgs/default-image.jpg" alt="imagen">
                            <h4>${item['route_name']}</h4>
                            <p>${item['descrip']}</p>
                            <a href="detalle-ruta.php?id=${item['id']}">Leer más</a>
                        </div>
                `;
                    });

                } else {
                    datos = "<h2>No hay ninguna ruta</h2>";
                }
                containerRutas.innerHTML += datos;
            } else {
                console.log(data['msg']);
            }
        })
}