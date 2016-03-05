import {combineReducers} from 'redux';

import {BEGIN_DATABASE_REFRESH, END_DATABASE_REFRESH, UPDATE_DATABASE_REFRESH_PROGRESS} from '../actions';
import {REFRESH_TRANSMISSION_STATUS} from '../actions';

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

const rootReducer = combineReducers({
    database,
    transmission
})

export default rootReducer;
