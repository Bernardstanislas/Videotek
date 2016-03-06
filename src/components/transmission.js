import React from 'react';
import {connect} from 'react-redux';

const Transmission = ({dispatch, transmission}) => (
    <div>
        <p>{JSON.stringify(transmission)}</p>
    </div>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Transmission);
