CREATE DATABASE CinemanagerDB;

use CinemanagerDB;
CREATE TABLE Empleado
(
id_empleado int primary key not null auto_increment,
primer_nombre varchar(25) not null,
primer_apellido varchar(25) not null,
segundo_apellido varchar(25),
n_telefono int,
correo_electronico varchar(50),
sueldo float not null,
horario_trabajo int not null,
sede varchar(20)
);


CREATE TABLE Cliente
(
id_cliente int primary key not null auto_increment,
primer_nombre varchar(25) not null,
primer_apellido varchar(25) not null,
segundo_apellido varchar(25),
puntos float,
peliculas_vistas int,
snacks_comprados int,
dinero_gastado float,
f2a boolean not null  /*verficacion de segundo paso(2fa) */
);

CREATE TABLE Snacks (
id_snack int primary key not null auto_increment,
stock int,
nombre varchar(25) not null,
precio float not null
);

CREATE TABLE Pelicula (
id_pelicula int primary key ,
nombre varchar(25),
nombre_director varchar(25) not null,
fecha_estreno date not null,
genero varchar(10) not null,
sinopsis text(300) not null,
clasificacion varchar(20) not null,
calificacion int ,
nombre_distribuidora varchar(30)
);


CREATE TABLE Funciones (
id_funcion int primary key,
precio_ticket float not null,
id_pelicula int,
CONSTRAINT fk_id_peliculafuncion FOREIGN KEY(id_pelicula) 
REFERENCES Pelicula(id_pelicula),
id_sala int not null,
fecha date not null,
hora_incio time,
duracion time,
tipo_funcion varchar(30),
capacidad int,
idioma varchar(10),
estado_funcion varchar(10)
);

CREATE TABLE Resenias ( /*Reseñas sera reemplazado por resenias*/
id_Resenias int primary key not null auto_increment,
id_pelicula int,
CONSTRAINT fk_id_pelicularesenias FOREIGN KEY(id_pelicula)
REFERENCES Pelicula(id_pelicula),
usuario varchar(20) not null,
calificacion float not null,
comentario text(600) not null
);


CREATE TABLE reservas (
id_Reservas int primary key not null auto_increment,
id_funcion int,
CONSTRAINT fk_id_funcionreservas FOREIGN KEY(id_funcion) 
REFERENCES Funciones(id_funcion),
id_cliente int,
CONSTRAINT fk_id_clientereservas FOREIGN KEY(id_cliente) 
REFERENCES Cliente(id_cliente),
id_snack int,
CONSTRAINT fk_id_snackreservas FOREIGN KEY(id_snack) 
REFERENCES Snacks(id_snack),
fecha date not null,
hora_inicio time,
n_boletos int not null,
asientos int not null,
pago_total float not null,
metodo_pago varchar(30),
descuento float
);