var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.redirect('/api/anuncios') 
});

module.exports = router;
