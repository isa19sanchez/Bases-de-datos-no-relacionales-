const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conexión exitosa a MongoDB Atlas"))
    .catch(err => console.error("No se pudo conectar a Mongo:", err));


const usuariosRoutes = require('./routes/usuarios');

const cancionesRoutes = require('./routes/canciones');

const playlistsRoutes = require('./routes/playlists');


app.use('/api/v1', usuariosRoutes);
app.use('/api/v1', cancionesRoutes); 
app.use('/api/v1', playlistsRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto localhost:${PORT}`);
});