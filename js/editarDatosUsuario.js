function editarUsuario() {
    let token = localStorage.getItem('token');
    let identificador = localStorage.getItem('id');

    let email = document.querySelector('#email');
    let estatura = document.querySelector('#estatura');
    let peso = document.querySelector('#peso');
    let fechaNac = document.querySelector('#fechaNac');
    let pass = document.querySelector('#pass');
    let senderismo = document.querySelector('#senderismo');
    let bicicleta = document.querySelector('#bicicleta');
    let running = document.querySelector('#running');
    let alpinismo = document.querySelector('#alpinismo');

    let actividades = [];

    senderismo.checked ? actividades.push(senderismo.value) : '';
    bicicleta.checked ? actividades.push(bicicleta.value) : '';
    running.checked ? actividades.push(running.value) : '';
    alpinismo.checked ? actividades.push(alpinismo.value) : '';

    let datosUsuario = {
        id: identificador,
        email: `${email.value}`,
        pass: `${pass.value}`,
        height: `${estatura.value}`,
        weight: `${peso.value}`,
        birthday: `${fechaNac.value}`,
        activities: actividades
    };

    fetch(`http://localhost:5000/api/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        switch (response.status) {
            case 200:
                console.log("Actualizado");
                break;
            case 400:
                console.log("Identificador no valido");
                break;
            case 401:
                console.log("Token no valido");
        }
        return response.json();
    })
    .then(data => {
        // let token = data.token;
        // let id = data.id;
        // console.log(token);
        // console.log(id);
        // localStorage.setItem('token', token);

        console.log(data);
    })
}

function eliminarCuenta() {
    let token = localStorage.getItem('token');
    let identificador = localStorage.getItem('id');

    fetch(`http://localhost:5000/api/users?id=${identificador}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        switch (response.status) {
            case 200:
                console.log("Usuario eliminado correctamente");
                break;
            case 404:
                console.log("El usuario no existe");
                break;
            case 400:
                console.log("No se ha indicado el nombre de usuario o el id");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        localStorage.clear();
        window.location.href = "index.html";
    })
}