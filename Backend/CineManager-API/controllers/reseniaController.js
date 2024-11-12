const mysqlConexion = require('../database/conexion');

// Crear una reseña
exports.createResenia = (req, res) => {
    const { id_cliente, id_pelicula, puntuacion, comentario } = req.body;
    const query = `INSERT INTO Resenias (id_cliente, id_pelicula, puntuacion, comentario)
                   VALUES (?, ?, ?, ?)`;
    mysqlConexion.query(query, [id_cliente, id_pelicula, puntuacion, comentario], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Reseña creada exitosamente", id_resenia: result.insertId });
    });
};

// Obtener todas las reseñas
exports.getAllResenias = (req, res) => {
    mysqlConexion.query('SELECT * FROM Resenias', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
};

// Obtener una reseña por ID
exports.getReseniaById = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('SELECT * FROM Resenias WHERE id_resenia = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "Reseña no encontrada" });
        }
        res.status(200).send(result[0]);
    });
};

// Actualizar una reseña
exports.updateResenia = (req, res) => {
    const { id_cliente, id_pelicula, puntuacion, comentario } = req.body;
    const id = req.params.id;
    const query = `UPDATE Resenias SET id_cliente = ?, id_pelicula = ?, puntuacion = ?, comentario = ?
                   WHERE id_resenia = ?`;
    mysqlConexion.query(query, [id_cliente, id_pelicula, puntuacion, comentario, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Reseña actualizada exitosamente" });
    });
};

// Eliminar una reseña
exports.deleteResenia = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('DELETE FROM Resenias WHERE id_resenia = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Reseña eliminada exitosamente" });
    });
};
