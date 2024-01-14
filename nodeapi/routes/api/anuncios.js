var express = require("express");
var router = express.Router();
const Anuncio = require("../../models/Anuncio");
const upload = require("../../lib/uploadConfigure");

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    const filtroPorNombre = req.query.nombre;
    const filtroPorTag = req.query.tag;
    const filtroPorPrecio = req.query.precio;
    const filtroPorVenta = req.query.venta;

    const start = req.query.start;
    const limit = req.query.limit;
    const sort = req.query.sort;

    const filtro = {};

    if (filtroPorNombre) {
      filtro.nombre = new RegExp("^" + req.query.nombre, "i");
    }
    if (filtroPorTag) {
      filtro.tags = filtroPorTag;
    }
    if (filtroPorPrecio) {
      const rangoPrecio = filtroPorPrecio.split("-");
      //si el precio tiene un guion, es un rango de precios si existen dos valores
      //si el guion esta al principio, busca los precio menores
      //si esta al final, los precios mayores
      //si no hay guion, buscara lo que sea igual a ese precio
      const precio = {};
      if (rangoPrecio.length === 2) {
        //si la longitud del rango es igual a dos precios
        if (rangoPrecio[0] !== "") {
          //si el rangoprecio inicial[0] es distinto a vacio
          filtro.precio = { $gte: rangoPrecio[0] }; //tomamos el inicial y muestras los mayores a ese precio
        }
        if (rangoPrecio[1] !== "") {
          filtro.precio = { ...filtro.precio, $gte: rangoPrecio[1] };
        }
      } else {
        filtro.precio = rangoPrecio[0];
      }
    }
    if (filtroPorVenta) {
      filtro.venta = filtroPorVenta;
    }

    const listaAnuncios = await Anuncio.lista(filtro, start, limit, sort);

    res.render("index", {
      title: "Nodepop",
      listaAnuncios,
    });
  } catch (err) {
    res.render("error", {
      message: "Ocurrio un error",
      error: err,
    });
  }
});

// POST /api/anuncios
// Crea un anuncio
router.post("/", upload.single("foto"), async (req, res, next) => {
  try {
    const anuncioData = req.body;

    console.log(req.file);

    // creamos una instancia de anuncio en memoria
    const anuncio = new Anuncio(anuncioData);
    anuncio.foto = req.file.filename;

    // la persistimos en la BD
    const anuncioGuardado = await anuncio.save();

    res.json({ result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
