const express = require('express');
const router = express.Router();
const cancionController = require('../controllers/cancionesController'); // ✅ corregido

router.get('/canciones', cancionController.obtenerCanciones);
router.post('/canciones', cancionController.crearCancion);
router.put('/canciones/:id', cancionController.actualizarCancion);
router.delete('/canciones/:id', cancionController.eliminarCancion);
router.patch('/canciones/actualizar-duracion/:id', cancionController.actualizarDuracionCancion);

module.exports = router;