import mongoose from 'mongoose';

export default function validateGuid(req, res, next) {
  const resourceId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(resourceId))
    return res.status(404).send('Invalid genres ID provided.');

  req.guid = resourceId;
  next();
}
