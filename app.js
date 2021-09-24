const express = require("express");
const app = express();

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACION DE LA BASE DE DATOS (mongoose)
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://equipo11:phoneapi11@cluster0.xpma4.mongodb.net/celulapp?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  }
);

// debugg
mongoose.set("debug", true);

//modelos
require("./models/Usuario");
// require("./models/celulares");

// para la autenticacion
require("./config/passport");

// Rutas globales
app.use("/v1", require("./routes"));

// Iniciando el servidor
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
