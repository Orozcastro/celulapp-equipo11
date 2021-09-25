// mongoose Model Usuario
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const UsuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/^[a-zA-Z0-9]+$/, "es inválido"],
      index: true,
    },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/\S+@\S+\.\S+/, "es inválido"],
      index: true,
    },
    tipo: { type: String, enum: ["Administrador", "Comprador", "Ventas"] },
    hash: String,
    salt: String,
    status: { type: Boolean },
  },
  {
    collection: "usuarios",
    timestamps: true,
  }
);

UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" });

UsuarioSchema.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

// // validar el password,
UsuarioSchema.methods.validarPassword = function (password) {
  const newHash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === newHash; //
};

//JWT
UsuarioSchema.methods.generarJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

//JSON Autentificado
UsuarioSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generarJWT(),
  };
};

// Public data
UsuarioSchema.methods.publicData = function () {
  return {
    id: this.id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    tipo: this.tipo,
    status: this.status,
  };
};
mongoose.model("Usuario", UsuarioSchema);
