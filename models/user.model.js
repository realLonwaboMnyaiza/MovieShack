require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const name = "User";
const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

schema.methods.generateAuthenticationToken = function () {
  const privateKey = process.env.KEY;
  const payload = { _id: this._id, isAdmin: this.isAdmin };
  return jwt.sign(payload, privateKey, { expiresIn: "24h" });
};

const model = mongoose.model(name, schema);

function validateUsingJoi(input) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(5).max(50).required(),
    surname: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.boolean().default(false),
  });

  return schema.validate(input);
}

module.exports.User = model;
module.exports.validate = validateUsingJoi;
