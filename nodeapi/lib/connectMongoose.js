const mongoose = require("mongoose"); //carga la libreria de mongoose

mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
});

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1/nodepop')

