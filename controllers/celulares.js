const mongoose = require("mongoose");
const Celular = mongoose.model("Celular");

function crearCelular(req, res, next) {
  let celular = new Celular(req.body);
  celular
    .save()
    .then((celular) => {
      res.status(201).send(celular);
    })
    .catch(next);
}

function obtenerCelulares(req, res, next) {
  console.log(req.params.id);
  if (req.params.id) {
    Celular.findById(req.params.id)
      .then((celular) => {
        res.send(celular);
      })
      .catch(next);
  } else if (req.query.limit) {
    let lim = parseInt(req.query.limit);
    Celular.find()
      .limit(lim)
      .then((celular) => {
        res.send(celular);
      })
      .catch(next);
  } else {
    Celular.find()
      .then((celular) => {
        res.send(celular);
      })
      .catch(next);
  }
}

function modificarCelular(req, res, next) {
  Celular.findById(req.params.id)
    .then((celular) => {
      if (!celular) return res.sendStatus(404);
      Celular.updateOne(celular, req.body)
        .then((updated) => {
          if (updated.nModified > 0) {
            Celular.findById(req.params.id)
              .then((c) => res.send(c.publicData()))
              .catch(next);
          }
        })
        .catch(next);
    })
    .catch(next);
}

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

async function fuzzySearch(req, res, next) {
  let search = req.params.search;
  let celulares = [];
  const regex = new RegExp(escapeRegex(search), "gi");

  try {
    const marcas = await Celular.find({ marca: regex });
    const modelos = await Celular.find({ modelo: regex });
    if (marcas || modelos) {
      celulares = [...marcas, ...modelos];
    }

    res.send(celulares);
  } catch (error) {}
}

function obtenerCelularesPorMarca(req, res, next) {
  let marca = req.params.marca;
  Celular.find({ marca: marca })
    .then((celulares) => {
      res.send(celulares);
    })
    .catch(next);
}

function obtenerCelularesPorSO(req, res, next) {
  let so = req.params.so;
  Celular.find({ sistema_operativo: so })
    .then((celulares) => {
      res.send(celulares);
    })
    .catch(next);
}

function obtenerCelularesPorRAM(req, res, next) {
  let ram = req.params.ram;
  Celular.find({ ram_gb: ram })
    .then((celulares) => {
      res.send(celulares);
    })
    .catch(next);
}

function obtenerPropiedadesEspecificas(req, res, next) {
  let values = req.query.values;
  Celular.find({}, values.replace(/,/g, " "))
    .then((celulares) => {
      res.send(celulares);
    })
    .catch(next);
}

function eliminarCelular(req, res, next) {
  Celular.findOneAndDelete({ _id: req.params.id })
    .then((c) => {
      res.status(200).send(`Celular ${req.params.id} eliminado: ${c}`);
    })
    .catch(next);
}

module.exports = {
  crearCelular,
  obtenerCelulares,
  modificarCelular,
  eliminarCelular,
  obtenerCelularesPorMarca,
  obtenerCelularesPorSO,
  obtenerCelularesPorRAM,
  obtenerPropiedadesEspecificas,
  fuzzySearch,
};
