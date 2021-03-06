import {combineReducers} from 'redux';

import {BEGIN_DATABASE_REFRESH, END_DATABASE_REFRESH, UPDATE_DATABASE_REFRESH_PROGRESS} from '../actions';
import {REFRESH_TRANSMISSION_STATUS} from '../actions';
import {UPDATE_FIRST_MOVIES} from '../actions';
import {REFRESH_PLEX} from '../actions';
import {REFRESH_TORRENTS} from '../actions';

export const DATABASE_STATUS = {IDLE: 'IDLE', REFRESHING: 'REFRESHING'};

const database = (state = {status: DATABASE_STATUS.IDLE, progress: 0}, action) => {
    switch (action.type) {
        case BEGIN_DATABASE_REFRESH:
        return {status: DATABASE_STATUS.REFRESHING, progress: 0};
        case END_DATABASE_REFRESH:
        return {status: DATABASE_STATUS.IDLE, progress: 0};
        case UPDATE_DATABASE_REFRESH_PROGRESS:
        return {...state, progress: action.progress};
        default:
        return state;
    }
}

const transmission = (state = {}, action) => {
    switch (action.type) {
        case REFRESH_TRANSMISSION_STATUS:
        return action.status;
        default:
        return state;
    }
}

const movies = (state = [], action) => {
    switch (action.type) {
        case UPDATE_FIRST_MOVIES:
        return action.movies;
        default:
        return state;
    }
}

const plex = (state = [], action) => {
    switch (action.type) {
        case REFRESH_PLEX:
        return action.movies;
        default:
        return state;
    }
}

const torrents = (state = [], action) => {
    switch (action.type) {
        case REFRESH_TORRENTS:
        return action.torrents;
        default:
        return state;
    }
}

const rootReducer = combineReducers({
    database,
    transmission,
    movies,
    plex,
    torrents
})

export default rootReducer;
