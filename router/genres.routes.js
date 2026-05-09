const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/authentication.middleware');
const authorizationMiddleware = require('../middleware/authorization.middleware');
const errorWrapper = require('../utils/http-error-wrapper');
const validateGuidMiddleware = require('../middleware/guid-validation.middleware');
const { Genre, validate } = require('../models/genre.model');

const minGenresLength = 5;

// todo: get lib to handle errors, used to be express-async-errors...
router.get(
  '/api/genres/',
  errorWrapper(async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
  }),
);

router.get(
  '/api/genres/:id',
  validateGuidMiddleware,
  errorWrapper(async (req, res) => {
    const genreId = req.guid;
    const genre = await Genre.findById(genreId);

    if (!genre) res.status(404).send('The genre id does not exist');
    if (!validate(req.body)) {
      res
        .status(400)
        .send(
          `Name property must be at least ${minGenresLength} characters long.`,
        );
    }

    res.status(200).send(genre);
  }),
);

router.post(
  '/api/genres/',
  [authenticationMiddleware, authorizationMiddleware],
  errorWrapper(async (req, res) => {
    const genreName = req.body.name;
    const { error } = validate(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({ name: genreName });
    await genre.save();

    res.status(201).send(`Genre created: ${genre.name}`);
  }),
);

router.put(
  '/api/genres/:id',
  [authenticationMiddleware, authorizationMiddleware, validateGuidMiddleware],
  errorWrapper(async (req, res) => {
    const genreId = req.guid;
    const genreName = req.body.name;
    const genre = await Genre.findById(genreId);
    if (!genre) res.status(404).send('The genre id does not exist');

    const { error } = validate(req.body);
    if (error) {
      res
        .status(400)
        .send(
          `Name property must be at least ${minGenresLength} characters long.`,
        );
    }

    genre.name = genreName;
    await genre.save();

    res.status(201).send(`Genre updated to: ${genreName}`);
  }),
);

router.delete(
  '/api/genres/:id',
  [authenticationMiddleware, authorizationMiddleware, validateGuidMiddleware],
  errorWrapper(async (req, res) => {
    const genreId = req.guid;
    const genre = await Genre.findById(genreId);
    if (!genre) res.status(404).send('The genre id does not exist');

    await Genre.deleteOne(genre);

    res.status(201).send(`Genre deleted: ${genre.name}`);
  }),
);

module.exports = router;
