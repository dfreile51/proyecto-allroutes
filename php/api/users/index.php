<?php
require_once "../clases/conexion.php";
require_once "../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$con = new Conexion();
$key = 'This 1s S3cr3T';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $user = json_decode($json);

    /* REGISTRAR USUARIO */
    if (
        isset($user->username) && isset($user->fullname) && isset($user->email) &&
        isset($user->pass) && isset($user->height) && isset($user->weight) &&
        isset($user->birthday) && isset($user->actividades)
    ) {

        $fullname = $user->fullname;
        $username = $user->username;
        $email = $user->email;
        $pass = $user->pass;
        $height = $user->height;
        $weight = $user->weight;
        $birthday = $user->birthday;
        $activities = implode(",", $user->actividades);

        $passHash = hash("sha512", $pass);

        $sql = "INSERT INTO users (username, fullname,  email, pass, height, 
                weight, birthday, activities) VALUES ('$username', '$fullname', '$email', 
                '$passHash', '$height', '$weight', '$birthday', '$activities')";

        $sql2 = "SELECT username FROM users WHERE username='$username'";

        try {
            $usuarios = $con->query($sql2)->fetch_all(MYSQLI_ASSOC);
            if (count($usuarios) > 0) {
                header("HTTP/1.1 409 Username exist");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => false,
                    'msg' => "El nombre de usuario ya existe"
                ]);
            } else {
                $con->query($sql);
                header("HTTP/1.1 201 Created");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => true,
                    'msg' => "El usuario se ha creado correctamente"
                ]);
            }
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => false,
                'msg' => "Alguno de los campos esta vacío"
            ]);
        }
        /* INICIAR SESION USUARIO */
    } elseif (isset($user->username) && isset($user->pass)) {


        $username = $user->username;
        $pass = $user->pass;

        $sql = "SELECT id, username, pass FROM users WHERE username='$username'";

        $jwt = Conexion::jwt($username);

        try {
            $usuario = $con->query($sql)->fetch_all(MYSQLI_ASSOC);
            /* var_dump(hash('sha512', $pass));
            var_dump($usuario[0]['pass']); */
            if (hash('sha512', $pass) == $usuario[0]['pass']) {
                header("HTTP/1.1 200 OK");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => true,
                    'msg' => "Se ha iniciado sesion",
                    'id' => $usuario[0]['id'],
                    'username' => $usuario[0]['username'],
                    'token' => $jwt
                ]);
            } else {
                header("HTTP/1.1 400 Bad Request");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => false,
                    'msg' => "Datos de sesión incorrectos"
                ]);
            }
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 404 Not Found");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => false,
                'msg' => "No se encuentra el usuario"
            ]);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,
            'msg' => "Alguno de los campos esta vacío"
        ]);
    }
    exit;
}


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $sql = "SELECT * FROM users WHERE 1";
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql .= " AND id='$id'";
        } elseif (count($_GET) > 0) {
            header("HTTP 400 Bad Request");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => false,
                'msg' => "Error se encuentran mas usuarios con ese id"
            ]);
        }

        $usuarios = $con->query($sql)->fetch_all(MYSQLI_ASSOC);
        $usuarios[0]['activities'] = explode(",", $usuarios[0]['activities']);
        if ($usuarios != null) {
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
            echo json_encode($usuarios[0]);
        } else {
            header("HTTP/1.1 404 Not Found");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => false,
                'msg' => "No se encuentra al usuario"
            ]);
        }
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,
            'msg' => "Error al obtener los usuarios"
        ]);
    }
    exit;
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

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
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
        $username = $_GET['username'];
        $sql = "DELETE FROM users WHERE username='$username'";
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
                    'msg' => "Usuario eliminado correctamente"
                ]);
            } catch (mysqli_sql_exception $e) {
                header("HTTP/1.1 400 Bad Request");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => false,
                    'msg' => "Usuario no eliminado"
                ]);
            }
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,
            'msg' => "Usuario no encontrado"
        ]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
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
        $user = json_decode($json);

        $username = $_GET['username'];
        $email = $user->email;
        $pass = $user->pass;
        $height = $user->height;
        $weight = $user->weight;
        $birthday = $user->birthday;
        $activities = implode(",", $user->actividades);

        $sql = "UPDATE users SET email='$email', pass='$pass', height='$height', weight='$weight', birthday='$birthday', activities='$activities' WHERE username='$username'";

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
                header("HTTP/1.1 201 Created");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => true,
                    'msg' => "Usuario modificado correctamente"
                ]);
            } catch (mysqli_sql_exception $e) {
                header("HTTP/1.1 404 Bad Request");
                header("Content-Type: application/json");
                echo json_encode([
                    'success' => false,
                    'msg' => "No se puede actualizar el usuario"
                ]);
            }
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
        echo json_encode([
            'success' => false,
            'msg' => "Alguno de los campos requeridos está vacío",
        ]);
    }
}
