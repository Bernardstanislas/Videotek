import React from 'react';
import {connect} from 'react-redux';
import {refreshDatabase} from '../actions';

const Root = ({dispatch}) => (
    <div>
        <button onClick={() => dispatch(refreshDatabase())}>Refresh database</button>
    </div>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Root);
