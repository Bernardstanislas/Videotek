import React from 'react';
import {connect} from 'react-redux';
import {updateFirstMovies} from '../actions';
import {getFirstMovies} from '../database';
import rpc from '../transmission';

const loadFirstMovies = dispatch => () => {
    getFirstMovies()
    .then(movies => dispatch(updateFirstMovies(movies)));
}

const startTorrentDownload = url => {
    rpc.addUrl(url, {'download-dir': '/data/Videos/Films'});
}

const Movie = ({medium_cover_image, torrents}) => (
    <div>
        <img src={medium_cover_image}/>
        <div>
            {torrents.map(torrent => (
                <button key={torrent.hash} onClick={() => startTorrentDownload(torrent.url)}>{torrent.quality}</button>
            ))}
        </div>
    </div>
)

const Root = ({dispatch, movies}) => (
    <div>
        <button onClick={loadFirstMovies(dispatch)}>Load first movies</button>
        <div style={{display: 'flex'}}>
            {movies.map(movie => <Movie {...movie} key={movie.imdb_code}/>)}
        </div>
    </div>
);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Root);
