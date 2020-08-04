const Book = require('../models/book');
const IssueRequest = require('../models/issuerequest');
const User = require('../models/user');
const HttpError = require('../models/error');
const Transaction = require('../models/transaction');

exports.getBooks = (req, res, next) => {
    Book.find()
        .then(result => {
            res.json({ result });
        })
        .catch(err => {
            return next(new HttpError('Internal server error', 500));
        })
}

exports.addUser = (req, res, next) => {
    let { name, email, contactNo, password, role } = req.body;
    let isAdmin = role === 'admin' ? true : false;

    let userName = name + "_" + Math.random().toString(36).slice(7);

    const user = new User({
        name: name,
        email: email,
        contactNo: contactNo,
        password: password,
        isAdmin: isAdmin,
        userName: userName
    })

    user.save()
        .then(result => {
            res.json({ message: "User registered successfully", userName: userName });
        }).catch(err => {
            return next(new HttpError('Internal server error', 500));
        })
}

exports.loginUser = (req, res, next) => {
    let { userField, password, role } = req.query;
    User.findOne({ userName: userField })
        .then(user => {
            console.log(user);
            if (user !== null) {
                if (user.isAdmin === true && role === 'admin') {
                    if (user.password === password) {
                        res.json({ message: "Admin login successful" });
                    } else {
                        return next(new HttpError('Please provide valid credentials', 401));
                    }
                } else {
                    res.json({ message: "User Login successful" });
                }
            } else {
                return next(new HttpError('Invalid username', 404));
            }
        })
        .catch(err => {
            return next(new HttpError('Internal server error', 500));
        })
}

exports.issueBookRequest = (req, res, next) => {
    let { id, bookName, userName } = req.body;

    const issueRequest = new IssueRequest({
        userName: userName,
        bookDetails: {
            bookId: id,
            bookName: bookName
        }
    })

    IssueRequest.findOne({ $and: [{ userName: userName }, { bookDetails: { bookId: id, bookName: bookName } }] })
        .then(issue => {
            if (issue === null) {
                issueRequest.save()
                    .then(result => {
                        res.json({ message: 'Issue request generated successfully for ' + bookName });
                    })
                    .catch(err => {
                        return next(new HttpError('Internal server error', 500));
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return next(new HttpError('Internal server error', 500));
        });
}

exports.getIssuedBooks = (req, res, next) => {
    let { userName } = req.query;

    User.findOne({ userName: userName })
        .then(result => {
            if (result) {
                let issuedbooks = result.issuedBooks;
                if (issuedbooks.length != 0) {
                    res.json({ result: issuedbooks });
                }
            }
        }).catch(err => {
            return next(new HttpError('Internal server error', 500));
        })
}

exports.returnBook = (req, res, next) => {
    let { userName, bookId, bookName } = req.body;
    let currentDate = new Date();

    const transaction = new Transaction({
        userName: userName,
        bookDetails: {
            bookId: bookId,
            bookName: bookName
        },
        type: 'Return',
        date: currentDate
    });

    transaction.save()
        .then(result => {
            User.findOne({ userName: userName })
                .then(user => {
                    if (user) {
                        let updatedIssuedBook = user.issuedBooks.filter(book => {
                            return book.bookId !== bookId;
                        });
                        User.updateOne({ userName: userName }, { issuedBooks: updatedIssuedBook })
                            .catch(err => {
                                return next(new HttpError('Internal server error', 500));
                            })
                    }
                })

            Book.findByIdAndUpdate(bookId, { available: true })
                .then(result => {
                    res.json({ message: bookName + ' has been returned successfully ' })
                })
                .catch(err => {
                    return next(new HttpError('Internal server error', 500));
                })
        });
}