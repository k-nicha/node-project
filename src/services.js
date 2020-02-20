const models = require('./models')

class Services {
    getInitialRoute (req, res) {
        res.status(200).send('You have reached the server!')
    }

    async getAllBooks (req, res) {
        try {
        const books = await models.Book.find({ year: { $regex: /18*/ } })
            res.status(200).json(books)
        } catch (error) {
            res.status(500).json({ message: 'Server error ' + error})
        }
    }
}

module.exports = new Services()