if(localStorage.getItem('id')) {
    rellenarCamposForm();
}

function rellenarCamposForm() {
    let identificador = localStorage.getItem('id');
    
    let url = `http://localhost/proyecto-allroutes/php/api/users?id=${identificador}`;
    
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data) {
            let fullname = document.querySelector('#fullname');
            let username = document.querySelector('#user');
            let email = document.querySelector('#email');
            let estatura = document.querySelector('#estatura');
            let peso = document.querySelector('#peso');
            let fechaNac = document.querySelector('#fechaNac');
            let pass = document.querySelector('#pass');
            let senderismo = document.querySelector('#senderismo');
            let bicicleta = document.querySelector('#bicicleta');
            let running = document.querySelector('#running');
            let alpinismo = document.querySelector('#alpinismo');
    
            console.log(data);
    
            fullname.value = data['fullname'];
            username.value = data['username'];
            email.value = data['email'];
            estatura.value = data['height'];
            peso.value = data['weight'];
            fechaNac.value = data['birthday'];
            pass.value = data['pass'];
            senderismo.checked = data['activities'].some((item) => item == 'senderismo');
            bicicleta.checked = data['activities'].some((item) => item == 'bicicleta');
            running.checked = data['activities'].some((item) => item == 'running');
            alpinismo.checked = data['activities'].some((item) => item == 'alpinismo');
        } else {
            console.log(data['msg']);
        }
        
    })
}

function editarUsuario() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');

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
        "email": `${email.value}`,
        "pass": `${pass.value}`,
        "height": `${estatura.value}`,
        "weight": `${peso.value}`,
        "birthday": `${fechaNac.value}`,
        actividades,
    };

    fetch(`http://localhost/proyecto-allroutes/php/api/users?username=${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data['success']) {
            console.log(data['msg']);
        } else {
            console.log(data['msg']);
        }
    })
}

function eliminarCuenta() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    fetch(`http://localhost/proyecto-allroutes/php/api/users?username=${username}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if(data['success']) {
            console.log(data['msg']);
            localStorage.clear();
            window.location = "index.html"
        } else{
            console.log(data['msg']);
        }
    })
}