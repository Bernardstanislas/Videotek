import {UPDATE_FIRST_MOVIES} from '../actions';

export default store => next => action => {
    if (action.type === UPDATE_FIRST_MOVIES) {
        const {plex} = store.getState();
        const movies = action.movies.map(movie => ({
            ...movie,
            owned: plex.indexOf(movie.title_english) !== -1
        }));
        return next({...action, movies});
    } else {
        return next(action);
    }
}
