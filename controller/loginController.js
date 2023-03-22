const nodemailer = require('nodemailer');

const User = require('../model/user');
const Customer = require('../model/customer');
const Services = require('../model/services');

exports.registration = (req, res, next) => {
    res.render('registrationForm');
}

exports.registerUser = (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var contactNumber = req.body.contactNumber;
    var dateOfBirth = req.body.dateOfBirth;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var city = req.body.city;
    const user = new User({
        name: name,
        emailId: email,
        contactNumber: contactNumber,
        dateOfBirth: dateOfBirth,
        password: password,
        confirmPassword: confirmPassword,
        city: city
    })
    User.findOne({ emailId: email })
        .then(result => {
            if (result != null) {
                res.render('registrationForm', {
                    dataError: '*email already registered!'
                })
            }
            else {
                user.save()
                    .then(res.redirect('login'))

                //Sending Mail to User
                let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'parthkhimani48@gmail.com',
                        pass: 'appKey'
                    }
                });

                let mailDetails = {
                    from: 'parthkhimani48@gmail.com',
                    to: email,
                    subject: 'Registration',
                    text: 'Registered Successfully!'
                };

                mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log('Error Occurs');
                    } else {
                        console.log('Email sent successfully');
                    }
                });
            }
        })
}

exports.login = (req, res, next) => {
    res.render('loginForm')
}

exports.loginUser = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ $and: [{ emailId: email }, { password: password }] })
        .then(result => {
            Customer.find()
                .then(customers => {
                    Services.find()
                        .then(services => {
                            User.find()
                                .then(users => {
                                    if (result != null) {
                                        req.session.role = result.role;
                                        res.render('dashboard', {
                                            role: req.session.role,
                                            customer: customers,
                                            services: services,
                                            users: users
                                        })
                                    }
                                    else {
                                        res.render('loginForm', {
                                            dataError: '*invalid credentials'
                                        })
                                    }
                                })

                        })
                })
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/registration');
    })
}