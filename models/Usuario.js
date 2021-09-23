// mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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

UsuarioSchema.methods.publicData = () => {
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
