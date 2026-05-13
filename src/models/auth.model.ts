import Joi from 'joi';

function validateUsingJoi(input) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(input);
}

export { validateUsingJoi as validate };
