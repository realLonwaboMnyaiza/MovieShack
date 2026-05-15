import pathModule from 'path';
import dotenv from 'dotenv';
import express from 'express';
const environment:string = process.env.NODE_ENV || 'dev';
const path:string = pathModule.join(process.cwd(), `.env.${environment}`);
dotenv.config({ path });

const app = express();
const db = process.env.DATABASE;
const port = process.env.PORT;
const privateKey = process.env.KEY;

const formatRequestBody = express.json();

// logging.
import Logger from './startup/logging';
const logger = new Logger(db, 'logs', 'error');

// config.
import initilize from './startup/configuration';
initilize(privateKey);

// database ini...
import initializeDatabase from './startup/database-initialization';
initializeDatabase(db);
logger.log().info(`Connected to ${environment} database...`);

// routes
import routeConfig from './startup/endpoints';
routeConfig(app, formatRequestBody);

process.on('uncaughtException', (): never => {
  logger.log().exceptions.handle();
  process.exit(1);
});

process.on('unhandledRejection', (error: Error): Error => {
  throw error;
});

const server = app.listen(port);
logger.log().info(`App listening on port ${port}`);

module.exports = server;
