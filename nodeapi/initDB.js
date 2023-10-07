'use strict'

const mongoose = require('mongoose');
const connectMongoose = require('./lib/connectMongoose'); 
const Anuncio = require('./models/Anuncio');  
const anuncioData = require('./initDBdata.json');  

async function initDB() {
    try {
        // Conectar a la base de datos
        await new Promise(resolve => connectMongoose.once('open', resolve));

        // Eliminar todos los anuncios existentes
        await Anuncio.deleteMany();
        console.log('Todos los anuncios eliminados.');

        // Insertar nuevos anuncios desde el archivo JSON
        await Anuncio.insertMany(anuncioData.anuncios);
        console.log('Anuncios cargados exitosamente.');

        // Desconectar de la base de datos
        mongoose.connection.close();
        console.log('Conexión cerrada.');

    } catch (error) {
        console.error('Error durante la inicialización de la base de datos:', error);
    }
}

// Llamar a la función de inicialización
initDB();
