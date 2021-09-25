const mongoose = require('mongoose');
const { Schema } = mongoose;
const secret = require("../config").secret;

const celularSchema = new Schema(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    almacenamiento_gb: { type: Number, required: true },
    ram_gb: { type: Number, required: true },
    peso_gr: Number,
    bateria_mAh: Number,
    tamano_pantalla_in: Number,
    camara: {
      trasera_Mpx: Number,
      frontal_Mpx: Number,
    },
    color: [],
    sistema_operativo: { type: String, required: true },
  },
  { collection: 'celulares', timestamps: true }
);

celularSchema.methods.publicData = function () {
  return {
    id: this.id,
    marca: this.marca,
    modelo: this.modelo,
    almacenamiento: this.almacenamiento_gb,
    ram: this.ram_gb,
    peso: this.peso_gr,
    bateria: this.bateria_mAh,
    tamano_pantalla: this.tamano_pantalla_in,
    camara: this.camara,
    color: this.color,
    sistema_operativo: this.sistema_operativo,
  };
};

mongoose.model('Celular', celularSchema);
