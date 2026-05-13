import pathModule from 'path';
import config from 'dotenv';
import express from 'express';
const environment:string = process.env.NODE_ENV || 'dev';
const path:string = pathModule.join(process.cwd(), '.env.', environment);

config.config({ path });

const app = express();
const db = process.env.DATABASE;
const port = process.env.PORT;
const privateKey = process.env.KEY;

const formatRequestBody = express.json();

// logging.
// const { logger } = require('../startup/logging');
import logger from './startup/logging';

// config.
require('../startup/configuration')(privateKey);

// database ini...
require('../startup/database-initialization')(db);
logger.info('Connected to database...');

// routes
require('../startup/endpoints')(app, formatRequestBody);

process.on('uncaughtException', (error) => {
  logger.exceptions.handle();
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  throw error;
});

const server = app.listen(port);
logger.info(`App listening on port ${port}`);

module.exports = server;
