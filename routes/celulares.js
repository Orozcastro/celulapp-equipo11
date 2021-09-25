const router = require('express').Router();
const {
  crearCelular,
  obtenerCelulares,
  modificarCelular,
  eliminarCelular,
  obtenerCelularesPorMarca,
  obtenerCelularesPorSO,
  obtenerCelularesPorRAM,
  obtenerPropiedadesEspecificas,
} = require('../controllers/celulares');
const auth = require("./auth");

router.get('/propiedades', obtenerPropiedadesEspecificas);

router.get('/',auth.requerido, obtenerCelulares);
router.post('/crearCelular',auth.requerido, crearCelular);
router.put('/modificarCelular',auth.requerido, modificarCelular);
router.get("/:id",auth.requerido, obtenerCelulares);
router.delete('/eliminarCelular/:id',auth.requerido, eliminarCelular);

router.get('/marca/:marca',auth.requerido, obtenerCelularesPorMarca);
router.get('/so/:so',auth.requerido, obtenerCelularesPorSO);
router.get('/ram/:ram',auth.requerido, obtenerCelularesPorRAM);

module.exports = router;
