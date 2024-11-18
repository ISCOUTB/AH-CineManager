const mysqlConexion = require('../database/conexion');

// Crear una reserva
exports.createReserva = (req, res) => {
    const { id_funcion, id_cliente, cantidad, total } = req.body;
    const query = `INSERT INTO Reservas (id_funcion, id_cliente, cantidad, total)
                   VALUES (?, ?, ?, ?)`;
    mysqlConexion.query(query, [id_funcion, id_cliente, cantidad, total], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Reserva creada exitosamente", id_reserva: result.insertId });
    });
};

// Obtener todas las reservas
exports.getAllReservas = (req, res) => {
    mysqlConexion.query('SELECT * FROM Reservas', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
};

// Obtener una reserva por ID
exports.getReservaById = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('SELECT * FROM Reservas WHERE id_reserva = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "Reserva no encontrada" });
        }
        res.status(200).send(result[0]);
    });
};

// Actualizar una reserva
exports.updateReserva = (req, res) => {
    const { id_funcion, id_cliente, cantidad, total } = req.body;
    const id = req.params.id;
    const query = `UPDATE Reservas SET id_funcion = ?, id_cliente = ?, cantidad = ?, total = ?
                   WHERE id_reserva = ?`;
    mysqlConexion.query(query, [id_funcion, id_cliente, cantidad, total, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Reserva actualizada exitosamente" });
    });
};

// Eliminar una reserva
exports.deleteReserva = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('DELETE FROM Reservas WHERE id_reserva = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Reserva eliminada exitosamente" });
    });
};
