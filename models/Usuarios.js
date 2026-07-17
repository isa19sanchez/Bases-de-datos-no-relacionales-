const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    _id: {
        type: String, 
        required: [true, "El ID del usuario es obligatorio"]
    },
    nombre: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        unique: true, 
        trim: true,
        lowercase: true
    },
    fecha_registro: {
        type: String,
        required: [true, "La fecha de registro es obligatoria"]
    },
    preferencias: {
        type: [String], 
        default: []
    },
    rol: {
        type: String,
        default: "usuario"
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios'); 