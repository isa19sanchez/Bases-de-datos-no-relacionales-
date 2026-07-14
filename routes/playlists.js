const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET - Consultar playlists
router.get('/playlists', async (req, res) => {
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

// POST - Crear playlist
router.post('/playlists', async (req, res) => {
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

// PUT - Actualizar playlist
router.put('/playlists/:id', async (req, res) => {
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

// DELETE - Eliminar playlist
router.delete('/playlists/:id', async (req, res) => {
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

router.patch('/playlists/actualizar-estado/:id', async (req, res) => {
    try {
        const idPlaylist = req.params.id;
        const { estado: nuevoEstado } = req.body;

        if (!nuevoEstado) {
            return res.status(400).json({ error: "El campo 'estado' es obligatorio." });
        }
        const playlist = await mongoose.connection.db
            .collection('playlists')
            .findOne({ _id: idPlaylist });
        if (!playlist) {
            return res.status(404).json({ error: "Playlist no encontrada" });
        }
        
        if (playlist.estado === 'finalizado') {
            return res.status(403).json({
                error: "Forbidden",
                mensaje: "No se puede cambiar el estado de una playlist que ya está finalizada."
            })
        }

        const resultado = await mongoose.connection.db
            .collection('playlists')
            .updateOne(
                { _id: idPlaylist },
                { $set: { estado: nuevoEstado } }
            );
        res.json({
            mensaje: "Estado actualizado correctamente",
            nuevoEstado: nuevoEstado,
        });
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el estado de la playlist" });
    }  
})

module.exports = router;