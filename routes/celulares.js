const router = require('express').Router();
const {
  crearCelular,
  obtenerCelulares,
  modificarCelular,
  eliminarCelular,
  obtenerCelularesPorMarca,
  obtenerCelularesPorSO,
  obtenerCelularesPorRAM,
} = require('../controllers/celulares');

router.get('/', obtenerCelulares);
router.post('/', crearCelular);
router.get('/:id', obtenerCelulares);
router.put('/:id', modificarCelular);
router.delete('/:id', eliminarCelular);

router.get('/marca/:marca', obtenerCelularesPorMarca);
router.get('/so/:so', obtenerCelularesPorSO);
router.get('/ram/:ram', obtenerCelularesPorRAM);

module.exports = router;
