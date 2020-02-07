function routes (server, localStorage) {

    /* request i response se dvata parametri na callbackot na rutata */
    server.get('/', function (request, response) {
        /* tuka se obrabotuva requestot sto stiga na inicijalnata ruta */
        response.status(200).send('You have reached the server! ')
    })

    server.get('/users', (req, res) => {
        try {
            // za doma da se sredi ova prebaruvanje da raboti so storage objektot
            const name = req.query.name
            if (name && array.includes(name)) {
                res.status(200).send(name)
            } else {
                res.status(200).send(localStorage)
            }
        } catch (error) {
            console.error(error)
            res.status(500).send({error: 'An error occured'})
        }
    })

    // Search users by id
    server.get('/users/:id', (request, response) => {
        
        // The route param value is in the request object
        const id = request.params.id
        if (localStorage[id]) {
            response.status(200).json(localStorage[id])
        } else {
            response.status(200).send('No data found')
        }
    })
}


module.exports = routes

