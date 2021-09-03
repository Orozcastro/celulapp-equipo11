const express = require("express");
const app = express();

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas globales
app.use("/v1", require("./routes"));

// Iniciando el servidor
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
