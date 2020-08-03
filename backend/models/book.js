const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Book', bookSchema);