var path = require('path');
var webpack = require('webpack');
var babel = require('babel-loader');
require('babel-polyfill');

module.exports =  {
    // mode: 'development',
    devtool: 'cheap-module-source-map',
    context: path.resolve(__dirname, './src'),
    entry: {
        app: ['babel-polyfill', './scripts/app.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.bundle.js',
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }]
    }
}