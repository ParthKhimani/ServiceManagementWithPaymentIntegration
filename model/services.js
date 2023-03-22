const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    services: String,
    customerName: String,
    amountPayable: Number
})

module.exports = mongoose.model('Service', servicesSchema);