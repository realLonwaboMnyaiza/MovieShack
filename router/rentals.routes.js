require("dotenv").config();
const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const { Rental, validate } = require("../models/rental.model");
const { Customer } = require("../models/customer.model");
const { Movie } = require("../models/movie.model");

const database = process.env.DATABASE;
Fawn.init(database);

router.get("/api/rentals/", async (req, res) => {
  const rentals = await Rental.find().sort({ checkoutDate: -1 });
  res.status(200).send(rentals);
});

router.post(
  "/api/rentals/checkout",
  authenticationMiddleware,
  async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customerId = req.body.customerId;
    const movieId = req.body.movieId;
    const customer = await Customer.findById(customerId);
    const movie = await Movie.findById(movieId);
    const movieDto = {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    };

    if (!customer || !movie)
      res.status(400).send("Valid customer and movie is required.");

    if (movie.numberInStock < 1) res.status(400).send("Movie is out of stock.");

    const rental = await new Rental({
      customer,
      movieDto,
    });

    try {
      // todo: using lib to accomplish two-phase commit (ACID transations)
      // check for this packages vuln and alternatives...
      await new Fawn.Task()
        .save("rentals", rental)
        .update(
          "movies",
          { _id: movie._id },
          {
            $inc: { numberInStock: -1 },
          },
        )
        .run();
    } catch (error) {
      console.log(error);
      res.status(500).send("Transaction failed.");
    }

    // todo: loadash pick...
    const checkoutMovie = {
      title: movie.title,
      genre: movie.genre,
      rate: movie.dailyRentalRate,
    };
    res.status(201).send("Movie has been checked out.", checkoutMovie);
  },
);

// todo: return rental endpoint...

module.exports = router;
