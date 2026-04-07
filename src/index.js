const router = require('../router/genres');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port);