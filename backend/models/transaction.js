const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    bookDetails: {
        bookId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Book'
        },
        bookName: {
            type: String,
            required: true
        }
    },
    type: {
        type: String,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);