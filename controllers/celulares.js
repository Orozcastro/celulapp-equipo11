const mongoose = require('mongoose');
const Celular = mongoose.model('Celular');

function crearCelular(req, res, next) {
  let celular = new Celular(req.body);
  celular
    .save()
    .then(celular => {
      res.status(201).send(celular);
    })
    .catch(next);
}

function obtenerCelulares(req, res, next) {
  console.log(req.params.id);
  if (req.params.id) {
    Celular.findById(req.params.id)
      .then(celular => {
        res.send(celular);
      })
      .catch(next);
  } else {
    Celular.find()
      .then(celular => {
        res.send(celular);
      })
      .catch(next);
  }
}

function modificarCelular(req, res, next) {
  Celular.findById(req.params.id)
    .then(celular => {
      if (!celular) return res.sendStatus(401);
      Celular.updateOne(celular, req.body)
        .then(updated => {
          if (updated.nModified > 0) {
            Celular.findById(celular._id)
              .then(c => res.send(c.publicData()))
              .catch(next);
          }
        })
        .catch(next);
    })
    .catch(next);
}

function eliminarCelular(req, res, next) {
  Celular.findOneAndDelete({ _id: req.params.id })
    .then(c => {
      res.status(200).send(`Celular ${req.params.id} eliminado: ${c}`);
    })
    .catch(next);
}

module.exports = {
  crearCelular,
  obtenerCelulares,
  modificarCelular,
  eliminarCelular,
};
