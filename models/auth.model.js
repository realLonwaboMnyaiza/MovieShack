require("dotenv");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

function validateUsingJoi(input) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(input);
}

function generateJwt() {
  const privateKey = process.env.TOKEN;
  const payload = { _id: user._id };
  const token = jwt.sign(payload, privateKey, { expiresIn: "24h" });

  return token;
}

module.exports.validate = validateUsingJoi;
module.exports.generateToken = generateJwt;
