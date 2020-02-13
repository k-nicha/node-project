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
                 
            const found = localStorage.find(element => {
                return data.isbn === element.isbn // returns true or false
            })

            if (found) { // ISBN-ot sto probuvas da go zacuvas vekje postoi
                res.status(200).json('This ISBN already exists')
                return
            }
            
            // Ako ISBN-ot ne postoi, vnesi go 
            data.creationDate = new Date()
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

    server.get('/books/get-todays-books', (req, res) => {
        let newArray = []
        const today = new Date()
        // d/m/y
        const shortDate = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear()
        for (i=0; i < localStorage.length; i++) {
            // book creation date
            const longDate = localStorage[i].creationDate

            if (longDate && (typeof longDate.getMonth === 'function')) {
                const bookDate = longDate.getDate() + '/' + longDate.getMonth() + '/' + longDate.getFullYear()

                if (shortDate === bookDate) {
                    newArray.push(localStorage[i])
                }
            }
        }
        res.status(200).json(newArray)
    })


    server.get('/books/get-books-byauthor/:author', (req, res) => {
        let newArray = []
        
        newArray = localStorage.filter((element) => {
            return element.author === req.params.author 
        })

        res.status(200).json(newArray)
    })
}


module.exports = routes

