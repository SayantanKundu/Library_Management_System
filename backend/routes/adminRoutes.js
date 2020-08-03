const express = require('express');
const adminController = require('../controllers/adminController');

const adminRoutes = express.Router();

adminRoutes.post('/addbook', adminController.addBooks);

adminRoutes.get('/bookrequest', adminController.getBookrequest);

adminRoutes.post('/issuebook', adminController.issueBook);

adminRoutes.delete('/deletebook', adminController.deleteBook);

module.exports = adminRoutes;