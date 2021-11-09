const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACION DE LA BASE DE DATOS (mongoose)
const mongoose = require('mongoose');
require('./models/Celulares');

mongoose.connect(
  process.env.MONGO_URI, // obtiene la url de conexión desde las variables de entorno
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

// debugg
mongoose.set('debug', true);

//modelos
require('./models/Usuario');
// require("./models/celulares");

// para la autenticacion
require("./config/passport");

// Rutas globales
app.use('/v1', require('./routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciando el servidor
const PORT = 4001;
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})


