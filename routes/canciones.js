const express = require('express');
const router = express.Router();
const cancionesController = require('../controllers/cancionesController');

router.get('/canciones', cancionesController.obtenerCanciones);
router.post('/canciones', cancionesController.crearCancion);
router.put('/canciones/:id', cancionesController.actualizarCancion);
router.delete('/canciones/:id', cancionesController.eliminarCancion);
router.patch('/canciones/actualizar-duracion/:id', cancionesController.actualizarDuracionCancion);

module.exports = router;