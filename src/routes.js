const services = require('./services')
const middleWares = require('./middleWares')

function routes (server) {
    server.get('/', services.getInitialRoute)

    server.get(
        '/get-all-books',
        middleWares.getAllBooks,
        services.getAllDocs
    )

    server.get(
        '/get-all-authors',
        middleWares.findAllAuthors,
        services.getAllDocs
    )

    server.get(
        '/get-dead-authors',
        services.getDeadAuthors
    )

    server.get('/get-books-by-author/:name', services.getBooksByAuthor)

    server.post('/add-book', services.createNewBook)

    server.post('/add-author', services.createNewAuthor)

    server.delete('/remove-book/:isbn', services.removeBook)

    // read file with FS and return it as response
    server.get('/download-manual', services.getFile)

    server.post('/upload-file', services.writeFile)

    server.post('/update-book', services.updateBook)
}

module.exports = routes