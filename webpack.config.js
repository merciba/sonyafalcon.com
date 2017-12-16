/*eslint-env node */
'use strict';

var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './client/src/main.js',
  output: {
    path: `${__dirname}/client/dist`,
    filename: 'main.js'
  },
  resolve: {
    modules: [
      path.resolve('./node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.es6|js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-async-to-generator']
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
