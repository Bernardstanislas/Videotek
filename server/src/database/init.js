// Dependencies

let sqlite3 = require('sqlite3');

// Modules

let config = require('../config.js').sqlite;
let schema = require('./schema.js');

if (config.verbose) {
    sqlite3.verbose();
}

let db = new sqlite3.Database(config.path);

let initSchema = (database) => {
    ['movies', 'torrents', 'genres', 'movieGenre'].map((table) => database.run(schema[table]));
};

module.exports = () => {
    db.serialize(() => initSchema(db));
};
