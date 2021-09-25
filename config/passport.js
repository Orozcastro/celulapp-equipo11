const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

// configuracion
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, next) {
      Usuario.findOne({ email: email })
        .then(function (user) {
          if (!user || !user.validarPassword(password)) {
            return next(null, false, {
              errors: { "email o contraseña": "equivocado(a)" },
            });
          }
          return next(null, user);
        })
        .catch(next);
    }
  )
);
