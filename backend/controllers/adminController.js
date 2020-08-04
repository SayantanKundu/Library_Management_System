const Book = require('../models/book');
const User = require('../models/user');
const IssueRequest = require('../models/issuerequest');
const Transaction = require('../models/transaction');
const HttpError = require('../models/error');

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

    let cuurentDate = new Date();

    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const transaction = new Transaction({
        userName: userName,
        bookDetails: {
            bookId: bookId,
            bookName: bookName
        },
        type: 'Borrow',
        date: cuurentDate,
        dueDate: dueDate
    });

    transaction.save()
        .then(result => {
            IssueRequest.findByIdAndRemove(issueId)
                .catch(err => {
                    return next(new HttpError('Internal server error', 500));
                });

            User.updateOne({ userName: userName }, { $push: { issuedBooks: { bookId: bookId, bookName: bookName } } })
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