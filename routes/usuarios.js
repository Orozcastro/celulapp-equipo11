const router = require("express").Router();

const {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion,
  registrosLimitados,
  coincidenciaAtributos,
} = require("../controllers/usuarios");
const auth = require("./auth");

router.get("/", auth.requerido, obtenerUsuarios);
router.get("/limit/:limit", auth.requerido, registrosLimitados);
// router.get("/match/:atributo", auth.requerido, coincidenciaAtributos);
router.get("/match/", auth.requerido, coincidenciaAtributos);
router.get("/:id", auth.requerido, obtenerUsuarios);
router.post("/", crearUsuario);
router.post("/entrar", iniciarSesion);
router.put("/:id", auth.requerido, modificarUsuario);
router.delete("/:id", auth.requerido, eliminarUsuario);

module.exports = router;
