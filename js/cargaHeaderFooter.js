const paginaHeader = "layout/header.html";
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
