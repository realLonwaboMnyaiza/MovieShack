require("dotenv").config();
const express = require("express");

const app = express();
// todo: switch value when testing.
const db = process.env.DATABASE;
const port = process.env.PORT || 3000;
const formatRequestBody = express.json();

// logging.
const { Logger, logToDatabase } = require("../startup/logging");
logToDatabase(db);

// config.
require("../startup/configuration");

// database ini...
require("../startup/database-initialization")(db);

// routes
require("../startup/endpoints")(app, formatRequestBody);

process.on("uncaughtException", (error) => {
  Logger.exceptions.handle();
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

const server = app.listen(port);
Logger.info(`App listening on port ${port}`);

module.exports = server;
