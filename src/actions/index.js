import {refresh as databaseRefresh} from '../database';
import {refresh as plexRefresh} from '../plex';
import {refresh as torrentsRefresh} from '../transmission';

export const BEGIN_DATABASE_REFRESH = 'BEGIN_DATABASE_REFRESH';
export const END_DATABASE_REFRESH = 'END_DATABASE_REFRESH';
export const UPDATE_DATABASE_REFRESH_PROGRESS = 'UPDATE_DATABASE_REFRESH_PROGRESS';

const beginDatabaseRefresh = () => ({type: BEGIN_DATABASE_REFRESH});
const endDatabaseRefresh = () => ({type: END_DATABASE_REFRESH});
export const updateDatabaseRefreshProgress = progress => ({type: UPDATE_DATABASE_REFRESH_PROGRESS, progress});

export const refreshDatabase = () => dispatch => {
    dispatch(beginDatabaseRefresh());
    databaseRefresh()
    .then(() => dispatch(endDatabaseRefresh()));
}

export const REFRESH_TRANSMISSION_STATUS = 'REFRESH_TRANSMISSION_STATUS';
export const refreshTransmissionStatus = status => ({type: REFRESH_TRANSMISSION_STATUS, status});

export const UPDATE_FIRST_MOVIES = 'UPDATE_FIRST_MOVIES';
export const updateFirstMovies = movies => ({type: UPDATE_FIRST_MOVIES, movies});

export const REFRESH_PLEX = 'REFRESH_PLEX';
export const refreshPlex = () => dispatch => {
    plexRefresh()
    .then(movies => dispatch({type: REFRESH_PLEX, movies}))
}

export const REFRESH_TORRENTS = 'REFRESH_TORRENTS';
export const refreshTorrents = () => dispatch => {
    torrentsRefresh()
    .then(torrents => dispatch({type: REFRESH_TORRENTS, torrents}))
}
