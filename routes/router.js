const express = require('express');

const loginController = require('../controller/loginController');
const servicesController = require('../controller/servicesController');
const paymentController = require('../controller/paymentcontroller');

const router = express();

router.get('/registration',loginController.registration);

router.post('/registerUser',loginController.registerUser);

router.get('/login',loginController.login);

router.post('/loginUser',loginController.loginUser);

router.get('/getData',servicesController.getData);

router.post('/addServices',servicesController.addServices);

router.post('/servicesAdded',servicesController.servicesAdded);

router.post('/addCustomer',servicesController.addCustomer);

router.post('/customerAdded',servicesController.customerAdded);

router.post('/addUser',servicesController.addUser);

router.post('/userAdded',servicesController.userAdded);

router.post('/deleteServices',servicesController.deleteServices);

router.post('/deleteCustomers',servicesController.deleteCustomers);

router.post('/deleteUsers',servicesController.deleteUsers);

router.post('/updateServices',servicesController.updateServices);

router.post('/serviceUpdated',servicesController.serviceUpdated);

router.post('/updateCustomer',servicesController.updateCustomer);

router.post('/customerUpdated',servicesController.customerUpdated);

router.post('/stripePayment',paymentController.stripePayment);

router.post('/paymentCompleted',paymentController.paymentCompleted);

router.post('/logout',loginController.logout);

module.exports = router;