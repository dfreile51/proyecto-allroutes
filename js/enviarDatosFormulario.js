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
        "username": `${username.value}`,
        "fullname": `${fullname.value}`,
        "email": `${email.value}`,
        "pass": `${pass.value}`,
        "height": `${estatura.value}`,
        "weight": `${peso.value}`,
        "birthday": `${fechaNac.value}`,
        actividades,
    };
    
    let url = "http://localhost/proyecto-allroutes/php/api/users/";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(datosUsuario)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data['success']) {
                alert(data['msg']);
            } else {
                alert(data['msg']);
            }
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

    let url = "http://localhost/proyecto-allroutes/php/api/users/";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data['success']) {
                localStorage.setItem('token', `${data['token']}`);
                localStorage.setItem('username', `${data['username']}`);
                localStorage.setItem('id', `${data['id']}`);
                alert(data['msg']);
                location.reload();
            } else {
                alert(data['msg']);
            }
        })
}

function cerrarSesion() {
    localStorage.clear();
    window.location = "index.html";
}