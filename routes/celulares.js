const router = require('express').Router();
const {
  crearCelular,
  obtenerCelulares,
  modificarCelular,
  eliminarCelular,
} = require('../controllers/celulares');

router.get('/', obtenerCelulares);
router.post('/crearCelular', crearCelular);
router.put('/modificarCelular', modificarCelular);
router.delete('/eliminarCelular/:id', eliminarCelular);

module.exports = router;
