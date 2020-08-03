const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueRequestSchema = new Schema({
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
    }
});

module.exports = mongoose.model('IssueRequest', issueRequestSchema);