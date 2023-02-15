<?php
    // Parametros de la BD
    define("HOST", "localhost");
    define("USER", "allroutes");
    define("PASS", "allroutes");
    define("BD", "allroutes");

    function obtenerRuta($id) {
        $ruta = false;
        try {
            $con = mysqli_connect(HOST, USER, PASS, BD);
            $sql = "SELECT * FROM routes WHERE id='$id'";
            $ruta = $con->query($sql)->fetch_assoc();
            $usuario = $ruta['id_user'];
            $sqlUser = "SELECT username FROM users WHERE id='$usuario'";
            $user = @$con->query($sqlUser)->fetch_assoc();
            @$ruta['username'] = $user['username'];
        } catch(mysqli_sql_exception $e) {
            $ruta = false;
        }
        return $ruta;
    }
?>