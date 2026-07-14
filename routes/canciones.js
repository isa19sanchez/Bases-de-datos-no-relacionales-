const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET - Consultar canciones
router.get('/canciones', async (req, res) => {
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

// POST - Crear canción
router.post('/canciones', async (req, res) => {
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

// PUT - Actualizar canción
router.put('/canciones/:id', async (req, res) => {
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
router.delete('/canciones/:id', async (req, res) => {
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

module.exports = router;