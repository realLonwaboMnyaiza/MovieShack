const mongoose = require('mongoose');
const Joi = require('joi');

const modelName = 'Genre';
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    }
});
const Model = mongoose.model(modelName, schema);

function validateUsingJoi(input) {
    const schema = Joi.object({
        name: Joi.string().min(minGenresLength).maxLength(50).required(),
    });

    const isValid = schema.validate(input);
    return isValid;
}

module.exports.Genre = Model;
module.exports.validate = validateUsingJoi;