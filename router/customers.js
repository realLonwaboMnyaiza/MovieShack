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

    if (!customer) res.status(404).send('The customer does not exist.');
    if (!validate(req.body)) {
        res.status(400).send("Data is malformed.");
    }

    res.send(customer);
});

router.put('/api/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    const name = req.body.name;
    const surname = req.body.surname;

    if (!customer) res.status(404).send('The customer does not exist.');
    if (!validate(req.body)) {
        res.status(400).send("Data is malformed.");
    }

    customer.name = name;
    customer.surname = surname;

    await customer.save;

    res.send(customer);
});

router.post('/api/customers/', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;

    if (!validate(req.body)) {
        res.status(400).send("Data is malformed.");
    }

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

    if (!customer) res.status(404).send('The customer does not exist.');
    await Customer.deleteOne(customer);

    res.send(customerId);
})

module.exports = router;
