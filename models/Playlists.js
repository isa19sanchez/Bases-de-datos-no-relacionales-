const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "El ID de la playlist es obligatorio"]
    },
    nombre: {
        type: String,
        required: [true, "El nombre de la playlist es obligatorio"],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    creador: {
        type: String,
        required: [true, "El creador es obligatorio"]
    },
    canciones: {
        type: Array, 
        default: []
    },
    fecha_creacion: {
        type: Date,
        required: [true, "La fecha de creación es obligatoria"]
    },
    estado: {
        type: String,
        default: "activo"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Playlist', playlistSchema, 'playlists');