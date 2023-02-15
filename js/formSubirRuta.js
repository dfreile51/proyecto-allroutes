/* Funcion para quitar el comportamiento por defecto de los formularios */
function funcionSubmit(event) {
    event.preventDefault();
}

function subirRuta() {
    let fileInput = document.querySelector('#fileGpx');
    let route_name = document.querySelector('#nameRoute').value;
    let description = document.querySelector('#descText').value;

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.readAsText(file);
    console.log(route_name);
    console.log(description);
    console.log(reader);
}

