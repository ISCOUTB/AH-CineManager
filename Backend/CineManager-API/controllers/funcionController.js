const mysqlConexion = require('../database/conexion');

// Crear una función
exports.createFuncion = (req, res) => {
    const { id_pelicula, sala, hora_inicio, hora_fin, precio } = req.body;
    const query = `INSERT INTO Funciones (id_pelicula, sala, hora_inicio, hora_fin, precio)
                   VALUES (?, ?, ?, ?, ?)`;
    mysqlConexion.query(query, [id_pelicula, sala, hora_inicio, hora_fin, precio], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Función creada exitosamente", id_funcion: result.insertId });
    });
};

// Obtener todas las funciones
exports.getAllFunciones = (req, res) => {
    mysqlConexion.query('SELECT * FROM Funciones', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
};

// Obtener una función por ID
exports.getFuncionById = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('SELECT * FROM Funciones WHERE id_funcion = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "Función no encontrada" });
        }
        res.status(200).send(result[0]);
    });
};

// Actualizar una función
exports.updateFuncion = (req, res) => {
    const { id_pelicula, sala, hora_inicio, hora_fin, precio } = req.body;
    const id = req.params.id;
    const query = `UPDATE Funciones SET id_pelicula = ?, sala = ?, hora_inicio = ?, hora_fin = ?, precio = ?
                   WHERE id_funcion = ?`;
    mysqlConexion.query(query, [id_pelicula, sala, hora_inicio, hora_fin, precio, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Función actualizada exitosamente" });
    });
};

// Eliminar una función
exports.deleteFuncion = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('DELETE FROM Funciones WHERE id_funcion = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Función eliminada exitosamente" });
    });
};
