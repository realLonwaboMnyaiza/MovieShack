const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre.model');

const minGenresLength = 5;

router.get('/api/genres', async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

router.get('/api/genres/:id', async (req, res) => {
    const genreId = req.params.id;
    const genre = await Genre.findById(genreId);
    if (!genre) res.status(404).send('The genre id does not exist');
    if (!validate(req.body)) {
        res.status(400).send(`Name property must be at least ${minGenresLength} characters long.`);
    }

    res.send(genre);
});

router.put('/api/genres/:id', async (req, res) => {
    const genreId = req.params.id;
    const genreName = req.body.name;
    const genre = await Genre.findById(genreId);
    if (!genre) res.status(404).send('The genre id does not exist');

    if (!validate(genreName)) {
        res.status(400).send(`Name property must be at least ${minGenresLength} characters long.`);
    }

    genre.name = genreName;
    const result = await genre.save();

    res.status(201).send("Genre updated:\n", result);
});

router.post('/api/genres', async (req, res) => {
    const genreName = req.body.name;
    if (!validate(genreName)) {
        res.status(400).send(`Name property must be at least ${minGenresLength} characters long.`);
    }

    const genre = new Genre({ name: genreName });
    const result = await genre.save();
    console.log(result);

    res.status(201).send("Genre created:\n", result);
});

router.delete('/api/genres/:id', async (req, res) => {
    const genreId = req.params.id;
    const genre = await Genre.findById(genreId);
    if (!genre) res.status(404).send('The genre id does not exist');

    const result = await Genre.deleteOne(genre); 

    res.status(200).send("Genre delete:\n", result);
});



module.exports = router;