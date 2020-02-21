const services = require('./services')

function routes (server) {
    server.get('/', services.getInitialRoute)

    server.get('/get-all-books', services.getAllBooks)

    server.get('/get-books-by-author/:name', services.getBooksByAuthor)

    server.post('/add-book', services.createNewBook)

    server.delete('/remove-book/:isbn', services.removeBook)
}

module.exports = routes