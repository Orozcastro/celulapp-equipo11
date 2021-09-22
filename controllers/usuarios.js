const Usuario = require("../models/Usuario");

// CRUD
function crearUsuario(req, res) {
  res.status(200).send("crearUsuario");
}

function obtenerUsuarios(req, res) {
  res.send("obtenerUsuarios");
}

function modificarUsuario(req, res) {
  var modificaciones = req.body;
  res.send("modificarUsuario");
}

function eliminarUsuario(req, res) {
  res.status(200).send(`Usuario ${req.params.id} eliminado`);
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
};
