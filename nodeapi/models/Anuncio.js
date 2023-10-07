
const mongoose = require("mongoose");

//definir el esquema de anun
const anuncioSchema = mongoose.Schema({
        nombre: String,
        venta: Boolean,
        precio: Number,
        foto: String,
        tags: [String]
}); 

anuncioSchema.statics.lista = function (filtro, skip, limit, sort, fields) {
        const query = Anuncio.find(filtro); 
        query.skip(skip);
        query.limit(limit);
        query.sort(sort);
        query.select(fields);
        return query.exec();
};

//crear el modelo de anuncios
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

//exportar el modelo de anuncios
module.exports = Anuncio;