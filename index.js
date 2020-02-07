const express = require('express'); // npm install express

const routes = require('./src/routes');

const cors = require('cors'); // npm install cors

const server = express();

const port = 3001;

const localStorage = {};

localStorage['1'] = 'Petko';
localStorage['2'] = 'Mirko';
localStorage['3'] = 'Stanko';

server.use(cors());

routes(server, localStorage);


server.listen(port, function () {
    console.log(`Server started on port ${port}, hello world!`);
});

