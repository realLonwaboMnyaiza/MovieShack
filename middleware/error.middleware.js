const winston = require('winston');

module.exports = function (error, req, res, next) {
  winston.error(error.message, error);
  next(new Error('Fatal Error Occured.'));
};
