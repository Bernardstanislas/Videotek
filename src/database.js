"use strict";

const fetch = require('isomorphic-fetch');
const levelup = require('levelup');
const Promise = require('bluebird');

const MOVIES_PER_PAGE = 50;
const YTS_API = 'https://yts.ag/api/v2/';

const db = levelup('./db');

db.get = Promise.promisify(db.get);

const refresh = () => {
    fetch(`${YTS_API}list_movies.json?limit=1`)
    .then(raw => raw.json())
    .then(response => Promise.resolve(response.data.movie_count))
    .then(size => Math.ceil(size / MOVIES_PER_PAGE))
    .then(pages => {
        const pagesToFetch = [];
        for (let pageIndex = 1; pageIndex <= pages; pageIndex++)
            pagesToFetch.push(pageIndex);
        return pagesToFetch;
    })
    .then(pagesToFetch => Promise.mapSeries(pagesToFetch, page => {
        console.log(`Fetching page ${page}/${pagesToFetch.length}`);
        return fetch(`${YTS_API}list_movies.json?page=${page}&limit=${MOVIES_PER_PAGE}`)
        .then(raw => raw.json())
        .then(response => response.data.movies)
    }))
    .then(moviesArray => moviesArray.reduce((acc, movies) => acc.concat(movies), []))
    .then(movies => movies.map(movie => ({
        type: 'put',
        key: movie.id,
        value: JSON.stringify(movie)
    })))
    .then(batch => db.batch(batch, error => {
    }))
}

const getMovie = id => db.get(id)
.then(JSON.parse)

const getAllMovies = () => new Promise((resolve, reject) => {
    const buffer = [];
    db.createValueStream()
    .on('data', value => buffer.push(JSON.parse(value)))
    .on('end', () => resolve(buffer))
})

module.exports = {
    refresh,
    getMovie,
    getAllMovies
}
