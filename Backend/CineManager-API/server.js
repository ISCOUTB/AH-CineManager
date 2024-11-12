const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importar la conexión a la base de datos
const mysqlConexion = require('./database/conexion');

// Importar las rutas
const empleadoRoutes = require('./routes/empleadoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const snackRoutes = require('./routes/snackRoutes');
const peliculaRoutes = require('./routes/peliculaRoutes');
const funcionRoutes = require('./routes/funcionRoutes');
const reseniaRoutes = require('./routes/reseniaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/empleados', empleadoRoutes);
app.use('/api', clienteRoutes);
app.use('/api', snackRoutes);
app.use('/api', peliculaRoutes);
app.use('/api', funcionRoutes);
app.use('/api', reseniaRoutes);
app.use('/api', reservaRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${3306}`);
    mysqlConexion.connect((err) => {
        if (!err) {
            console.log("Conectado a la base de datos MySQL");
        } else {
            console.error("Error de conexión a la base de datos:", err);
        }
    });
});

module.exports = app;
