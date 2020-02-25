const models = require('./models')

class Services {
    getInitialRoute (req, res) {
        res.status(200).send('You have reached the server!')
    }

    async getAllDocs (req, res) {
        try {
            res.status(200).json(res.docs)
        } catch (error) {
            res.status(500).json({ message: 'Server error ' + error})
        }
    }

    async getBooksByAuthor (req, res) {
        try {
            const books = await models.Book.find({ author: req.params.name })
            res.status(200).json(books)
        } catch (error) {
            res.status(500).json({ message: 'Server error ' + error})
        }
    }

    async createNewBook (req, res) {
        try {
            const data = req.body
            const found = await models.Book.findOne({ isbn: data.isbn })

            if (found) {
                res.status(400).json({
                    message: 'Book already exists',
                    book: found
                })

                return
            }
            
            const newBook = models.Book(data)
            const saved = await newBook.save()

            if (saved) {
                res.status(201).json('Successfully added a new book')
            } else {
                res.status(400).json('Error in data object')
            }
        } catch (error) {
            res.status(500).json('Server error ' + error)
        }
    }

    async createNewAuthor (req, res) {
        try {
            const data = req.body
            const found = await models.Author.findOne({
                firstName: data.firstName,
                lastName: data.lastName
            })

            if (found) {
                res.status(400).json({
                    message: 'Author already exists',
                    author: found
                })

                return
            }
            
            const newAuthor = models.Author(data)
            const saved = await newAuthor.save()

            if (saved) {
                res.status(201).json('Successfully added a new author')
            } else {
                res.status(400).json('Error in data object')
            }
        } catch (error) {
            res.status(500).json('Server error ' + error)
        }
    }

    async removeBook (req, res) {
        try {
            const deleted = await models.Book.deleteOne({ isbn: req.params.isbn })
            console.log(deleted.deletedCount)
            if (deleted.deletedCount > 0) { 
                res.status(200).json('Successfully deleted the book')
            } else {
                res.status(400).json('General error')
            }
        } catch (error) {
            res.status(500).json('Server error')
        }
    }
}

module.exports = new Services()