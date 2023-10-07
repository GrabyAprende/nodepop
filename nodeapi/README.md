# NodeApi
Desarrollo de una API 

# Requisitos Previos
Node.js: tener Node.js instalado.
MongoDB: Instala y ejecuta MongoDB como tu base de datos.

# Instalacion de dependencias
`npm install``

# Inicia un servidor MongoDB en MacOS o Linux
Carpeta del servidor:
`./bin/mongod --dbpath ./data

Revisa la conexión a la base de datos en /lib/connectMongoose.js (ver "Iniciar un servidor MongoDB en MacOS o Linux")

# inicialización de la base de datos:
`npm run initDB``

# start
en producción 
`npm install``

en desarrolladores
`npm run dev``

El servidor estará disponible en http://localhost:3000 por defecto.


# Uso de la API
Obtener Anuncios
`GET /api/anuncios``

Filtrar Anuncios por tag, nombre, venta, precio.
`GET /api/anuncios?tag=mobile&venta=false&nombre=ip&precio=50-`


