const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    emailId: String,
    contactNumber: Number,
    dateOfBirth: {
        type: Date,
        // max: Date.now()
    },
    password: String,
    confirmPassword: String,
    city: String,
    role: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', usersSchema)