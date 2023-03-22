const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerName: String,
    serviceAssigned: String,
    amountCharged: Number
})

module.exports = mongoose.model('Customer', customerSchema);