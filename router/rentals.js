const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../models/rental.model");
const { Customer } = require("../models/customer.model");
const { Movie } = require("../models/movie.model");

router.get("/api/rental/", async (req, res) => {
  const rentals = await Rental.find().sort({ checkoutDate: -1 });
  res.status(200).send(rentals);
});

router.post("/api/rental/checkout", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send("An error occured.");

  const customerId = req.body.customerId;
  const movieId = req.body.movieId;
  const customer = await Customer.findById(customerId);
  const movie = await Movie.findById(movieId);

  if (!customer || !movie)
    res.status(400).send("Valid customer and movie is required.");

  if (movie.numberInStock < 1) res.status(400).send("Movie is out of stock.");

  const rental = await new Rental({
    customer,
    movie,
  });

  movie.numberInStock--;
  await movie.save();
  await rental.save();

  res.status(401).send("Movie has been checked out.");
});

module.exports = router;
