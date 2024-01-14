const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
require("dotenv").config();

class LoginController {
  index(req, res, next) {
    res.locals.error = "";
    res.locals.email = "";
    res.render("authenticate");
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.error = req.__("Invalid credentials");
        res.locals.email = email;
        res.render("authenticate");
        return;
      }

      // si existe y la contraseña coincide --> zona privada
      // apuntar en la sesión del usuario, que está autenticado
      req.session.usuarioLogado = usuario._id;

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }

  logout(req, res, next) {
    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/");
    });
  }

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.json({ error: "Invalid credentials" });
        return;
      }

      // si existe y la contraseña coincide --> devuelvo un JWT
      const tokenJWT = await jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      res.cookie("jwt", tokenJWT, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
      });
      res.json({ jwt: tokenJWT });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
