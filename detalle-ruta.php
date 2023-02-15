<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle Ruta</title>
    <link rel="preload" href="css/normalize.css" as="style">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="preload" href="css/estilos.css" as="style">
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
</head>
<style>
    #map {
        width: 100%;
        height: 100%;
    }
</style>

<body>
    <header id="encabezado">
    </header>

    <?php
    require_once "php/funciones/funciones.php";
    $idRuta = $_REQUEST['id'];
    $ruta = obtenerRuta($idRuta);
    ?>

    <main style="display: flex; flex-direction: column; align-items: center;">
        <div class="contenido sombra detalle_ruta">
            <div class="detalle_name">
                <span><?php echo $ruta['route_name'] ?></span>
            </div>
            <div class="detalle_descarga">
                <button class="btn-detalle btn-descargar">Descargar</button>
                <button class="btn-detalle btn-gps">Envía ruta al GPS</button>
            </div>
            <div class="detalle_mapa">
                <div id="map"></div>
            </div>
            <div class="detalle_descripcion">
                <span><?php echo $ruta['descrip'] ?></span>
            </div>
            <div class="detalle_sidebar">
                <div class="detalle_autor">
                    <div class="detalle_userImage"><img src="imgs/profile-image.png" alt="profile-image"></div>
                    <div class="detalle_autorInfo">
                        <p>Autor</p>
                        <h3>
                            <?php
                            echo ($ruta['username'] != null ? $ruta['username'] : "Anonimo");
                            ?>
                        </h3>
                        <p>con 1 <a href="#">compañero de ruta</a></p>
                    </div>
                </div>
                <div class="detalle_datos">
                    <div class="datos_items border-right">
                        <p>Distancia</p>
                        <span><?php echo $ruta['distance'] ?></span>
                    </div>
                    <div class="datos_items">
                        <p>Altitud máxima</p>
                        <span><?php echo $ruta['max_height'] ?></span>
                    </div>
                    <div class="datos_items border-right">
                        <p>Altitud mínima</p>
                        <span><?php echo $ruta['min_height'] ?></span>
                    </div>
                    <div class="datos_items">
                        <p>Latitud</p>
                        <span><?php echo $ruta['start_lat'] ?></span>
                    </div>
                    <div class="datos_items no-border border-right">
                        <p>Longitud</p>
                        <span><?php echo $ruta['start_lon'] ?></span>
                    </div>
                    <div class="datos_items no-border">
                        <p>Tipo de Ruta</p>
                        <span>
                            <?php
                            if ($ruta['circular'] == 1) {
                                echo "Circular";
                            } else {
                                echo "Lineal";
                            }
                            ?>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    </main>

    <div id="formularios" class="ventana_negra">
        <div id="ventana" class="ventana">
            <div class="ventana_header">
                <button class="boton_cerrar" onclick="cerrarVentana()"><img src="imgs/cerrar.png" alt="cerrar"></button>
            </div>
            <div id="ventana_contenido">
            </div>
        </div>
    </div>
    <footer id="piePagina">
    </footer>

    <!-- Cargar header y footer -->
    <script src="js/cargaHeaderFooter.js"></script>
    <!-- Cargar ventanas modales al hacer click -->
    <script src="js/ventanasModales.js"></script>
    <!-- Comprobar campos de los formularios de las ventanas modales -->
    <script src="js/comprobarCamposForm.js"></script>
    <!-- Funciones para iniciar sesion y registrar usuario -->
    <script src="js/enviarDatosFormulario.js"></script>
    <!-- Funcion para crear el mapa de leaflet -->
    <script>
        let map = L.map('map')
            .setView([<?php echo $ruta['start_lat'] ?>, <?php echo $ruta['start_lon'] ?>], 13);
        L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=8fea5469271547bdaa2bc623555e4432', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.thunderforest.com/terms/">ThunderForest</a>'
        }).addTo(map);

        let marker = L.marker([<?php echo $ruta['start_lat'] ?>, <?php echo $ruta['start_lon'] ?>], {
            title: `<?php echo $ruta['route_name'] ?>`,
            opacity: 1,
            draggable: false,
        }).addTo(map);
    </script>
</body>

</html>