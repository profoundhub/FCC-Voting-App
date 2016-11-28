var path = require('path');
var webpack = require('webpack');

var port = process.env.PORT || 8080;
var host = process.env.IP || '127.0.0.1';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './client/css/main.css',
    'webpack-hot-middleware/client',
    'eventsource-polyfill', // necessary for hot reloading with IE
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
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
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader'
    }]
  },
  devServer: {
    port: port,
    host: host
  }
};
