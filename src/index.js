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
const app = express();
const port = process.env.PORT || 3000;
const Fawn = require("fawn");

const connectionString = process.env.DATABASE;

Fawn.init(connectionString);
Joi.objectId = require("joi-objectid");

if (!process.env.KEY) {
  console.error("Crucial environment variables are not defined.");
  process.exit(1);
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
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to database...");
  } catch (error) {
    console.log("Error while trying to connect to database!");
  }
})();

app.listen(port);
console.log(`App listening on port ${port}`);
