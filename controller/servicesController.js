const Services = require("../model/services");
const Customers = require('../model/customer');
const User = require('../model/user');

exports.getData = (req, res, next) => {
    Services.find()
        .then(services => {
            Customers.find()
                .then(customers => {
                    User.find()
                        .then(users => {
                            res.render('dashboard', {
                                customer: customers,
                                services: services,
                                users: users,
                                role: req.session.role
                            })
                        })
                })
        })
}

exports.addServices = (req, res, next) => {
    res.render('addServices')
}

exports.servicesAdded = async (req, res, next) => {
    var service = req.body.service;
    var customerName = req.body.customer;
    var amountPayable = req.body.amount;
    const services = new Services({
        services: service,
        customerName: customerName,
        amountPayable: amountPayable
    })
    await services.save();
    const customer = new Customers({
        customerName: customerName,
        amountCharged: amountPayable,
        serviceAssigned: service
    })
    await customer.save();
    res.redirect('getData')
}

exports.addCustomer = (req, res, next) => {
    res.render('addCustomer')
}

exports.customerAdded = async (req, res, next) => {
    var customer = req.body.customer;
    var amountCharged = req.body.amount;
    var serviceAssigned = req.body.service;
    const customers = new Customers({
        customerName: customer,
        amountCharged: amountCharged,
        serviceAssigned: serviceAssigned
    })
    await customers.save();
    const services = new Services({
        customerName: customer,
        amountPayable: amountCharged,
        services: serviceAssigned
    })
    await services.save();
    res.redirect('getData')
}

exports.addUser = (req, res, next) => {
    res.render('addUser')
}

exports.userAdded = async (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    const user = new User({
        emailId: email,
        password: password,
        name: name
    })
    await user.save()
    res.redirect('getData')
}

exports.deleteServices = async (req, res, next) => {
    var services = req.body.services;
    await Services.findOneAndDelete({ customerName: services })
    await Customers.findOneAndDelete({ customerName: services })
    res.redirect('getData')
}

exports.deleteCustomers = async (req, res, next) => {
    var customers = req.body.customers;
    await Services.findOneAndDelete({ customerName: customers })
    await Customers.findOneAndDelete({ customerName: customers })
    res.redirect('getData')
}

exports.deleteUsers = async (req, res, next) => {
    var users = req.body.users;
    await User.findOneAndDelete({ name: users })
    res.redirect('getData')
}

exports.updateServices = (req, res, next) => {
    var update = req.body.services;
    Services.findOne({ services: update })
        .then(result => {
            res.render('updateServices', {
                customerName: result.customerName,
                services: result.services,
                amountPayable: result.amountPayable
            })
        })
}

exports.serviceUpdated = async (req, res, next) => {
    var update = req.body.update
    var customerName = req.body.customer;
    var service = req.body.service;
    var amountPayable = req.body.amount;
    await Services.findOneAndUpdate({ customerName: update }, {
        customerName: customerName,
        services: service,
        amountPayable: amountPayable
    })
    await Customers.findOneAndUpdate({ customerName: update }, {
        customerName: customerName,
        amountCharged: amountPayable
    })
    res.redirect('getData')
}

exports.updateCustomer = (req, res, next) => {
    var update = req.body.customer;
    Customers.findOne({ customerName: update })
        .then(result => {
            res.render('updateCustomer', {
                customerName: result.customerName,
                services: result.serviceAssigned,
                amountCharged: result.amountCharged
            })
        })
}

exports.customerUpdated = async (req, res, next) => {
    var update = req.body.update
    var customerName = req.body.customer;
    var amountCharged = req.body.amount;
    var serviceAssigned = req.body.service;
    await Customers.findOneAndUpdate({ customerName: update }, {
        customerName: customerName,
        amountCharged: amountCharged,
        serviceAssigned: serviceAssigned
    })
    await Services.findOneAndUpdate({ customerName: update }, {
        customerName: customerName,
        amountPayable: amountCharged,
        services: serviceAssigned
    })
    res.redirect('getData')
}