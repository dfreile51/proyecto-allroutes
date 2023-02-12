<?php
    require_once "../vendor/autoload.php";
    use Firebase\JWT\JWT;

    class Conexion extends mysqli {
        private $host = "localhost";
        private $db = "allroutes";
        private $user = "allroutes";
        private $pass = "allroutes";

        public function __construct()
        {
            try {
                parent::__construct($this->host, $this->user, $this->pass, $this->db);
            } catch (mysqli_sql_exception $e) {
                echo "ERROR: {$e->getMessage()}";
                // header("HTTP/1.1 400 Bad Request");
                exit;
            } 
        }

        /*####################################
        GENERAR TOKEN DE AUTENTICACIÓN
        ####################################*/
        static public function jwt($username) {
            $time = time();
            $key = 'This 1s S3cr3T';
            $token = array(
                "iat" => $time, //Tiempo en que inicia el token
                "exp" => $time + (60*60*24), // Tiempo en que expirará el token(1 dia)
                "username" => $username
            );

            $jwt = JWT::encode($token, $key, 'HS256');

            return $jwt;
        }
    }
?>