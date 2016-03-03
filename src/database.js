import fetch from 'isomorphic-fetch';
import PouchDB from 'pouchdb';
import Promise from 'bluebird';
import 'babel-polyfill';

PouchDB.debug.enable('*');
const MOVIES_PER_PAGE = 50;
const YTS_API = 'https://yts.ag/api/v2/';

const db = new PouchDB('videotek');

const refresh = async () => {
    const raw = await fetch(`${YTS_API}list_movies.json?limit=1`);
    const {data: {movie_count: movieCount}} = await raw.json();
    const pagesCount = Math.ceil(movieCount / MOVIES_PER_PAGE);
    const pagesArray = Array.from(Array(pagesCount).keys()); // © @pierr
    const moviesArray = await Promise.mapSeries(pagesArray, async (page) => {
        console.log(`Fetching page ${page}/${pagesArray.length}`);
        const raw = await fetch(`${YTS_API}list_movies.json?page=${page}&limit=${MOVIES_PER_PAGE}`);
        const {data: {movies}} = await raw.json();
        return movies;
    });
    const movies = moviesArray.reduce((acc, movies) => acc.concat(movies), []);
    const moviesBatch = movies.map(({id, ...movie}) => ({
        _id: id.toString(),
        ...movie
    }));
    await db.bulkDocs(moviesBatch);
    console.log('Database refreshed !');
}

const getMovie = id => db.get(id)

const getAllMovies = () => db.allDocs({
  include_docs: true
})

module.exports = {
    refresh,
    getMovie,
    getAllMovies
}
