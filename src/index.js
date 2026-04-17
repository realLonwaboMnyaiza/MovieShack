require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const formatRequestBody = express.json();
const authenticationMiddleware = require("../middleware/authentication.middleware");
const authorizationMiddleware = require("../middleware/authorization.middleware");
const genresRouter = require("../router/genres.routes");
const customersRouter = require("../router/customers.routes");
const movieRouter = require("../router/movies.routes");
const rentalRouter = require("../router/rentals.routes");
const accountRouter = require("../router/account.routes");
const errorMiddleware = require("../middleware/error.middleware");
const winston = require("winston");
require("winston-mongodb");
const app = express();
const port = process.env.PORT || 3000;
const Fawn = require("fawn");

const db = process.env.DATABASE;

winston.add(winston.transports.MongoDB, { db });
winston.handleExceptions(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({ filename: "exception.log" }),
);

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
app.use(genresRouter);
app.use(customersRouter);
app.use(movieRouter);
app.use(rentalRouter);
app.use(accountRouter);

// error middleware...
// app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Initialize headless application.");
});

(async function initializeDatabaseConnection() {
  await mongoose.connect(db);
  winston.info("Connected to database...");
})();

app.listen(port);
winston.info(`App listening on port ${port}`);
