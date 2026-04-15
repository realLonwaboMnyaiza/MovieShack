const Joi = require('joi');
const mongoose = require('mongoose');

const modelName = 'Customer';
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    surname: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
});

const model = mongoose.model(modelName, schema);

function validateWithJoi(input) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        surname: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(input);
}

module.exports.Customer = model;
module.exports.validate = validateWithJoi;