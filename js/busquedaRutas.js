mainHeader();
mainBody();
mainList();

function mainHeader() {
    let main_header = document.querySelector(".main__header");

    main_header.innerHTML = `
                <div class='main__filters'>
                    <form action="#" method="post" onsubmit="funcionSubmit(event)">
                        <input type='text' name='nombre_ruta' id='nombre_ruta' onchange='mainList()' placeholder='Nombre ruta...'>
                        <input type='number' name='dist_min' id='dist_min' onchange='mainList()' placeholder='Distacia mínima...'>
                        <input type='number' name='dist_max' id='dist_max' onchange='mainList()' placeholder='Distacia máxima...'>
                    </form>
                </div>`;
}

function mainBody() {
    let main_body = document.querySelector(".main__body");

    main_body.innerHTML = `
            <div class='main__list'></div>
            <div class='main__map'>
                <div id='map'></div>
            </div>
    `;
}

function mainList() {
    let main_list = document.querySelector(".main__list");
    let inputNombreRuta = document.querySelector("#nombre_ruta").value;
    let inputDistMin = document.querySelector("#dist_min").value;
    let inputDistMax = document.querySelector("#dist_max").value;
    // console.log(inputNombreRuta);

    let url = `http://localhost:5000/api/route?name=${inputNombreRuta}&min_dist=${inputDistMin}&max_dist=${inputDistMax}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    .then(response => {
        switch (response.status) {
            case 200: 
                console.log('Rutas encontradas');
                break;
            case 400:
                console.log('Ha habido un error');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let datos = "";
        if(data.length > 0) {
            data.forEach(item => {
                datos += `
                        <div class='trail'>
                            <div class='trail__header'>
                                <span>${item.route_name}</span>
                            </div>
                            <div class='trail__body'>
                                <div class='trail_item'>
                                    <small>Distancia</small>
                                    <h4>${item.distance}m</h4>
                                </div>
                                <div class='trail_item'>
                                    <small>Altura Máxima</small>
                                    <h4>${item.max_height}m</h4>
                                </div>
                                <div class='trail_item'>
                                    <small>Altura Mínima</small>
                                    <h4>${item.min_height}m</h4>
                                </div>
                            </div>
                            <div class='trail__image'><img src='imgs/default-image.jpg' alt='imagen'></div>
                        </div>
                `;
            });
            
        } else {
            datos = "<h2>No hay ninguna ruta</h2>";
        }
        main_list.innerHTML = datos;
    })
}