require("dotenv").config();
const express = require("express");
const Joi = require("joi");
const Fawn = require("fawn");

const app = express();
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

Fawn.init(db);
Joi.objectId = require("joi-objectid");

process.on("uncaughtException", (error) => {
  Logger.exceptions.handle();
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

app.listen(port);
Logger.info(`App listening on port ${port}`);
