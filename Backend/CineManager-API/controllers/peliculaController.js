const mysqlConexion = require('../database/conexion');

// Crear una película
exports.createPelicula = (req, res) => {
    const { nombre, nombre_director, fecha_estreno, genero, sinopsis, clasificacion, calificacion, nombre_distribuidora } = req.body;
    const query = `INSERT INTO Pelicula (nombre, nombre_director, fecha_estreno, genero, sinopsis, clasificacion, calificacion, nombre_distribuidora) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    mysqlConexion.query(query, [nombre, nombre_director, fecha_estreno, genero, sinopsis, clasificacion, calificacion, nombre_distribuidora], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Película creada exitosamente", id_pelicula: result.insertId });
    });
};

// Obtener todas las películas
exports.getAllPeliculas = (req, res) => {
    mysqlConexion.query('SELECT * FROM Pelicula', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
};

// Obtener una película por ID
exports.getPeliculaById = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('SELECT * FROM Pelicula WHERE id_pelicula = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "Película no encontrada" });
        }
        res.status(200).send(result[0]);
    });
};

// Actualizar una película
exports.updatePelicula = (req, res) => {
    const { nombre, nombre_director, fecha_estreno, genero, sinopsis, clasificacion, calificacion, nombre_distribuidora } = req.body;
    const id = req.params.id;
    const query = `UPDATE Pelicula SET nombre = ?, nombre_director = ?, fecha_estreno = ?, genero = ?, sinopsis = ?, clasificacion = ?, calificacion = ?, nombre_distribuidora = ?
                   WHERE id_pelicula = ?`;
    mysqlConexion.query(query, [nombre, nombre_director, fecha_estreno, genero, sinopsis, clasificacion, calificacion, nombre_distribuidora, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Película actualizada exitosamente" });
    });
};

// Eliminar una película
exports.deletePelicula = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('DELETE FROM Pelicula WHERE id_pelicula = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Película eliminada exitosamente" });
    });
};
