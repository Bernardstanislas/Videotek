import React from 'react';
import {connect} from 'react-redux';
import {updateFirstMovies} from '../actions';
import {getFirstMovies} from '../database';

const loadFirstMovies = dispatch => () => {
    getFirstMovies()
    .then(movies => dispatch(updateFirstMovies(movies)));
}

const Root = ({dispatch}) => (
    <div>
        <button onClick={loadFirstMovies(dispatch)}>Load first movies</button>
    </div>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Root);
