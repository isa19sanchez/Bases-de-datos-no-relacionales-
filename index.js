const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch(err => console.error("No se pudo conectar", err));



app.get('/api/canciones', async (req, res) => {
    try {
        const canciones = await mongoose.connection.db
            .collection('canciones')
            .find({})
            .toArray();
        res.json(canciones);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar las canciones" });
    }
});

app.post('/api/canciones', async (req, res) => {
    try {
        const nuevaCancion = req.body;
        if (
            !nuevaCancion._id || !nuevaCancion.titulo || !nuevaCancion.artista ||
            !nuevaCancion.album || nuevaCancion.duracion_minutos == null || !nuevaCancion.genero
        ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
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
        res.status(500).json({ error: "Error al guardar la canción" });
    }
});

app.put('/api/canciones/:id', async (req, res) => {
    try {
        const idCancion = req.params.id;
        const datosNuevos = req.body;

        const resultado = await mongoose.connection.db
            .collection('canciones')
            .updateOne(
                { _id: idCancion }, 
                { $set: datosNuevos }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Canción no encontrada" });
        }

        res.json({ mensaje: "Canción actualizada correctamente", modificaciones: resultado.modifiedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar la canción" });
    }
});

// DELETE - Eliminar canción
app.delete('/api/canciones/:id', async (req, res) => {
    try {
        const idCancion = req.params.id;
        const resultado = await mongoose.connection.db
            .collection('canciones')
            .deleteOne({ _id: idCancion });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Canción no encontrada o ya fue eliminada" });
        }

        res.json({ mensaje: "Canción eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar la canción" });
    }
});



app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await mongoose.connection.db
            .collection('usuarios')
            .find({})
            .toArray();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar los usuarios" });
    }
});

app.post('/api/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = req.body;
        if (!nuevoUsuario._id || !nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.fecha_registro || !nuevoUsuario.preferencias) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
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
        res.status(500).json({ error: "Error al guardar el usuario" });
    }
});


app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const datosNuevos = req.body;

        const resultado = await mongoose.connection.db
            .collection('usuarios')
            .updateOne(
                { _id: idUsuario },
                { $set: datosNuevos }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario actualizado correctamente", modificaciones: resultado.modifiedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el usuario" });
    }
});


app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const resultado = await mongoose.connection.db
            .collection('usuarios')
            .deleteOne({ _id: idUsuario });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado o ya fue eliminado" });
        }

        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar el usuario" });
    }
});




app.get('/api/playlists', async (req, res) => {
    try {
        const playlists = await mongoose.connection.db
            .collection('playlists')
            .find({})
            .toArray();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar las playlists" });
    }
});

app.post('/api/playlists', async (req, res) => {
    try {
        const nuevaPlaylist = req.body;
        if (!nuevaPlaylist._id || !nuevaPlaylist.nombre || !nuevaPlaylist.descripcion || !nuevaPlaylist.creador || !nuevaPlaylist.canciones || !nuevaPlaylist.fecha_creacion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
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
        res.status(500).json({ error: "Error al guardar la playlist" });
    }
});


app.put('/api/playlists/:id', async (req, res) => {
    try {
        const idPlaylist = req.params.id;
        const datosNuevos = req.body;

        const resultado = await mongoose.connection.db
            .collection('playlists')
            .updateOne(
                { _id: idPlaylist },
                { $set: datosNuevos }
            );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Playlist no encontrada" });
        }

        res.json({ mensaje: "Playlist actualizada correctamente", modificaciones: resultado.modifiedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar la playlist" });
    }
});


app.delete('/api/playlists/:id', async (req, res) => {
    try {
        const idPlaylist = req.params.id;
        const resultado = await mongoose.connection.db
            .collection('playlists')
            .deleteOne({ _id: idPlaylist });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Playlist no encontrada o ya fue eliminada" });
        }

        res.json({ mensaje: "Playlist eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar la playlist" });
    }
});

app.listen(PORT, () => {
    console.log(`El backend está viendo en http://localhost:${PORT}`);
});