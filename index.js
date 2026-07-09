const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch(err => console.error("No se pudo conectar", err));

/* =====================================================
                    CANCIONES
===================================================== */

// Obtener todas las canciones
app.get('/api/canciones', async (req, res) => {
    try {

        const canciones = await mongoose.connection.db
            .collection('canciones')
            .find({})
            .toArray();

        res.json(canciones);

    } catch (error) {

        res.status(500).json({
            error: "Error al consultar las canciones"
        });

    }
});

// Agregar una canción
app.post('/api/canciones', async (req, res) => {

    try {

        const nuevaCancion = req.body;

        if (
            !nuevaCancion._id ||
            !nuevaCancion.titulo ||
            !nuevaCancion.artista ||
            !nuevaCancion.album ||
            nuevaCancion.duracion_minutos == null ||
            !nuevaCancion.genero
        ) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios."
            });
        }

        const resultado = await mongoose.connection.db
            .collection('canciones')
            .insertOne(nuevaCancion);

        res.status(201).json({
            mensaje: "Canción creada correctamente",
            id_generado: resultado.insertedId,
            datosGuardados: nuevaCancion
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al guardar la canción"
        });

    }

});


/* =====================================================
                    USUARIOS
===================================================== */

// Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {

    try {

        const usuarios = await mongoose.connection.db
            .collection('usuarios')
            .find({})
            .toArray();

        res.json(usuarios);

    } catch (error) {

        res.status(500).json({
            error: "Error al consultar los usuarios"
        });

    }

});

// Agregar un usuario
app.post('/api/usuarios', async (req, res) => {

    try {

        const nuevoUsuario = req.body;

        if (
            !nuevoUsuario._id ||
            !nuevoUsuario.nombre ||
            !nuevoUsuario.email ||
            !nuevoUsuario.fecha_registro ||
            !nuevoUsuario.preferencias
        ) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios."
            });
        }

        const resultado = await mongoose.connection.db
            .collection('usuarios')
            .insertOne(nuevoUsuario);

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id_generado: resultado.insertedId,
            datosGuardados: nuevoUsuario
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al guardar el usuario"
        });

    }

});


/* =====================================================
                    PLAYLISTS
===================================================== */

// Obtener todas las playlists
app.get('/api/playlists', async (req, res) => {

    try {

        const playlists = await mongoose.connection.db
            .collection('playlists')
            .find({})
            .toArray();

        res.json(playlists);

    } catch (error) {

        res.status(500).json({
            error: "Error al consultar las playlists"
        });

    }

});

// Agregar una playlist
app.post('/api/playlists', async (req, res) => {

    try {

        const nuevaPlaylist = req.body;

        if (
            !nuevaPlaylist._id ||
            !nuevaPlaylist.nombre ||
            !nuevaPlaylist.descripcion ||
            !nuevaPlaylist.creador ||
            !nuevaPlaylist.canciones ||
            !nuevaPlaylist.fecha_creacion
        ) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios."
            });
        }

        const resultado = await mongoose.connection.db
            .collection('playlists')
            .insertOne(nuevaPlaylist);

        res.status(201).json({
            mensaje: "Playlist creada correctamente",
            id_generado: resultado.insertedId,
            datosGuardados: nuevaPlaylist
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al guardar la playlist"
        });

    }

});

app.listen(PORT, () => {
    console.log(`El backend está escuchando en http://localhost:${PORT}`);
});