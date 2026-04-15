require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const genresRouter = require("../router/genres");
const customersRouter = require("../router/customers");
const movieRouter = require("../router/movies");
const rentalRouter = require("../router/rentals");
const accountRouter = require("../router/account");
const app = express();
const port = process.env.PORT || 3000;
const Fawn = require("fawn");

// todo: move to .env file.
const connectionString = "mongodb://localhost/movieShack";

Fawn.init(connectionString);
Joi.objectId = require("joi-objectid");

if (!process.env.TOKEN) {
  console.error("Crucial environment variables are not defined.");
  process.exit(1);
}

app.use(express.json());
app.use(genresRouter);
app.use(customersRouter);
app.use(movieRouter);
app.use(rentalRouter);
app.use(accountRouter);

app.get("/", (req, res) => {
  res.send("Initiallise headless application.");
});

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to database..."))
  .catch(() => console.log("Error while trying to connect to database!"));

app.listen(port);
console.log(`App listening on port ${port}`);
