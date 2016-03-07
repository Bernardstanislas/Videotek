import {UPDATE_FIRST_MOVIES} from '../actions';

export default store => next => action => {
    if (action.type === UPDATE_FIRST_MOVIES) {
        const {plex, torrents} = store.getState();
        const movies = action.movies.map(movie => {
            const owned = plex.indexOf(movie.title_english) !== -1;
            const torrentHashes = movie.torrents.map(torrent => torrent.hash);
            const downloading = torrents.reduce((acc, torrent) => {
                const hash = torrent.hashString.toUpperCase();
                if (torrentHashes.indexOf(hash) !== -1) acc = true;
                return acc;
            }, false);
            return {
                ...movie,
                owned,
                downloading
            }
        });
        return next({...action, movies});
    } else {
        return next(action);
    }
}
