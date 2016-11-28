var path = require('path');

var port = process.env.PORT || 8080;
var host = process.env.IP || '127.0.0.1';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'normalize.css',
    './client/css/main.css',
    'eventsource-polyfill' // necessary for hot reloading with IE
    
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'client'),
      query: {
        presets: [ 'es2015', 'react', 'react-hmre' ]
      }
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
    }]
  },
  resolve: {
    root: path.resolve('./client'),
  },
  devServer: {
    port: port,
    host: host
  }
};
