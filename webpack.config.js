var path = require('path');
var webpack = require('webpack');
var fs = require("fs");

module.exports = {
  entry: './src/VideoFrame.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'VideoFrame.js',
    library: 'VideoFrame',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),*/
    new webpack.BannerPlugin(fs.readFileSync('./LICENSE.md', 'utf8')),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  eslint: {
    configFile: './.eslintrc.js'
  },
};
