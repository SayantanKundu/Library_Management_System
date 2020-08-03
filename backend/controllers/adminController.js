const Book = require('../models/book');
const IssueRequest = require('../models/issuerequest');
const Transaction = require('../models/transaction');
const HttpError = require('../models/error');
const { Console } = require('console');

exports.addBooks = (req, res, next) => {
    let { name, author } = req.body;

    const book = new Book({ name: name, author: author });

    book.save()
        .then(result => {
            res.json({ message: "Book added succesfully" });
        })
        .catch(err => {
            return next(new HttpError('Internal server error', 500));
        })
}

exports.getBookrequest = (req, res, next) => {
    IssueRequest.find()
        .then(result => {
            res.json({ result })
        })
        .catch(err => {
            return next(new HttpError('Internal server error', 500));
        })
}

exports.issueBook = (req, res, next) => {
    let { userName, bookId, bookName, issueId } = req.body;
    console.log(issueId);

    let currentDate = new Date();
    // currentDate=currentDate.toISOString();

    const transaction = new Transaction({
        userName: userName,
        bookDetails: {
            bookId: bookId,
            bookName: bookName
        },
        type: 'Borrow',
        dueDate: currentDate
    });

    transaction.save()
        .then(result => {
            IssueRequest.findByIdAndRemove(issueId)
                .catch(err => {
                    return next(new HttpError('Internal server error', 500));
                });

            Book.findByIdAndUpdate(bookId, { available: false })
                .then(result => {
                    res.json({ message: bookName + ' has been issued successfully ' })
                })
                .catch(err => {
                    return next(new HttpError('Internal server error', 500));
                })
        })
        .catch(err => {
            console.log(err);
            return next(new HttpError('Internal server error', 500));
        });
}

exports.deleteBook = (req, res, next) => {
    const { id } = req.query;
    Book.findByIdAndRemove(id)
        .then(response => {
            res.json({ message: 'Book deleted successfully' })
        })
        .catch(err => {
            return next(new HttpError('Internal server error', 500));
        })
}