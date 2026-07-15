const express = require('express');
const router = express.Router();
const playlistsController = require('../controllers/playlistsController');


router.get('/playlists', playlistsController.obtenerPlaylists);
router.post('/playlists', playlistsController.crearPlaylist);
router.put('/playlists/:id', playlistsController.actualizarPlaylist);
router.delete('/playlists/:id', playlistsController.eliminarPlaylist);
router.patch('/playlists/actualizar-estado/:id', playlistsController.actualizarEstadoPlaylist);

module.exports = router;