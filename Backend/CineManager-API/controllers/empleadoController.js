const { Router } = require('express');
const mysqlConexion = require('../database/conexion');

// Crear un empleado
exports.createEmpleado = (req, res) => {
    const { primer_nombre, primer_apellido, segundo_apellido, n_telefono, correo_electronico, sueldo, horario_trabajo, sede } = req.body;
    const query = `INSERT INTO Empleado (primer_nombre, primer_apellido, segundo_apellido, n_telefono, correo_electronico, sueldo, horario_trabajo, sede)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    mysqlConexion.query(query, [primer_nombre, primer_apellido, segundo_apellido, n_telefono, correo_electronico, sueldo, horario_trabajo, sede], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Empleado creado exitosamente", id_empleado: result.insertId });
    });
};

// Obtener todos los empleados
exports.getAllEmpleados = (req, res) => {
    mysqlConexion.query('SELECT * FROM Empleado', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
};

// Obtener un empleado por ID
exports.getEmpleadoById = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('SELECT * FROM Empleado WHERE id_empleado = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: "Empleado no encontrado" });
        }
        res.status(200).send(result[0]);
    });
};

// Actualizar un empleado
exports.updateEmpleado = (req, res) => {
    const { primer_nombre, primer_apellido, segundo_apellido, n_telefono, correo_electronico, sueldo, horario_trabajo, sede } = req.body;
    const id = req.params.id;
    const query = `UPDATE Empleado SET primer_nombre = ?, primer_apellido = ?, segundo_apellido = ?, n_telefono = ?, correo_electronico = ?, sueldo = ?, horario_trabajo = ?, sede = ?
                   WHERE id_empleado = ?`;
    mysqlConexion.query(query, [primer_nombre, primer_apellido, segundo_apellido, n_telefono, correo_electronico, sueldo, horario_trabajo, sede, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Empleado actualizado exitosamente" });
    });
};

// Eliminar un empleado
exports.deleteEmpleado = (req, res) => {
    const id = req.params.id;
    mysqlConexion.query('DELETE FROM Empleado WHERE id_empleado = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: "Empleado eliminado exitosamente" });
    });
};

console.log(this.getAllEmpleados);