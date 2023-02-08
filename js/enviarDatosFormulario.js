/* Funcion para quitar el comportamiento por defecto de los formularios */
function funcionSubmit(event) {
    event.preventDefault();
}

/* Funcion para registrar a un usuario */
function recogerDatos() {

    let fullname = document.querySelector('#fullname');
    let username = document.querySelector('#usernameReg');
    let email = document.querySelector('#email');
    let estatura = document.querySelector('#estatura');
    let peso = document.querySelector('#peso');
    let fechaNac = document.querySelector('#fechaNac');
    let pass = document.querySelector('#passReg');
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
        fullname: `${fullname.value}`,
        username: `${username.value}`,
        email: `${email.value}`,
        pass: `${pass.value}`,
        height: `${estatura.value}`,
        weight: `${peso.value}`,
        birthday: `${fechaNac.value}`,
        activities: actividades
    };

    let url = "http://localhost:5000/api/register";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(datosUsuario)
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    console.log("El usuario se ha registrado con éxito");
                    break;
                case 400:
                    console.log("Ha habido un error");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}

/* Funcion para iniciar sesion */
function recogerDatosInicio() {
    let nombreUsu = document.querySelector('#usernameSesi');
    let pass = document.querySelector('#passSesi');

    let datosUsuario = {
        username: `${nombreUsu.value}`,
        pass: `${pass.value}`
    };

    let url = "http://localhost:5000/api/login";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
        .then(response => {
            switch (response.status) {
                case 200:
                    console.log("El usuario existe");
                    break;
                case 401:
                    console.log("Ha habido un error");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            if(data.token != undefined && data.id != undefined) {
                localStorage.setItem('token', `${data.token}`);
                localStorage.setItem('id', `${data.id}`)
                location.reload();
            }
        })
}

function cerrarSesion() {
    localStorage.clear();
    location.reload();
}