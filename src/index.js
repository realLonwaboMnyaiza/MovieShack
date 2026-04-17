require("dotenv").config();
const express = require("express");
const Joi = require("joi");
const formatRequestBody = express.json();
const authenticationMiddleware = require("../middleware/authentication.middleware");
const authorizationMiddleware = require("../middleware/authorization.middleware");
const errorMiddleware = require("../middleware/error.middleware");
const winston = require("winston");
const Fawn = require("fawn");

const app = express();
const db = process.env.DATABASE;
const port = process.env.PORT || 3000;

process.on("uncaughtException", (error) => {
  winston.error(error.message, error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

Fawn.init(db);
Joi.objectId = require("joi-objectid");

if (!process.env.KEY) {
  throw new Error("Crucial environment variables are not defined.");
}

// transform middleware
app.use(formatRequestBody);
// app.use(authenticationMiddleware);
// app.use(authorizationMiddleware);

// routes
require("../startup/endpoints")(app);
// error middleware...
// app.use(errorMiddleware);

// database ini...
require("../startup/database-initialization")();

// logging.
require("../startup/logging");

app.listen(port);
winston.info(`App listening on port ${port}`);
