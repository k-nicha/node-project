const express = require('express');

const server = express();

const port = 3001;

/* request i response se dvata parametri na callbackot na rutata */
server.get('/', function (request, response) {
    /* tuka se obrabotuva requestot sto stiga na inicijalnata ruta */

    response.status(200).send('You have reached the server! ')
})
// server.post('/')
// server.delete('/')

server.listen(port, function () {
    console.log(`Server started on port ${port}, hello world!`);
});

