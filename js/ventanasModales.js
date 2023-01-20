function inciarSesion() {
    crearVentana();
    formularioLogin();
}

function registrarse() {
    crearVentana();
    formularioRegistro();
}

function crearVentana() {
    let div = document.querySelector('#formularios');
    document.getElementsByTagName('body')[0].classList.add('quitar_scroll');
    div.classList.remove('fondo_invisible');
    div.classList.add('ventana_negra');
}

function cerrarVentana() {
    let div = document.querySelector('#formularios');
    document.getElementsByTagName('body')[0].removeAttribute('class');
    div.classList.remove('ventana_negra');
    div.classList.add('fondo_invisible');
}

function formularioLogin() {
    document.querySelector('#ventana_contenido').innerHTML = `
        <h3>Inicio de sesión en AllRoutes</h3>
        <form>
            <label for='email'>Correo electrónico:</label><br>
            <input class='inputs' type='email' name='email' id='email'>
            <br>
            <label for='pass'>Contraseña:</label><br>
            <input class='inputs' type='password' name='pass' id='pass'>
            <br>
            <input class='boton_formulario' type='button' value='Iniciar sesión'>
        </form>
    `;
}

function formularioRegistro() {
    document.querySelector('#ventana_contenido').innerHTML = `
        <h3>Registrate en AllRoutes</h3>
        <form>
            <label for='nombre'>Nombre y apellidos:</label><br>
            <input class='inputs' type='text' name='nombre' id='nombre'>
            <br>
            <label for='user'>Nombre de usuario:</label><br>
            <input class='inputs' type='text' name='user' id='user'>
            <br>
            <label for='email'>Correo electrónico:</label><br>
            <input class='inputs' type='email' name='email' id='email'>
            <br>
            <label for='estatura'>Estatura:</label><br>
            <input class='inputs' type='number' name='estatura' id='estatura'>
            <br>
            <label for='peso'>Peso:</label><br>
            <input class='inputs' type='number' name='peso' id='peso'>
            <br>
            <label for='fechaNac'>Fecha de nacimiento:</label><br>
            <input class='inputs' type='date' name='fechaNac' id='fechaNac'>
            <br>
            <label for='pass'>Contraseña:</label><br>
            <input class='inputs' type='password' name='pass' id='pass'>
            <br>
            <label for='repPas'>Repetir contraseña:</label><br>
            <input class='inputs' type='password' name='repPass' id='repPass'>
            <br>
            <input class='boton_formulario' type='button' value='Registrarse'>
        </form>
    `;
}