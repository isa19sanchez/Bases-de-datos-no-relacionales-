const mongoose = require('mongoose');

const cancionSchema = new mongoose.Schema({
    _id: {
        type: String, 
        required: [true, "El ID de la canción es obligatorio"]
    },
    titulo: {
        type: String,
        required: [true, "El título de la canción es obligatorio"],
        trim: true
    },
    artista: {
        type: String,
        required: [true, "El artista es obligatorio"],
        trim: true
    },
    album: {
        type: String,
        required: [true, "El álbum es obligatorio"],
        trim: true
    },
    duracion_minutos: {
        type: Number,
        required: [true, "La duración es obligatoria"],
        min: [0, "La duración no puede ser negativa"]
    },
    genero: {
        type: String,
        required: [true, "El género es obligatorio"]
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Cancion', cancionSchema, 'canciones'); 