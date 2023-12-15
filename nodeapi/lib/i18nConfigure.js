//cargo la libreria i18n
const i18n = require("i18n");
const path = require("node:path");

//configurar instancias
i18n.configure({
  locales: ["en", "es"],
  directory: path.join(__dirname, "..", "locales"),
  defaultLocale: "en",
  autoReload: true,
  syncFiles: true, //sincroniza la info si hay cambios en json
});
//para utilizar en script
i18n.setLocale("en");

//exportar
module.exports = i18n;
