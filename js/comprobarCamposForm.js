function comprobarCamposVaciosSesi() {
    /* CAMPOS DEL FORMULARIO DE INICIAR SESION */
    let usermaneSesi = document.querySelector('#usernameSesi');
    let passSesi = document.querySelector('#passSesi');
    let btnFormSesi = document.querySelector('#btnFormSesi');

    /* COMPROBAR INPUTS FORMULARIO INICIO DE SESION */
    if(usermaneSesi.value == '' || passSesi.value == '') {
        btnFormSesi.disabled = true;
    } else {
        btnFormSesi.disabled = false;
    }
}

function comprobarCamposVaciosReg() {
    /* CAMPOS DEL FORMULARIO DE INICIAR SESION */
    let fullname = document.querySelector('#fullname');
    let usermaneReg = document.querySelector('#usernameReg');
    let email = document.querySelector('#email');
    let estatura = document.querySelector('#estatura');
    let peso = document.querySelector('#peso');
    let passReg = document.querySelector('#passReg');
    let repPass = document.querySelector('#repPass');
    let btnFormReg = document.querySelector('#btnFormReg');

    /* COMPROBAR INPUTS FORMULARIO DE REGISTRO */
    if(fullname.value == '' || usermaneReg.value == '' || email.value == ''
        || estatura.value == '' || peso.value == '' || passReg.value == '' 
        || repPass.value == '') {
        btnFormReg.disabled = true;
    } else {
        btnFormReg.disabled = false;
    }
}

function comprobarPassReg() {
    let passReg = document.querySelector('#passReg');
    let passRegError = document.querySelector('#passRegError');

    // COMPRUEBA QUE LA CONTRASEÑA SEA MAYOR A 8 CARACTERES
    if(passReg.value.length < 8) {
        passReg.classList.remove('inputs');
        passReg.classList.add('inputs2');

        passRegError.classList.remove('fondo_invisible');
        passRegError.classList.add('divPassRegError');

        passRegError.innerHTML = `
                <span class='spanError'>La contraseña no es segura</span>
        `;
    } else {
        passReg.classList.remove('inputs2');
        passReg.classList.add('inputs');

        passRegError.classList.remove('divPassRegError');
        passRegError.classList.add('fondo_invisible');
    }

    if(passReg.value.length == 0) {
        passReg.classList.remove('inputs2');
        passReg.classList.add('inputs');

        passRegError.classList.remove('divPassRegError');
        passRegError.classList.add('fondo_invisible');
    }
}

function comprobarRepPass() {
    let passReg = document.querySelector('#passReg');
    let repPass = document.querySelector('#repPass');
    let repPassError = document.querySelector('#repPassError');

    // COMPRUEBA QUE EL CAMPO DE REPETIR CONTRASEÑA SEA IGUAL QUE EL CAMPO DE LA CONTRASEÑA
    if(passReg.value != repPass.value) {
        repPass.classList.remove('inputs');
        repPass.classList.add('inputs2');

        repPassError.classList.remove('fondo_invisible');
        repPassError.classList.add('divRepPass');

        repPassError.innerHTML = `
                <span class='spanError'>Las contraseñas tienen que ser iguales</span>
        `;
    } else {
        repPass.classList.remove('inputs2');
        repPass.classList.add('inputs');

        repPassError.classList.remove('divRepPass');
        repPassError.classList.add('fondo_invisible');
    }

    if(repPass.value.length == 0) {
        repPass.classList.remove('inputs2');
        repPass.classList.add('inputs');

        repPassError.classList.remove('divRepPass');
        repPassError.classList.add('fondo_invisible');
    }
}