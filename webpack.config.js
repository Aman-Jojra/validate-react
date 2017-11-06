const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './source/validate.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'validate.js',
    libraryTarget: 'umd',
    library: 'add'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}