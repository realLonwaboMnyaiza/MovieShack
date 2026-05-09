const mongoose = require('mongoose');

module.exports = function (req, res, next) {
  const resourceId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(resourceId))
    return res.status(404).send('Invalid genres ID provided.');

  req.guid = resourceId;
  next();
};
