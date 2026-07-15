const Cancion = require('../models/Canciones');

const obtenerCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.find();
        res.json(canciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar las canciones" });
    }
};

const crearCancion = async (req, res) => {
    try {
        const nuevaCancion = new Cancion(req.body);
        const resultado = await nuevaCancion.save();
        res.status(201).json({
            mensaje: "Canción creada correctamente",
            id_generado: resultado._id,
            datosGuardados: resultado
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al guardar la canción. Verifica los campos requeridos.", detalle: error.message });
    }
};

const actualizarCancion = async (req, res) => {
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

const eliminarCancion = async (req, res) => {
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

// NUEVO MÉTODO PATCH: Actualizar solo la duración de la canción
const actualizarDuracionCancion = async (req, res) => {
    try {
        const idCancion = req.params.id;
        const { duracion_minutos: nuevaDuracion } = req.body;

        // Validamos que el campo haya sido enviado y no sea negativo o nulo
        if (nuevaDuracion == null) {
            return res.status(400).json({ error: "El campo 'duracion_minutos' es obligatorio." });
        }

        const cancionActualizada = await Cancion.findByIdAndUpdate(
            idCancion,
            { duracion_minutos: nuevaDuracion },
            { returnDocument: "after", runValidators: true }
        );

        if (!cancionActualizada) {
            return res.status(404).json({ error: "Canción no encontrada" });
        }

        res.json({
            mensaje: "Duración de la canción actualizada correctamente",
            cancionActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar la duración de la canción" });
    }
};

module.exports = {
    obtenerCanciones,
    crearCancion,
    actualizarCancion,
    eliminarCancion,
    actualizarDuracionCancion 
}