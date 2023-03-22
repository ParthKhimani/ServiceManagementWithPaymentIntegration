const Customer = require('../model/customer');
const stripe = require('stripe')('sk_test_51MlQ9rSBkF0GV1OMU9MK5lSLgkUtGJzy7S8vEz5023nn2ryQ95NKQd5NR3SHNLeJf4BVyYPtZcNnQI1tifC0BwJ100oxVCurec');

exports.stripePayment = async (req, res, next) => {
    var customerName = req.body.customers;
    Customer.findOne({ customerName: customerName })
        .then(result => {
            res.render('payment', {
                key: 'pk_test_51MlQ9rSBkF0GV1OMdvNLM0fm846jtPwBTVCuGA4m3r693YUcdCbnWzDfLcaYShzpHfN2GcChuB9UI0RFvkQjz8sc00GhJ2Ykj7',
                customerName: customerName,
                amountCharged: result.amountCharged
            })
        })
}

exports.paymentCompleted = async (req, res, next) => {

    // var customerName = req.body.customer;
    var amountCharged = req.body.amount;

    stripe.paymentIntents.create({
        amount: amountCharged * 100,
        currency: 'inr',
        payment_method_types: ['card'],
        customer: 'cus_NWUGf2Sk6Ylqjy',
    }, { stripeAccount: 'acct_1MlQ9rSBkF0GV1OM' })
        .then(paymentIntent => {
            stripe.paymentIntents.confirm(paymentIntent.id, { payment_method: 'pm_card_visa' }).then(result => {

                console.log(result)
            }).catch(err => console.log(err))
        }).then(result => {

            console.log(result)
        }).catch(err => console.log(err))

    res.redirect('getData');
}