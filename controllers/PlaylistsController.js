const Playlist = require('../models/Playlists');

const obtenerPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar las playlists" });
    }
};

const crearPlaylist = async (req, res) => {
    try {
        const nuevaPlaylist = new Playlist(req.body);
        const resultado = await nuevaPlaylist.save();
        res.status(201).json({
            mensaje: "Playlist creada correctamente",
            id_generado: resultado._id,
            datosGuardados: resultado
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al guardar la playlist. Verifica los campos.", detalle: error.message });
    }
};

const actualizarPlaylist = async (req, res) => {
    try {
        const playlistActualizada = await Playlist.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after", runValidators: true }
        );
        if (!playlistActualizada) return res.status(404).json({ error: "Playlist no encontrada" });
        res.json({ mensaje: "Playlist actualizada correctamente", playlistActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar la playlist" });
    }
};

const eliminarPlaylist = async (req, res) => {
    try {
        const playlistEliminada = await Playlist.findByIdAndDelete(req.params.id);
        
        if (!playlistEliminada) {
            return res.status(404).json({ error: "Playlist no encontrada o ya fue eliminada" });
        }

        res.json({ 
            mensaje: "Playlist eliminada correctamente", 
            datosEliminados: playlistEliminada 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar la playlist" });
    }
};

const actualizarEstadoPlaylist = async (req, res) => {
    try {
        const idPlaylist = req.params.id;
        const { estado: nuevoEstado } = req.body;

        if (!nuevoEstado) return res.status(400).json({ error: "El campo 'estado' es obligatorio." });

        const playlist = await Playlist.findById(idPlaylist);
        if (!playlist) return res.status(404).json({ error: "Playlist no encontrada" });

        if (playlist.estado === 'finalizado') {
            return res.status(403).json({
                error: "Forbidden",
                mensaje: "No se puede cambiar el estado de una playlist que ya está finalizada."
            });
        }

        playlist.estado = nuevoEstado;
        await playlist.save();

        res.json({
            mensaje: "Estado actualizado correctamente",
            nuevoEstado: nuevoEstado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el estado de la playlist" });
    }
};

module.exports = {
    obtenerPlaylists,
    crearPlaylist,
    actualizarPlaylist,
    eliminarPlaylist,
    actualizarEstadoPlaylist
};