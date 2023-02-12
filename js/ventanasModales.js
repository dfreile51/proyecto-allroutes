function inciarSesion() {
    crearVentana();
    formularioLogin();
    let ventana = document.querySelector('#ventana');
    ventana.classList.remove('ventana_registro');
}

function registrarse() {
    crearVentana();
    formularioRegistro();
    let ventana = document.querySelector('#ventana');
    ventana.classList.add('ventana_registro');
}

function crearVentana() {
    let div = document.querySelector('#formularios');
    document.getElementsByTagName('body')[0].classList.add('quitar_scroll');
    div.classList.add('modal-show');
}

function cerrarVentana() {
    let div = document.querySelector('#formularios');
    document.getElementsByTagName('body')[0].removeAttribute('class');
    div.classList.remove('modal-show');
}

function formularioLogin() {
    document.querySelector('#ventana_contenido').innerHTML = `
        <h3>Inicio de sesión en AllRoutes</h3>
        <form action='#' method='post' onsubmit='funcionSubmit(event)'>
            <label for='username'>Nombre de usuario:</label><br>
            <input class='inputs' type='text' name='usernameSesi' id='usernameSesi' onkeyup='comprobarCamposVaciosSesi()'>
            <br>
            <label for='passSesi'>Contraseña:</label><br>
            <input class='inputs' type='password' name='passSesi' id='passSesi' onkeyup='comprobarCamposVaciosSesi()'>
            <br>
            <input class='boton_formulario' id='btnFormSesi' onclick='recogerDatosInicio()' type='button' disabled='' value='Iniciar sesión'>
        </form>
    `;
}

function formularioRegistro() {
    document.querySelector('#ventana_contenido').innerHTML = `
        <h3>Registrate en AllRoutes</h3>
        <form action='#' method='post' onsubmit='funcionSubmit(event)'>
            <label for='fullname'>Nombre y apellidos:</label><br>
            <input class='inputs' type='text' name='fullname' id='fullname' onkeyup='comprobarCamposVaciosReg()'>
            <br>
            <label for='user'>Nombre de usuario:</label><br>
            <input class='inputs' type='text' name='usernameReg' id='usernameReg' onkeyup='comprobarCamposVaciosReg()'>
            <br>
            <label for='email'>Correo electrónico:</label><br>
            <input class='inputs' type='email' name='email' id='email' onkeyup='comprobarCamposVaciosReg()'>
            <br>
            <label for='estatura'>Estatura:</label><br>
            <input class='inputs' type='number' name='estatura' id='estatura' onkeyup='comprobarCamposVaciosReg()'>
            <br>
            <label for='peso'>Peso:</label><br>
            <input class='inputs' type='number' name='peso' id='peso' onkeyup='comprobarCamposVaciosReg()'>
            <br>
            <label for='fechaNac'>Fecha de nacimiento:</label><br>
            <input class='inputs' type='date' name='fechaNac' id='fechaNac'>
            <br>
            <label for='passReg'>Contraseña:</label><br>
            <input class='inputs' type='password' name='passReg' id='passReg' onkeyup='comprobarCamposVaciosReg(); comprobarPassReg();'>
            <br>
            <div id='passRegError' class='fondo_invisible'></div>
            <label for='repPas'>Repetir contraseña:</label><br>
            <input class='inputs' type='password' name='repPass' id='repPass' onkeyup='comprobarCamposVaciosReg(); comprobarRepPass();'>
            <br>
            <div id='repPassError' class='fondo_invisible'></div>
            <label for='actividades'>Actividades:</label><br>
            <input type="checkbox" id="senderismo" name="senderismo" value="senderismo">
            <label for="senderismo">Senderismo</label><br>
            <input type="checkbox" id="bicicleta" name="bicicleta" value="bicicleta">
            <label for="bicicleta">Bicileta</label><br>
            <input type="checkbox" id="running" name="running" value="running">
            <label for="running">Running</label><br>
            <input style="margin-bottom: 3rem;" type="checkbox" id="alpinismo" name="alpinismo" value="alpinismo">
            <label for="alpinismo">Alpinismo</label>
            <br>
            <input class='boton_formulario' id='btnFormReg' onclick='recogerDatos()' type='submit' disabled='' value='Registrarse'>
        </form>
    `;
}