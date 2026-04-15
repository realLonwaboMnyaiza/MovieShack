const router = require('../router/genres');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello world');
});

mongoose.connect('mongodb://localhost/movieShack')
    .then(() => console.log('Connected to database...'))
    .catch(() => console.log('Error while trying to connect to database!'));

app.listen(port);
console.log(`App listening on port ${port}`);