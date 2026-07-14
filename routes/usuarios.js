const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET - Consultar usuarios
router.get('/usuarios', async (req, res) => {
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

// POST - Crear usuario
router.post('/usuarios', async (req, res) => {
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

// PUT - Actualizar usuario
router.put('/usuarios/:id', async (req, res) => {
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

// DELETE - Eliminar usuario
router.delete('/usuarios/:id', async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const resultado = await mongoose.connection.db
            .collection('usuarios')
            .deleteOne({ _id: idUsuario });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado o ya fue eliminada" });
        }

        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar el usuario" });
    }
});

module.exports = router;