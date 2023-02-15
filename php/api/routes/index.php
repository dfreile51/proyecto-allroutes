<?php
require_once "../clases/conexion.php";
require_once "../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$con = new Conexion();
$key = 'This 1s S3cr3T';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sql = "SELECT * FROM routes WHERE 1";

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

function isValidToken($token, $username)
{
    global $key;
    try {
        $json = JWT::decode($token, new Key($key, 'HS256'));
        return ($json->username == $username);
    } catch (Exception $e) {
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $token = '';
    $headers = apache_request_headers();

    if (isset($headers['Authorization'])) {
        $matches = array();
        preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches);
        if (isset($matches[1])) {
            $token = $matches[1];
        }
    } else {
        header("HTTP/1.1 401 Bad Request");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,
            'msg' => "Token no encontrado"
        ]);
    }

    if (isset($_GET['username'])) {
        $json = file_get_contents('php://input');
        $ruta = json_decode($json);
        $valorCircu = '';

        if ($ruta->circular == "circular") {
            $valorCircu = 1;
        } else {
            $valorCircu = 0;
        }

        $id_user = $ruta->id_user;
        $route_name = $ruta->route_name;
        $descrip = $ruta->descrip;
        $distance = $ruta->distance;
        $max_height = $ruta->max_height;
        $min_height = $ruta->min_height;
        $pos_slope = $ruta->pos_slope;
        $neg_slope = $ruta->neg_slope;
        $start_lat = $ruta->start_lat;
        $start_lon = $ruta->start_lon;
        $points = $ruta->points;
        $circular = $valorCircu;
        $date = $ruta->date;

        $sql = "INSERT INTO routes (id_user, route_name, descrip, distance, max_height, 
        min_height, pos_slope, neg_slope, start_lat, start_lon, points, circular, date) VALUES ('$id_user', '$route_name', '$descrip', 
        '$distance', '$max_height', '$min_height', '$pos_slope', '$neg_slope', '$start_lat', '$start_lon', '$points', '$circular', '$date')";

        if (!isValidToken($token, $username)) {
            header("HTTP/1.1 401 Bad Request");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => false,
                'msg' => "Token no válido"
            ]);
        } else {
            try {
                $con->query($sql);
                header("HTTP/1.1 200 OK");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => true,
                    'msg' => "Ruta insertada correctamente"
                ]);
            } catch (mysqli_sql_exception $e) {
                header("HTTP/1.1 400 Bad Request");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => false,
                    'msg' => "Ruta no insertada"
                ]);
            }
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,
            'msg' => "Error al insertar"
        ]);
    }
    exit;
}
?>