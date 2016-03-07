import {refresh as refreshDb} from '../database';
import {refresh as refreshPx} from '../plex';

export const BEGIN_DATABASE_REFRESH = 'BEGIN_DATABASE_REFRESH';
export const END_DATABASE_REFRESH = 'END_DATABASE_REFRESH';
export const UPDATE_DATABASE_REFRESH_PROGRESS = 'UPDATE_DATABASE_REFRESH_PROGRESS';

const beginDatabaseRefresh = () => ({type: BEGIN_DATABASE_REFRESH});
const endDatabaseRefresh = () => ({type: END_DATABASE_REFRESH});
export const updateDatabaseRefreshProgress = progress => ({type: UPDATE_DATABASE_REFRESH_PROGRESS, progress});

export const refreshDatabase = () => dispatch => {
    dispatch(beginDatabaseRefresh());
    refreshDb()
    .then(() => dispatch(endDatabaseRefresh()));
}

export const REFRESH_TRANSMISSION_STATUS = 'REFRESH_TRANSMISSION_STATUS';
export const refreshTransmissionStatus = status => ({type: REFRESH_TRANSMISSION_STATUS, status});

export const UPDATE_FIRST_MOVIES = 'UPDATE_FIRST_MOVIES';
export const updateFirstMovies = movies => ({type: UPDATE_FIRST_MOVIES, movies});

export const REFRESH_PLEX = 'REFRESH_PLEX';
export const refreshPlex = () => dispatch => {
    refreshPx()
    .then(movies => dispatch({type: REFRESH_PLEX, movies}))
}
