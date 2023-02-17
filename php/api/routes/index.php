<?php
require_once "../clases/conexion.php";
require_once "../vendor/autoload.php";

$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT * FROM routes WHERE 1 AND id_user='$id'";
    } else {
        $sql = "SELECT * FROM routes WHERE 1";
    }

    if (isset($_GET['name'])) {
        $name = $_GET['name'];
        $sql .= " AND route_name LIKE '%$name%'";
    }
    if (isset($_GET['min_dist'])) {
        $min_dist = $_GET['min_dist'];
        $sql .= " AND distance >= $min_dist";
    }
    if (isset($_GET['max_dist'])) {
        $max_dist = $_GET['max_dist'];
        $sql .= " AND distance <= $max_dist";
    }

    try {
        $rutas = $con->query($sql)->fetch_all(MYSQLI_ASSOC);
        if ($rutas != null) {
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
            echo json_encode($rutas);
        } else {
            header("HTTP/1.1 404 Not Found");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => false,
                'msg' => "No se encuentra la ruta"
            ]);
        }
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,
            'msg' => "Error al obtener las rutas",
            'error' => $sql,
        ]);
    }
}
