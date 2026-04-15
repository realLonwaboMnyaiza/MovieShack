const Joi = require('joi');
const mongoose = require('mongoose');
const { customerSchema } = require('./customer.model');
const { movieDto } = require('./movie.model');

const name = 'Rental';
const schema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true,
    },
    movie: {
        type: movieDto,
        required: true,
    },
    checkoutDate: {
        type: Date,
        default: Date.now,
    },
    returnedDate: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 1,
        required: true,
    }
});
const model = mongoose.model(name, schema);

function validateUsingJoi(input) {
    const schema = Joi.object({
        customer: Joi.string().required(),
        movie: Joi.string().required(),
    })
} 

module.exports.Rental = model;
module.exports.validate = validateUsingJoi;