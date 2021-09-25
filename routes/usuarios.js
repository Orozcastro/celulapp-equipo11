const router = require("express").Router();

const {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion,
  registrosLimitados,
  obtenerUsuariosPorNombre,
  obtenerUsuariosPorApellido,
  obtenerUsuariosPorTipo,
  obtenerUsuariosPorStatus,
  obtenerPropiedadesEspecificas,
} = require("../controllers/usuarios");
const auth = require("./auth");

router.get("/",auth.requerido, obtenerUsuarios);
router.get("/limit/:limit", auth.requerido, registrosLimitados);
router.get("/propiedades", auth.requerido, obtenerPropiedadesEspecificas);
router.get("/:id", auth.requerido, obtenerUsuarios);
router.post("/", crearUsuario);
router.post("/entrar", iniciarSesion);
router.put("/:id", auth.requerido, modificarUsuario);
router.delete("/eliminarUsuario/:id", auth.requerido, eliminarUsuario);

router.get("/nombre/:nombre", obtenerUsuariosPorNombre);
router.get("/apellido/:apellido", obtenerUsuariosPorApellido);
router.get("/tipo/:tipo", auth.requerido, obtenerUsuariosPorTipo);
router.get("/status/:status", auth.requerido, obtenerUsuariosPorStatus);

module.exports = router;
