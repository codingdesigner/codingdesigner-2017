const path = require('path');
const webpack = require('webpack');
const sassLintPlugin = require('sasslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/codingdesigner'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
          to: 'static',
          flatten: true,
        }
      ]
    )
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
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              root: './'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                'node_modules'
              ]
            }
          }
        ]
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
