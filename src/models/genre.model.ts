import mongoose from "mongoose";
import Joi, { ValidationError } from "joi";

interface GenrePayload {
  name: string;
};

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

function validateUsingJoi(input: string) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(input);
}

export { Model as Genre };
export { schema as genreSchema };
export { validateUsingJoi as validate};
export type { ValidationError, GenrePayload };
