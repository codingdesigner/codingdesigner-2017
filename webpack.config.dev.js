var path = require('path');
var webpack = require('webpack');

// var PATHS = {
//   // breakpoint: path.resolve(__dirname, 'node_modules/breakpoint-sass/stylesheets/'),
//   // modularScale: path.resolve(__dirname, 'node_modules/modularscale-sass/stylesheets'),
//   // config: path.resolve(__dirname, 'config'),
//   // font: path.resolve(__dirname, 'lib/client/fonts'),
//   // image: path.resolve(__dirname, 'lib/client/images'),
//   // lib: path.resolve(__dirname, 'lib'),
//   // normalize: path.resolve(__dirname, 'node_modules/normalize.css'),
//   // page: path.resolve(__dirname, 'lib/client/js/pages'),
//   // public: path.resolve(__dirname, 'build/public'),
//   // server: path.resolve(__dirname, 'build/server'),
//   // style: path.resolve(__dirname, 'client/styles')
//   // svg: path.resolve(__dirname, 'lib/client/svg'),
//   // video: path.resolve(__dirname, 'lib/client/video'),
//   // web: path.resolve(__dirname, 'lib/client/web')
// };

// module.exports.PATHS = PATHS;

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
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      // CSS
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              root: './',
              // minimize: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // includePaths: [PATHS.breakpoint, PATHS.normalize]
            }
          }
        ]
      }
    ]
  }
};
