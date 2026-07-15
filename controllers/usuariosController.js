const Usuario = require('../models/Usuarios');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al consultar los usuarios" });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        const resultado = await nuevoUsuario.save();
        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id_generado: resultado._id,
            datosGuardados: resultado
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ 
            error: "Error al guardar el usuario. Verifica los campos requeridos.", 
            detalle: error.message 
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after", runValidators: true }
        );
        if (!usuarioActualizado) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario actualizado correctamente", usuarioActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el usuario" });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        
        if (!usuarioEliminado) {
            return res.status(404).json({ error: "Usuario no encontrado o ya fue eliminado" });
        }

        res.json({ 
            mensaje: "Usuario eliminado correctamente", 
            datosEliminados: usuarioEliminado 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar el usuario" });
    }
};

// MÉTODO PATCH: Actualizar solo el rol del usuario
const actualizarRolUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const { rol: nuevoRol } = req.body;

        if (!nuevoRol) {
            return res.status(400).json({ error: "El campo 'rol' es obligatorio." });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            idUsuario,
            { rol: nuevoRol },
            { returnDocument: "after", runValidators: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({
            mensaje: "Rol de usuario actualizado correctamente",
            usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el rol del usuario" });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    actualizarRolUsuario 
};