const express = require('express');

const database = require('./database');
const searchIndex = require('./search');

const app = express();


app.post('/database/refresh', (req, res) => {
    database.refresh();
    res.send('Refreshing the database');
})

app.get('/movies/:id', (req, res) => {
    database.getMovie(req.params.id)
    .then(movie => res.json(movie))
    .catch(error => res.status(404).send('Movie not found'));
})

app.get('/movies', (req, res) => {
    database.getAllMovies()
    .then(movies => res.json(movies))
    .catch(error => res.status(500).json(error));
})

app.get('/search/populate', (req, res) => {
    searchIndex.populate();
    res.send('Populating the search index..')
})

app.get('/search/:query', (req, res) => {
    searchIndex.search(req.params.query)
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error));
})

searchIndex.init
.then(() => {
    app.listen(3000, () => {
        console.log('API listening on port 3000');
    });
})
