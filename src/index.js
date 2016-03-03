'use strict';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {getMovie, getAllMovies, refresh} from './database';

class App extends Component {
    state = {movie: {}, movieCount: 0};

    componentDidMount() {
        getMovie('10')
        .then(movie => {
            getAllMovies()
            .then(movies => movies.total_rows)
            .then(movieCount => this.setState({movie, movieCount}))
        })
    }

    render() {
        const {movie, movieCount} = this.state;
        return (
            <div>
                <button onClick={refresh}>Refresh database</button>
                <i>{movieCount} in base</i>
                <h1>{movie.title}</h1>
                <img src={movie.medium_cover_image}/>
                <p>{JSON.stringify(movie)}</p>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('react-root'));
