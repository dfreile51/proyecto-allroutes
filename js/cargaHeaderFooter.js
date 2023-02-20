let paginaHeader = "";

if(!localStorage.getItem('token')) {
    paginaHeader = "layout/header.html";
} else {
    paginaHeader = "layout/header-inicioSesion.html";
}

const paginaFooter = "layout/footer.html";

loadHeader(paginaHeader);
loadFooter(paginaFooter);

function loadHeader(url) {
    fetch(url)
        .then( (response) => {
            return response.text()
        })
        .then( (data) => {
            document.querySelector('#encabezado').innerHTML = data;
        })
}

function loadFooter(url) {
    fetch(url)
        .then( (response) => {
            return response.text();
        })
        .then( (data) => {
            document.querySelector('#piePagina').innerHTML = data;
        })
}

function addNavList() {
    let ulSecond = document.querySelector('#ul-second');

    if(ulSecond.classList.contains('fondo_invisible')) {
        ulSecond.classList.remove('fondo_invisible');
        if(window.innerWidth <= 768) {
            document.getElementsByTagName('body')[0].classList.add('quitar_scroll');
        }
    } else {
        ulSecond.classList.add('fondo_invisible');
        document.getElementsByTagName('body')[0].removeAttribute('class');
    }
}