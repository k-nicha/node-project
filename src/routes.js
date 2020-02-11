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


    server.post('/books/new', (req, res) => {
        // receives data object for a new book
        const data = req.body // {...}

        console.log(data)

        if (!data) {
            res.status(400).json('Bad request, no data found.')
        } else {
            localStorage.push(data)
            console.log(localStorage)
            res.status(201).json('Succesfully created the entry.')
        }
    })

    server.delete('/books/remove/:isbn', (req, res) => {
        const found = localStorage.findIndex((element) => {
            element.isbn === req.params.isbn
        })

        if (found) {
            localStorage.splice(found, 1)
            console.log(localStorage)
            res.status(200).json('Succesfully deleted the entry.')
        } else {
            if (!req.params.isbn) {
                res.status(400).json('Bad request, no data found.')
            } else {
                res.status(200).json('No such entry found.')
            }
            
        }
    })
}


module.exports = routes

