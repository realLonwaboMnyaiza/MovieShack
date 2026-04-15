const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre.model");

const name = "Movie";
const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 255,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 1,
    required: true,
  },
});

const dto = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    min: 5,
    max: 255,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 1,
    required: true,
  },
});

const model = mongoose.model(name, schema);

function validateWithJoi(input) {
  const schema = new Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(1).required(),
  });

  return schema.validate(input);
}

module.exports.Movie = model;
module.exports.movieSchema = schema;
module.exports.movieDto = dto;
module.exports.validate = validateWithJoi;
