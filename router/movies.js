const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie.model');
const { Genre } = require('../models/genre.model');

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

router.post('/api/movies/', async (req, res) => {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const numberInStock = req.body.numberInStock;
    const dailyRentalRate = req.body.dailyRentalRate;

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send('Reqest no valid');
    }

    if (!genreId) res.status(400).send('Genre id invalid');
    const genre = await Genre.findById(genreId);

    const movie = await new Movie({
        title,
        genre,
        numberInStock,
        dailyRentalRate
    });

    await movie.save();
    res.status(401).send('Movie has been saved.');
});

router.put('/api/movies/:id', async (req, res) => {
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
    const genre = await Genre.findById(genreId);
    const numberOfStock = req.body.numberInStock;
    const dailyRentalRate = req.body.dailyRentalRate;

    movie.title = title;
    movie.genre = genre;
    movie.numberInStock = numberOfStock;
    movie.dailyRentalRate = dailyRentalRate;
    await movie.save();

    res.status(401).send('Movie updated.');
});

router.delete('/api/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    if (!movie) res.status(404).send('Movie does not exist.');

    await Movie.deleteOne(movie);

    res.status(401).send('Movie deleted.');
});

module.exports = router;