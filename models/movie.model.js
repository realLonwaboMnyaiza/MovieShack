const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre.model');

const name = 'Movie';
const schema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 1,
    },
});

const model = mongoose.model(name, schema);

function validateWithJoi(input) {
    const schema = new Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genre: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(1).required(),
    });

    return schema.validate(input);
}

module.exports.Movie = model;
module.exports.validate = validateWithJoi;

