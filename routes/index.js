var router = require("express").Router();

// Raíz del endpoint
router.get("/", (req, res) => {
  res.send("Bienvenido a la API Celulapp");
});

router.use("/usuarios", require("./usuarios"));

module.exports = router;
