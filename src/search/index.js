"use strict";

// Libraries imports

const Promise = require('bluebird');
const searchIndex = Promise.promisify(require('search-index')); // Promisify search-index
const stopwords = require('term-vector').getStopwords('fr').sort(); // Get the french stopwords
const da = require('distribute-array'); // Used to make indexation batches
const _ = require('lodash');

// Local imports

const getAllMovies = require('../database').getAllMovies;

// Local references

let movieSearchIndex;

// Configuration

const movieIndexOptions = {
    indexPath: 'storage/search-movies',
    fieldsToStore: [
        'id',
        'title',
        'title_english',
        'synopsis',
        'language',
        'runtime',
        'genres',
        'year',
        'rating',
        'date_uploaded'
    ],
    deletable: false,
    stopwords
};

const movieBatchOptions = {
    fieldOptions: [
        {
            fieldName: 'id',
            searchable: false
        },
        {
            fieldName: 'title',
            filter: true
        },
        {
            fieldName: 'genres',
            filter: true
        },
        {
            fieldName: 'year',
            filter: true
        },
        {
            fieldName: 'rating',
            filter: true
        },
        {
            fieldName: 'language',
            filter: true
        }
    ]
};

const BATCH_SIZE = 50;

// Pure functions

const initSearchIndex = options => searchIndex(options);

const promisifySearchIndex = si => ['add', 'close', 'get', 'del', 'flush', 'match', 'replicate', 'search', 'snapShot', 'tellMeAboutMySearchIndex'].reduce((acc, method) => {
    acc[method] = Promise.promisify(si[method]);
    return acc;
}, {});

const checkIsIndexEmpty = si => si.tellMeAboutMySearchIndex()
.then(infos => infos.totalDocs === 0);

const getMovies = () => getAllMovies()
.then(movies => movies.map(movie => ({
    id: movie.id,
    title: [movie.title],
    title_english: movie.title_english,
    synopsis: movie.synopsis,
    genres: movie.genres,
    runtime: movie.runtime,
    language: [movie.language],
    year: [movie.year],
    rating: [movie.rating],
    date_uploaded: movie.date_uploaded
})));

const batchify = (array, batchSize) => da(array, Math.ceil(array.length / batchSize));

const sequencify = (batches, func) => Promise.each(batches, func);

const indexBatch = (si, batch, batchOptions, batchIndex, totalBatches) => {
    console.log(`Indexing batch ${batchIndex + 1}/${totalBatches}`);
    return si.add(batch, batchOptions);
}

const fillMovieIndex = (si, batchOptions, batchSize) => getMovies()
.then(movies => batchify(movies, batchSize))
.then(batches => sequencify(batches, (batch, batchIndex) => indexBatch(si, batch, batchOptions, batchIndex, batches.length)))

const treatSearchResults = results => {
    const facets = !_.isEmpty(results.facets) ? results.facets.reduce((acc, facet) => {
        acc[facet.key] = facet.value.reduce((facetAcc, facetValue) => {
            facetAcc[facetValue.key] = facetValue.value;
            return facetAcc;
        }, {})
        return acc;
    }, {}) : {};
    const totalCount = results.totalHits;
    const list = results.hits.map(hit => hit.document);
    return {
        facets,
        totalCount,
        list
    };
}

// Stateful functions

const init = initSearchIndex(movieIndexOptions)
.then(promisifySearchIndex)
.then(si => {
    movieSearchIndex = si;
    return Promise.resolve();
});

const checkIsMovieIndexEmpty = () => init.then(() => checkIsIndexEmpty(movieSearchIndex));

const populateMovieIndex = () => init
.then(() => fillMovieIndex(movieSearchIndex, movieBatchOptions, BATCH_SIZE))

const searchMovieIndex = text => init.then(() => {
    const query = {
        query: {'*': [text]},
        facets: {
            title: {
                ranges: [
                    ['', '9'],
                    ['A', 'G'],
                    ['H', 'N'],
                    ['O', 'T'],
                    ['U', 'Z']
                ]
            },
            genres: {},
            year: {
                ranges: [
                    ['', '1930'],
                    ['1931', '1940'],
                    ['1941', '1950'],
                    ['1951', '1960'],
                    ['1961', '1970'],
                    ['1971', '1980'],
                    ['1981', '1990'],
                    ['1991', '2000'],
                    ['2001', '2010'],
                    ['2011', Number.MAX_SAFE_INTEGER.toString()]
                ]
            },
            language: {}
        }
    }
    return movieSearchIndex.search(query)
    .then(treatSearchResults);
});

// Exports

module.exports = {
    populate: populateMovieIndex,
    isEmpty: checkIsMovieIndexEmpty,
    search: searchMovieIndex,
    init
};
