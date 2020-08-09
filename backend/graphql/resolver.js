const Book = require('../models/book');

module.exports = {
    getBookData() {
        return Book.find()
            .then(result => {
                return { bookDetails: result };
            })
    }
}