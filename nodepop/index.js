'use strict'
const { request, response } = require('express');
//cargo la libreria
const express = require('express');

//creo la app
const app = express();

//añado la ruta
app.get('/', (request, response, next) => {
    response.send('Hola');
});

//arrancamos servidor
app.listen(3000, () => {
    console.log('Servidor arrancado en http://127.0.0.1:3000');
});