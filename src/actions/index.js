import {refresh} from '../database';

export const BEGIN_DATABASE_REFRESH = 'BEGIN_DATABASE_REFRESH';
export const END_DATABASE_REFRESH = 'END_DATABASE_REFRESH';
export const UPDATE_DATABASE_REFRESH_PROGRESS = 'UPDATE_DATABASE_REFRESH_PROGRESS';

const beginDatabaseRefresh = () => ({type: BEGIN_DATABASE_REFRESH});
const endDatabaseRefresh = () => ({type: END_DATABASE_REFRESH});
export const updateDatabaseRefreshProgress = progress => ({type: UPDATE_DATABASE_REFRESH_PROGRESS, progress});

export const refreshDatabase = () => dispatch => {
    dispatch(beginDatabaseRefresh());
    refresh()
    .then(() => dispatch(endDatabaseRefresh()));
}

export const REFRESH_TRANSMISSION_STATUS = 'REFRESH_TRANSMISSION_STATUS';
export const refreshTransmissionStatus = status => ({type: REFRESH_TRANSMISSION_STATUS, status});
