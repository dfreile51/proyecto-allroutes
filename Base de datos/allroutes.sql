-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2023 a las 19:49:28
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `allroutes`
--
CREATE DATABASE IF NOT EXISTS `allroutes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `allroutes`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routes`
--

DROP TABLE IF EXISTS `routes`;
CREATE TABLE `routes` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `route_name` varchar(30) NOT NULL,
  `distance` int(11) UNSIGNED NOT NULL,
  `max_height` int(11) UNSIGNED NOT NULL,
  `min_height` int(11) UNSIGNED NOT NULL,
  `pos_slope` int(11) NOT NULL,
  `neg_slope` int(11) NOT NULL,
  `start_lat` double NOT NULL,
  `start_lon` double NOT NULL,
  `points` mediumtext NOT NULL,
  `circular` tinyint(1) NOT NULL,
  `date` date NOT NULL,
  `descrip` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `routes`
--

INSERT INTO `routes` (`id`, `id_user`, `route_name`, `distance`, `max_height`, `min_height`, `pos_slope`, `neg_slope`, `start_lat`, `start_lon`, `points`, `circular`, `date`, `descrip`) VALUES
(1, 1, 'Ruta de los Calderones', 12270, 1672, 1179, 611, 611, 42.82393, -5.77881, '', 1, '2023-01-29', 'La ruta se inicia en Piedrasecha, para tomar enseguida una vereda casi paralela al río. Destaca una gran roca silícica, muy llamativa por los líquenes amarillentos que la colonizan; es El Serrón. Pronto se llega a la fuente del Manadero y un poco más allá, la Cueva de las Palomas alberga una sencilla ermita rupestre que custodia la imagen de Nuestra Señora del Manadero. Su romería se celebra el último domingo de Julio, congregando a vecinos de toda la comarca. '),
(2, 1, 'Subida al Vizcodillo', 16390, 2104, 1199, 932, 929, 42.2367748, -6.4616487, '', 1, '2022-07-07', 'A 1,5km pasando Truchillas desde Truchas hay un parking con un panel indicativo para subir al lago Truchillas,hasta el cual llego y atravieso por la salida del agua que forma el rio Truchilas, para subir a una cuota dos mil en primer lugar y acto seguido al Vizcodillo.Descenso por la laguna Malicioso hasta el coche.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(300) NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `birthday` date NOT NULL,
  `activities` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `pass`, `height`, `weight`, `birthday`, `activities`) VALUES
(1, 'diego', 'Diego Freile Garcia', 'diego@mail.com', '12345678', 177, 67, '1999-09-27', 'running,alpinismo'),
(4, 'sergio', 'Sergio Freile', 'sergio@gmail.com', 'fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe', 180, 77, '1997-10-25', 'bicicleta,running');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
