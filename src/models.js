const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    // Book model template
    isbn: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: String
})

const autorSchema = new mongoose.Schema({
    // Author model template
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: Date,
    dateOfPassing: Date
})

const Book = mongoose.model('Book', bookSchema)
const Author = mongoose.model('Author', autorSchema)

module.exports = {
    Book: Book,
    Author: Author
}