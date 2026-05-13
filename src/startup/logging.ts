import * as winston from 'winston';
import { MongoDB, MongoDBConnectionOptions } from 'winston-mongodb';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.prettyPrint() }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './exceptions.log' }),
    new MongoDB({
      db: 'mongodb://localhost/movieShackTest',
      collection: 'logs',
      level: 'error',
    } as MongoDBConnectionOptions),
  ],
});

export default logger;
