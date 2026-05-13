import winston from 'winston/lib/winston/config';

export default function (error, req, res, next) {
  winston.error(error.message, error);
  next(new Error('Fatal Error Occured.'));
}
