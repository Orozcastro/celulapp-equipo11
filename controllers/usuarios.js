// Usuarios  - Controller
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const passport = require("passport");

// C R U D
function crearUsuario(req, res, next) {
  const body = req.body,
    password = body.password;

  delete body.password;

  const usuario = new Usuario(body);
  usuario.crearPassword(password);
  usuario
    .save()
    .then((user) => {
      return res.status(201).json(user.toAuthJSON());
    })
    .catch(next);
}

function obtenerUsuarios(req, res, next) {
  if (req.params.id) {
    Usuario.findById(req.usuario.id, (err, user) => {
      if (!user || err) {
        return res.sendStatus(401);
      }
      return res.json(user.publicData());
    }).catch(next);
  } else {
    Usuario.find({})
      .then((users) => {
        let response = [];
        users.forEach((user) => {
          response.push(user.publicData());
        });
        return res.send(response);
      })
      .catch(next);
  }
}

function modificarUsuario(req, res, next) {
  Usuario.findById(req.usuario.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }
      let nuevaInfo = req.body;
      if (typeof nuevaInfo.username !== "undefined")
        user.username = nuevaInfo.username;
      if (typeof nuevaInfo.tipo !== "undefined") user.tipo = nuevaInfo.tipo;
      if (typeof nuevaInfo.status !== "undefined")
        user.status = nuevaInfo.status;
      if (typeof nuevaInfo.password !== "undefined")
        user.crearPassword(nuevaInfo.password);
      user
        .save()
        .then((updatedUser) => {
          res.status(201).json(updatedUser.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

function eliminarUsuario(req, res, next) {
  Usuario.findOneAndDelete({ _id: req.usuario.id })
    .then((r) => {
      res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
    })
    .catch(next);
}

function iniciarSesion(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "no puede estar vacío" } });
  }

  if (!req.body.password) {
    return res
      .status(422)
      .json({ errors: { password: "no puede estar vacío" } });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (user) {
        user.token = user.generarJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
}

function coincidenciaAtributos(req, res, next) {
  let matchAtribut = req.body;
  var propiedad, atributo;
  // Usuario.findById(req.usuario.id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.sendStatus(401);
  //     }
  if (typeof matchAtribut.nombre !== "undefined") {
    propiedad = "nombre";
    atributo = matchAtribut.nombre;
  }
  if (typeof matchAtribut.apellido !== "undefined") {
    propiedad = "apellido";
    atributo = matchAtribut.apellido;
  }
  if (typeof matchAtribut.tipo !== "undefined") {
    propiedad = "tipo";
    atributo = matchAtribut.tipo;
  }
  if (typeof matchAtribut.status !== "undefined") {
    propiedad = "status";
    atributo = matchAtribut.status;
  }
  Usuario.aggregate([
    {
      $match: {
        apellido: atributo,
      },
    },
  ])
    .then((users) => {
      let response = [];
      users.forEach((user) => {
        response.push(user.publicData());
      });
      return res.send(response);
    })
    .catch(next);
  // let atributo = req.params.atributo;
  // Usuario.aggregate([
  //   {
  //     $match: {
  //       tipo: atributo,
  //     },
  //   },
  // ])
  //   .then((users) => {
  //     let response = [];
  //     users.forEach((user) => {
  //       response.push(user.publicData());
  //     });
  //     return res.send(response);
  //   })
  //   .catch(next);
}

function obtenerUsuariosPorNombre(req, res, next) {
  let nombre = req.params.nombre;
  Usuario.find({ nombre: nombre })
    .then((users) => {
      let response = [];
      users.forEach((user) => {
        response.push(user.publicData());
      });
      return res.send(response);
    })
    .catch(next);
}

function obtenerUsuariosPorApellido(req, res, next) {
  let apellido = req.params.apellido;
  Usuario.find({ apellido: apellido })
    .then((users) => {
      let response = [];
      users.forEach((user) => {
        response.push(user.publicData());
      });
      return res.send(response);
    })
    .catch(next);
}
function obtenerUsuariosPorTipo(req, res, next) {
  let tipo = req.params.tipo;
  Usuario.find({ tipo: tipo })
    .then((users) => {
      let response = [];
      users.forEach((user) => {
        response.push(user.publicData());
      });
      return res.send(response);
    })
    .catch(next);
}
function obtenerUsuariosPorStatus(req, res, next) {
  let status = req.params.status;
  Usuario.find({ status: status })
    .then((users) => {
      let response = [];
      users.forEach((user) => {
        response.push(user.publicData());
      });
      return res.send(response);
    })
    .catch(next);
}

function registrosLimitados(req, res, next) {
  let lim = parseInt(req.params.limit);
  Usuario.find()
    .limit(lim)
    .then((users) => {
      let response = [];
      users.forEach((user) => {
        response.push(user.publicData());
      });
      return res.send(response);
    })
    .catch(next);
}

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion,
  registrosLimitados,
  coincidenciaAtributos,
  obtenerUsuariosPorNombre,
  obtenerUsuariosPorApellido,
  obtenerUsuariosPorTipo,
  obtenerUsuariosPorStatus,
};
