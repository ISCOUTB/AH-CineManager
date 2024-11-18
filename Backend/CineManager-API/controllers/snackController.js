const mysqlConexion = require('../database/conexion');

// Crear un snack
exports.createSnack = (req, res) => {
    const { stock, nombre, precio } = req.body;
    const query = `INSERT INTO Snacks (stock, nombre, precio)
                   VALUES (?, ?, ?)`;
    mysqlConexion.query(query, [stock, nombre, precio], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Snack creado exitosamente", id_snack: result.insertId });
    });
};

// Obtener todos los snacks
exports.getAllSnacks = (req, res) => {
    mysqlConexion.query('SELECT * FROM Snacks', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
};

// Obtener un snack por ID
exports.getSnackById = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('SELECT * FROM Snacks WHERE id_snack = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "Snack no encontrado" });
        }
        res.status(200).send(result[0]);
    });
};

// Actualizar un snack
exports.updateSnack = (req, res) => {
    const { stock, nombre, precio } = req.body;
    const id = req.params.id;
    const query = `UPDATE Snacks SET stock = ?, nombre = ?, precio = ?
                   WHERE id_snack = ?`;
    mysqlConexion.query(query, [stock, nombre, precio, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Snack actualizado exitosamente" });
    });
};

// Eliminar un snack
exports.deleteSnack = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('DELETE FROM Snacks WHERE id_snack = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Snack eliminado exitosamente" });
    });
};
