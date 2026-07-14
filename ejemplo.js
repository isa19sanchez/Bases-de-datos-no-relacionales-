const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const middlewareRevision = (req, res, next) => {
    const horaActual = new Date().toLocaleDateString();
    console.log(`[${horaActual}] Peticion entrante: ${req.method} a la ruta ${req.url}`);
    next();
};

app.use(middlewareRevision);

const healthRoutes = require('./routes/salud');
app.use('/api/v1', healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto localhost:" + PORT);
});