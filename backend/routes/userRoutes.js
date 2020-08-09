const express = require('express');
const userController = require('../controllers/userController');

const userRoutes = express.Router();

/**
 * 
 * @swagger
 * /api/user/books:
 *  get:
 *      description: Get all books
 *      responses:
 *          '200':
 *              description: A succesful response
 *          '500':
 *              description: Internal server error
 *          '404':
 *              description: Book not found 
 * 
 */
userRoutes.get('/books', userController.getBooks);

userRoutes.post('/adduser', userController.addUser);

userRoutes.get('/login', userController.loginUser);

userRoutes.post('/issuebookrequest', userController.issueBookRequest);

userRoutes.get('/issuedbooks', userController.getIssuedBooks);

userRoutes.put('/returnbook', userController.returnBook);

module.exports = userRoutes;