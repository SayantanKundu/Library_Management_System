const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);