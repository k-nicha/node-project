const express = require('express');

const server = express();

const port = 3001;

/* request i response se dvata parametri na callbackot na rutata */
server.get('/', function (request, response) {
    /* tuka se obrabotuva requestot sto stiga na inicijalnata ruta */

    response.status(200).send('You have reached the server! ')
})

server.get('/users', (req, res) => {

    try {

        const array = ['Petko', 'Stanko', 'Mirko']

        const name = req.query.name

        if (name && array.includes(name)) {
            res.status(200).send(name)
        } else {
            res.status(200).send(array)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({error: 'An error occured'})
    }
})

// Search users by id
server.get('/users/:id', (request, response) => {
    
    const array = ['Petko', 'Stanko', 'Mirko']
    
    // The route param value is in the request object
    const id = request.params.id

    if (array[id]) {
        response.status(200).send(array[id])
    } else {
        response.status(200).send('No data found')
    }
})



// server.post('/')
// server.delete('/')

server.listen(port, function () {
    console.log(`Server started on port ${port}, hello world!`);
});

