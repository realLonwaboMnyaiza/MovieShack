const Joi = require("joi");
const mongoose = require("mongoose");

const name = "User";
const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    min: 5,
    max: 50,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    min: 5,
    max: 50,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    min: 5,
    max: 50,
    required: true,
  },
  email: {
    type: String,
    min: 5,
    max: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 5,
    max: 1024,
    required: true,
    unique: true,
  },
});

const model = mongoose.model(name, schema);

function validateUsingJoi(input) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(5).max(50).required(),
    surname: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(input);
}

module.exports.User = model;
module.exports.validate = validateUsingJoi;
