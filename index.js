const express = require('express'); // npm install express

const routes = require('./src/routes');

const cors = require('cors'); // npm install cors

const bodyParser = require('body-parser'); // used to handle POST requests

const mongoose = require('mongoose'); // mongodb framework

require('dotenv').config();

const server = express();

const port = 3001;

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(cors());

routes(server);

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-jix4n.mongodb.net/test?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;

db.on('error', (error) => { console.log('Error connecting '+ error) })

db.once('open', () => {
    console.log('Successfully connected to the db.')
    server.listen(port, function () {
        console.log(`Server started on port ${port}, hello world!`);

        // create a document from the book model
        // const firstBook = new models.Book({
        //     isbn: 111,
        //     title: 'Crime and punishment',
        //     author: 'Dostoyevsky',
        //     year: '1866'
        // })
        // // try to save the newly created book in the database
        // firstBook.save((err, book) => {
        //     if (err) {
        //         console.log('Data was not saved: '+ err)
        //     } else {
        //         console.log(book)
        //     }
        // })
    });
})



