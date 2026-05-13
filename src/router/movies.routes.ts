import express from 'express';
import { Movie, validate } from '../models/movie.model';
import { Genre } from '../models/genre.model';
import authenticate from '../middleware/authentication.middleware';
import authorize from '../middleware/authorization.middleware';

const router = express.Router();

router.get('/api/movies/', async (req, res) => {
  const movies = await Movie.find();
  if (!movies) res.status(404).send('No movies exist in the database.');

  res.status(200).send(movies);
});

router.get('/api/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId);

  if (!movie) res.status(404).send('Movie does not exist.');

  res.status(200).send(movie);
});

router.post('/api/movies/', [authenticate, authorize], async (req, res) => {
  const title = req.body.title;
  const genreId = req.body.genreId;
  const numberInStock = req.body.numberInStock;
  const dailyRentalRate = req.body.dailyRentalRate;

  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  if (!genreId) res.status(400).send('Genre id invalid');
  const genre = await Genre.findById(genreId);

  const movie = await new Movie({
    title,
    genre,
    numberInStock,
    dailyRentalRate,
  });

  await movie.save();
  res.status(201).send(`Movie has been saved. ${movie}`);
});

router.put('/api/movies/:id', [authenticate, authorize], async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId);

  if (!movie) res.status(404).send('An error occured.');
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send('Request no valid.');
  }

  const genreId = req.body.genreId;
  if (!genreId) res.status(400).send('Genre id invalid');

  const title = req.body.title;
  const numberOfStock = req.body.numberInStock;
  const dailyRentalRate = req.body.dailyRentalRate;

  const genre = await Genre.findById(genreId);

  movie.title = title;
  movie.genre = genre;
  movie.numberInStock = numberOfStock;
  movie.dailyRentalRate = dailyRentalRate;
  await movie.save();

  res.status(201).send(`Movie has been updated: ${movie}.`);
});

router.delete(
  '/api/movies/:id',
  [authenticate, authorize],
  async (req, res) => {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    if (!movie) res.status(404).send('Movie does not exist.');

    await Movie.deleteOne(movie);

    res
      .status(201)
      .send(`The following movie has been deleted: ${movie.title}`);
  },
);

export default router;
