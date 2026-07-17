const Cancion = require('../models/Canciones');

exports.obtenerCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.find();
        res.json(canciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar las canciones" });
    }
};

exports.crearCancion = async (req, res) => {
    try {
        const nuevaCancion = new Cancion(req.body);
        await nuevaCancion.save();

        res.status(201).json({
            mensaje: "Canción creada con éxito",
            cancion: nuevaCancion
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || "Error al crear la canción"
        });
    }
};

exports.actualizarCancion = async (req, res) => {
    try {
        const cancionActualizada = await Cancion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after", runValidators: true }
        );
        if (!cancionActualizada) return res.status(404).json({ error: "Canción no encontrada" });
        res.json({ mensaje: "Canción actualizada correctamente", cancionActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar la canción" });
    }
};

exports.eliminarCancion = async (req, res) => {
    try {
        const cancionEliminada = await Cancion.findByIdAndDelete(req.params.id);
        if (!cancionEliminada) {
            return res.status(404).json({ error: "Canción no encontrada o ya fue eliminada" });
        }
        res.json({
            mensaje: "Canción eliminada correctamente",
            datosEliminados: cancionEliminada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar la canción" });
    }
};

exports.actualizarDuracionCancion = async (req, res) => {
    try {
        const idCancion = req.params.id;
        const { duracion_minutos: nuevaDuracion } = req.body;

        if (nuevaDuracion === undefined) {
            return res.status(400).json({ error: "El campo 'duracion_minutos' es obligatorio." });
        }

        const cancionActualizada = await Cancion.findByIdAndUpdate(
            idCancion,
            { duracion_minutos: nuevaDuracion },
            { returnDocument: "after", runValidators: true }
        );

        if (!cancionActualizada) return res.status(404).json({ error: "Canción no encontrada" });

        res.json({
            mensaje: "Duración actualizada correctamente",
            cancionActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar la duración de la canción" });
    }
};