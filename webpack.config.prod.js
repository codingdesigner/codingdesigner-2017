const path = require('path');
const webpack = require('webpack');
const sassLintPlugin = require('sasslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/codingdesigner'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new sassLintPlugin({
      configFile: '.sass-lint.yml',
      context: './client',
      ignoreFiles: [
        './client/styles/vendor/fontAwesome/_animated.scss',
        './client/styles/vendor/fontAwesome/_bordered-pulled.scss',
        './client/styles/vendor/fontAwesome/_core.scss',
        './client/styles/vendor/fontAwesome/_larger.scss',
        './client/styles/vendor/fontAwesome/_list.scss',
        './client/styles/vendor/fontAwesome/_mixins.scss',
        './client/styles/vendor/fontAwesome/_path.scss',
        './client/styles/vendor/fontAwesome/_stacked.scss'
      ]
    }),
    new CopyWebpackPlugin(
      [
        {
          from: 'client/assets/images/favicons/**.*',
          to: '',
          flatten: true,
        }
      ]
    ),
    extractSass
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
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|mp3|mp4|mov)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      // CSS
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              root: './',
              minimize: true
            }
          },
            {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  'node_modules'
                ]
              }
            }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      // Markdown
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",

          }
        ]
      }
    ]
  }
};
