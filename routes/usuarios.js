const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/usuarios', usuariosController.obtenerUsuarios);
router.post('/usuarios', usuariosController.crearUsuario);
router.put('/usuarios/:id', usuariosController.actualizarUsuario);
router.delete('/usuarios/:id', usuariosController.eliminarUsuario);
router.patch('/usuarios/actualizar-rol/:id', usuariosController.actualizarRolUsuario);

module.exports = router;