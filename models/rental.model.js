const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
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
  },
});
const model = mongoose.model(name, schema);

function validateUsingJoi(input) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(input);
}

module.exports.Rental = model;
module.exports.validate = validateUsingJoi;
