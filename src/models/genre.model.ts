import mongoose from "mongoose";
import Joi from "joi";

const modelName = 'Genre';
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
});
const Model = mongoose.model(modelName, schema);

function validateUsingJoi(input) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(input);
}

export { Model as Genre };
export { schema as genreSchema };
export { validateUsingJoi as validate};
