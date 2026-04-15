const genresRouter = require('../router/genres');
const customersRouter = require('../router/customers');
const movieRouter = require('../router/movies');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(genresRouter);
app.use(customersRouter);
app.use(movieRouter);

app.get('/', (req, res) => {
    res.send('Initiallise headless application.');
});

mongoose.connect('mongodb://localhost/movieShack')
    .then(() => console.log('Connected to database...'))
    .catch(() => console.log('Error while trying to connect to database!'));

app.listen(port);
console.log(`App listening on port ${port}`);