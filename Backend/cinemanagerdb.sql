-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2024 a las 01:49:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cinemanagerdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `primer_nombre` varchar(25) NOT NULL,
  `primer_apellido` varchar(25) NOT NULL,
  `segundo_apellido` varchar(25) DEFAULT NULL,
  `puntos` float DEFAULT NULL,
  `peliculas_vistas` int(11) DEFAULT NULL,
  `snacks_comprados` int(11) DEFAULT NULL,
  `dinero_gastado` float DEFAULT NULL,
  `f2a` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `primer_nombre`, `primer_apellido`, `segundo_apellido`, `puntos`, `peliculas_vistas`, `snacks_comprados`, `dinero_gastado`, `f2a`) VALUES
(1, 'Hector ', 'Cabarcas', 'Cuadrado', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `primer_nombre` varchar(25) NOT NULL,
  `primer_apellido` varchar(25) NOT NULL,
  `segundo_apellido` varchar(25) DEFAULT NULL,
  `n_telefono` int(11) DEFAULT NULL,
  `correo_electronico` varchar(50) DEFAULT NULL,
  `sueldo` float NOT NULL,
  `horario_trabajo` int(11) NOT NULL,
  `sede` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `primer_nombre`, `primer_apellido`, `segundo_apellido`, `n_telefono`, `correo_electronico`, `sueldo`, `horario_trabajo`, `sede`) VALUES
(1, 'Hector ', 'Cabarcas', 'Cuadrado', 316449483, 'prueba@gmail.com', 20000, 12, 'turbaco'),
(3, 'Hector ', '', 'Cuadrado', 21548521, 'prueba@gmail.com', 50, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funciones`
--

CREATE TABLE `funciones` (
  `id_funcion` int(11) NOT NULL,
  `precio_ticket` float NOT NULL,
  `id_pelicula` int(11) DEFAULT NULL,
  `id_sala` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_incio` time DEFAULT NULL,
  `duracion` time DEFAULT NULL,
  `tipo_funcion` varchar(30) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `idioma` varchar(10) DEFAULT NULL,
  `estado_funcion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula`
--

CREATE TABLE `pelicula` (
  `id_pelicula` int(11) NOT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `nombre_director` varchar(25) NOT NULL,
  `fecha_estreno` date NOT NULL,
  `genero` varchar(10) NOT NULL,
  `sinopsis` text NOT NULL,
  `clasificacion` varchar(20) NOT NULL,
  `calificacion` int(11) DEFAULT NULL,
  `nombre_distribuidora` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenias`
--

CREATE TABLE `resenias` (
  `id_Resenias` int(11) NOT NULL,
  `id_pelicula` int(11) DEFAULT NULL,
  `usuario` varchar(20) NOT NULL,
  `calificacion` float NOT NULL,
  `comentario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_Reservas` int(11) NOT NULL,
  `id_funcion` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_snack` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time DEFAULT NULL,
  `n_boletos` int(11) NOT NULL,
  `asientos` int(11) NOT NULL,
  `pago_total` float NOT NULL,
  `metodo_pago` varchar(30) DEFAULT NULL,
  `descuento` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `snacks`
--

CREATE TABLE `snacks` (
  `id_snack` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `nombre` varchar(25) NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indices de la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD PRIMARY KEY (`id_funcion`),
  ADD KEY `fk_id_peliculafuncion` (`id_pelicula`);

--
-- Indices de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`id_pelicula`);

--
-- Indices de la tabla `resenias`
--
ALTER TABLE `resenias`
  ADD PRIMARY KEY (`id_Resenias`),
  ADD KEY `fk_id_pelicularesenias` (`id_pelicula`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_Reservas`),
  ADD KEY `fk_id_funcionreservas` (`id_funcion`),
  ADD KEY `fk_id_clientereservas` (`id_cliente`),
  ADD KEY `fk_id_snackreservas` (`id_snack`);

--
-- Indices de la tabla `snacks`
--
ALTER TABLE `snacks`
  ADD PRIMARY KEY (`id_snack`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `resenias`
--
ALTER TABLE `resenias`
  MODIFY `id_Resenias` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_Reservas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `snacks`
--
ALTER TABLE `snacks`
  MODIFY `id_snack` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD CONSTRAINT `fk_id_peliculafuncion` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id_pelicula`);

--
-- Filtros para la tabla `resenias`
--
ALTER TABLE `resenias`
  ADD CONSTRAINT `fk_id_pelicularesenias` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id_pelicula`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_id_clientereservas` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `fk_id_funcionreservas` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`),
  ADD CONSTRAINT `fk_id_snackreservas` FOREIGN KEY (`id_snack`) REFERENCES `snacks` (`id_snack`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
