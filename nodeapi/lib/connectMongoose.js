const mongoose = require("mongoose");
require("dotenv").config(); //carga la libreria de mongoose

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión", err);
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB", mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;
