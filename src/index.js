require("dotenv").config();
const express = require("express");
const winston = require("winston");
const Joi = require("joi");
const Fawn = require("fawn");

const app = express();
const db = process.env.DATABASE;
const port = process.env.PORT || 3000;
const formatRequestBody = express.json();

// logging.
require("../startup/logging");

// config.
require("../startup/configuration");

// database ini...
require("../startup/database-initialization")(db);

// routes
require("../startup/endpoints")(app, formatRequestBody);

Fawn.init(db);
Joi.objectId = require("joi-objectid");

process.on("uncaughtException", (error) => {
  winston.error(error.message, error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

app.listen(port);
winston.info(`App listening on port ${port}`);
