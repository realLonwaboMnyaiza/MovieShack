import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

export default function (error: Error, req: Request, res: Response, next: NextFunction) {
  winston.error(error.message, error);
  return next(new Error('Fatal Error Occured.'));
}
