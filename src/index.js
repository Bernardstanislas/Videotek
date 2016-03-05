'use strict';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {getMovie, getFirstMovies, refresh} from './database';
import {addUrl} from './transmission';

class App extends Component {
    state = {movie: {}, movieCount: 0};

    componentDidMount() {
        getMovie('5161')
        .then(movie => this.setState({movie}));
        getFirstMovies()
        .then(movies => console.log('First movies', movies));
    }

    addTorrent() {
        const url = this.state.movie.torrents[0].url;
        addUrl(url, {'download-dir': '/data/Videos/Films'}, (err, result) => {
            if (err) console.error(err);
            console.log(result);
        })
    }

    render() {
        const {movie, movieCount} = this.state;
        return (
            <div>
                <button onClick={refresh}>Refresh database</button>
                <button onClick={::this.addTorrent}>Add torrent</button>
                <i>{movieCount} in base</i>
                <h1>{movie.title}</h1>
                <img src={movie.medium_cover_image}/>
                <p>{JSON.stringify(movie)}</p>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('react-root'));
