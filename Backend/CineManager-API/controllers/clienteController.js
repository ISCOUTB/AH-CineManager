const mysqlConexion = require('../database/conexion');

// Crear un cliente
exports.createCliente = (req, res) => {
    const { primer_nombre, primer_apellido, segundo_apellido, puntos, peliculas_vistas, snacks_comprados, dinero_gastado, f2a } = req.body;
    const query = `INSERT INTO Cliente (primer_nombre, primer_apellido, segundo_apellido, puntos, peliculas_vistas, snacks_comprados, dinero_gastado, f2a)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    mysqlConexion.query(query, [primer_nombre, primer_apellido, segundo_apellido, puntos, peliculas_vistas, snacks_comprados, dinero_gastado, f2a], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Cliente creado exitosamente", id_cliente: result.insertId });
    });
};

// Obtener todos los clientes
exports.getAllClientes = (req, res) => {
    mysqlConexion.query('SELECT * FROM Cliente', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
};

// Obtener un cliente por ID
exports.getClienteById = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('SELECT * FROM Cliente WHERE id_cliente = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "Cliente no encontrado" });
        }
        res.status(200).send(result[0]);
    });
};

// Actualizar un cliente
exports.updateCliente = (req, res) => {
    const { primer_nombre, primer_apellido, segundo_apellido, puntos, peliculas_vistas, snacks_comprados, dinero_gastado, f2a } = req.body;
    const id = req.params.id;
    const query = `UPDATE Cliente SET primer_nombre = ?, primer_apellido = ?, segundo_apellido = ?, puntos = ?, peliculas_vistas = ?, snacks_comprados = ?, dinero_gastado = ?, f2a = ?
                   WHERE id_cliente = ?`;
    mysqlConexion.query(query, [primer_nombre, primer_apellido, segundo_apellido, puntos, peliculas_vistas, snacks_comprados, dinero_gastado, f2a, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Cliente actualizado exitosamente" });
    });
};

// Eliminar un cliente
exports.deleteCliente = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('DELETE FROM Cliente WHERE id_cliente = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Cliente eliminado exitosamente" });
    });
};
