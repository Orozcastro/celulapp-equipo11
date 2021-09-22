const router = require("express").Router();

const {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios");

router.get("/", obtenerUsuarios);
router.post("/crearUsuario", crearUsuario);
router.put("/modificarUsuario", modificarUsuario);
router.delete("/eliminarUsuario/:id", eliminarUsuario);

module.exports = router;
