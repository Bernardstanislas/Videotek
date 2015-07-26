// Dependencies

import {sqlite3} from 'sqlite3';

// Modules

import {sqlite as config} from './config';
import {schema} from './schema';

if (config.verbose) {
    sqlite3.verbose();
}

let db = new sqlite3.Database(config.path);

let initSchema = (database) => {
    ['movies', 'torrents', 'genres', 'movieGenre'].map((table) => database.run(schema[table]));
};

export function init() {
    db.serialize(() => initSchema(db));
}
