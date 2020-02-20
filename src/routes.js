const services = require('./services')

function routes (server) {
    server.get('/', services.getInitialRoute)

    server.get('/get-all-books', services.getAllBooks)
}

module.exports = routes