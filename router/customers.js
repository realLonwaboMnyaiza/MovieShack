const express = require('express');
const router = express.Router(); 
const { Customer, validate } = require('../models/customer.model');

router.get('/api/customers', async (req, res) => {
    const customer = await Customer.find().sort({ surname: 1 });
    res.send(customer);
});

router.get('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    res.send(customer);
});

router.put('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    const name = req.body.name;
    const surname = req.body.surname;

    customer.name = name;
    customer.surname = surname;

    await customer.save;

    res.send(customer);
});

router.post('/api/customers/', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;

    const customer = new Customer({
        name,
        surname
    });

    await customer.save();

    res.send(customer);
})

router.delete('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    await Customer.deleteOne(customer);

    res.send(customerId);
})

module.exports = router;
