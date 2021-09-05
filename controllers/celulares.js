const Celular = require('../models/Celulares');

function crearCelular(req, res) {
  res.status(201).send('Celular creado');
}

function obtenerCelulares(req, res) {
  res.send('Obtener celulares');
}

function modificarCelular(req, res) {
  let modificaciones = req.body;
  res.send('Modificar celular');
}

function eliminarCelular(req, res) {
  res.status(200).send(`Celular ${req.params.id} eliminado`);
}

module.exports = {
  crearCelular,
  obtenerCelulares,
  modificarCelular,
  eliminarCelular,
};
