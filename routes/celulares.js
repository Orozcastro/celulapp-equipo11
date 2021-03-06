const router = require("express").Router();
const {
  crearCelular,
  obtenerCelulares,
  modificarCelular,
  eliminarCelular,
  obtenerCelularesPorMarca,
  obtenerCelularesPorSO,
  obtenerCelularesPorRAM,
  obtenerPropiedadesEspecificas,
  fuzzySearch,
} = require("../controllers/celulares");
const auth = require("./auth");

router.get("/propiedades", auth.requerido, obtenerPropiedadesEspecificas);

router.get("/", obtenerCelulares);
router.post("/crearCelular", auth.requerido, crearCelular);
router.put("/modificarCelular/:id", auth.requerido, modificarCelular);
router.get("/:id", obtenerCelulares);
router.get("/search/:search", fuzzySearch);
router.delete("/eliminarCelular/:id", auth.requerido, eliminarCelular);

router.get("/marca/:marca", obtenerCelularesPorMarca);
router.get("/so/:so", obtenerCelularesPorSO);
router.get("/ram/:ram", obtenerCelularesPorRAM);

module.exports = router;
