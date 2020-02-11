const express = require('express'); // npm install express

const routes = require('./src/routes');

const cors = require('cors'); // npm install cors

const bodyParser = require('body-parser'); // used to handle POST requests

const server = express();

const port = 3001;

const localStorage = [];

localStorage.push({ isbn: '1', name: 'Crime and punishment' })
localStorage.push({ isbn: '2', name: 'Witcher' })
localStorage.push({ isbn: '3', name: 'The lord of the rings' })


server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(cors());

routes(server, localStorage);


server.listen(port, function () {
    console.log(`Server started on port ${port}, hello world!`);
});

