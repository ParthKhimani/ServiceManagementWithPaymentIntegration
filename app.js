const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const Store = require('connect-mongodb-session')(session);
const stripe = require('stripe')('sk_test_51MlQ9rSBkF0GV1OMU9MK5lSLgkUtGJzy7S8vEz5023nn2ryQ95NKQd5NR3SHNLeJf4BVyYPtZcNnQI1tifC0BwJ100oxVCurec');

const router = require('./routes/router');

const app = express();
const MONGO_URI = 'mongodb+srv://parth:<password>@cluster0.eixcpta.mongodb.net/Practical4?retryWrites=true&w=majority'
const store = new Store({
    uri: MONGO_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('view', 'view');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: store
}));

app.post("/charge", (req, res) => {
    try {
        stripe.customers
            .create({
                name: req.body.name,
                email: req.body.email,
                source: req.body.stripeToken
            })
            .then(customer =>
                stripe.charges.create({
                    amount: req.body.amount * 100,
                    currency: "usd",
                    customer: customer.id
                })
            )
            .then(() => res.render('paymentCompleted'))
            .catch(err => console.log(err));
    }
    catch (err) {
        res.send(err);
    }
});
app.use(router);

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
    .then(result => {
        app.listen(4444);
    })
    .catch(err => console.log(err));