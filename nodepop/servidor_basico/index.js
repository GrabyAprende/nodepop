
//cargar la libreria http
const http = require('http');

//definir servidor
const servidor = http.createServer(function(request, response) {
    response.writeHead(200,{ 'Content-type': 'text/plain'})

    response.end(`Wake up, Neo`);
})

//arrancamos servidor
servidor.listen(3000, '127.0.0.1');
console.log('Servidor arrancado en http://127.0.0.1:3000');
