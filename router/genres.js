const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: 'comedy'},
    { id: 2, name: 'action'},
    { id: 3, name: 'thriller'}
];
const minGenresLength = 3;

router.get('/api/genres', (req, res) => {
    res.send(genres);
});

router.get('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = genres.find(g => g.id === genreId);
    if (!genre) res.status(404).send('The genre id does not exist');
    if (!validateGenres(req.body)) {
        res.status(400).send(`Name property must be at least ${minGenresLength} characters long.`);
    }

    res.send(genre);
});

router.put('/api/genres/:id', (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = genres.find(g => g.id === genreId);
    if (!genre) res.status(404).send('The genre id does not exist');

    if (!validateGenres(req.body.name)) {
        res.status(400).send(`Name property must be at least ${minGenresLength} characters long.`);
    }

    const updatedGenre = genre.name = req.body.name;

    res.status(201).send("Genre updated:\n", updatedGenre);
});

router.post('/api/genres', (req, res) => {
    const genreName = req.body.name;
    const createGenre = {
        id: ++genres.length,
        name: genreName, 
    };

    if (!validateGenres(genreName)) {
        res.status(400).send(`Name property must be at least ${minGenresLength} characters long.`);
    }

    genres.push(createGenre);

    res.status(201).send("Genre created:\n", createGenre);
});

router.delete('/api/genres/:id', (req, res) => {
    const deleteGenreId = parseInt(req.params.id);
    const genre = genres.find(g => g.id === deleteGenreId);
    if (!genre) res.status(404).send('The genre id does not exist');

    const indexOfItem = genres.indexOf(genre);
    genres.splice(indexOfItem, 1);

    res.status(200).send("Genre delete:\n", genre);
});

function validateGenres(input) {
    const schema = Joi.object({
        name: Joi.string().min(minGenresLength).required(),
    });

    const isValid = schema.validate(input);
    return isValid;
}

module.exports = router;