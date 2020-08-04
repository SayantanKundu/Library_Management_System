const express = require('express');
const userController = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.get('/books', userController.getBooks);

userRoutes.post('/adduser', userController.addUser);

userRoutes.get('/login', userController.loginUser);

userRoutes.post('/issuebookrequest', userController.issueBookRequest);

userRoutes.get('/issuedbooks', userController.getIssuedBooks);

userRoutes.put('/returnbook', userController.returnBook);

module.exports = userRoutes;