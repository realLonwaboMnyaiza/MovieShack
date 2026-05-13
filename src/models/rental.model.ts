import Joi from "joi";
import joiObjectId from 'joi-objectid';
import mongoose from "mongoose";
import { customerSchema } from "./customer.model";
import { movieDto } from "./movie.model";

interface JoiWithObjectId extends Joi.Root {
  objectId(): Joi.StringSchema;
}
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

const JoiObjectId: JoiWithObjectId = joiObjectId(Joi);

function validateUsingJoi(input) {
  const schema = Joi.object({
    customerId: JoiObjectId.objectId().required(),
    movieId: JoiObjectId.objectId().required(),
  });

  return schema.validate(input);
}

export { model as Rental };
export { validateUsingJoi as validate };
