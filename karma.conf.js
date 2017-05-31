const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    files: [
      { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
      'test-context.js'
    ],

    preprocessors: {
      'test-context.js': ['webpack']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /(\.js)|(\.jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                plugins: ['transform-decorators-legacy' ],
                presets: ['react', 'es2015', 'stage-0'],
                cacheDirectory: true
            }
          },
          {
            test: /(\.css)|(.scss)$/,
            loader:'style!css!sass'
          },
          {
            test: /\.png$/,
            loader: 'url-loader?limit=100000'
          },
          {
            test: /\.jpg$/,
            loader: 'file-loader'
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
          },
          {
            test: /\.png$/,
            loader: 'url-loader?limit=100000'
          },
          {
            test: /\.jpg$/,
            loader: 'file-loader'
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
          }
        ]
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.es6.jsx', '.scss', '.css'],
        alias: {
            'sinon': 'sinon/pkg/sinon'
        }
      },
      noParse: [
          /node_modules\/sinon\//,
      ],
      externals: {
          'jsdom': 'window',
          'cheerio': 'window',
          'react/lib/ExecutionEnvironment': true,
          'react/addons': true,
          'react/lib/ReactContext': 'window'
      }
    },

    webpackServer: {
      noInfo: false
    },

    singleRun: true,

    colors: true,

    logLevel: config.LOG_INFO
  });
};
