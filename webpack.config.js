const webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: './index.js',

    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath: 'http://localhost:8080/dist/'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    }
};
