var path = require('path');
var webpack = require('webpack');

console.log(path.join(__dirname, 'client'));

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/codingdesigner'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
    // js
    {
      test: /\.js$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    {
      test: /\.css$/,
      include: path.join(__dirname, 'client/styles'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }
    ]
  }
};
