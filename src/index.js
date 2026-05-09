const pathModule = require('path');
const environment = process.env.NODE_ENV;
const path = pathModule.join(process.cwd(), '.env.', environment);
require('dotenv').config({ path });
const express = require('express');

const app = express();
const db = process.env.DATABASE;
const port = process.env.PORT;
const privateKey = process.env.KEY;

const formatRequestBody = express.json();

// logging.
const { logger } = require('../startup/logging');

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
