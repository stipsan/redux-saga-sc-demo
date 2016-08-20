const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devServerHostName = process.env.DEV_SERVER_HOST_NAME || 'localhost'
const devServerPort = process.env.DEV_SERVER_PORT || '8080'

let plugins = 'production' === process.env.NODE_ENV ? [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
    },
    comments: false,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
] : [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
]

plugins = plugins.concat(new ExtractTextPlugin('[chunkhash].css', {
  allChunks: true,
  disable: false || 'production' !== process.env.NODE_ENV,
}))

const googleAnalytics = process.env.TRACKING_ID ? {
  trackingId: process.env.TRACKING_ID,
  pageViewOnLoad: true
} : false

plugins = plugins.concat(new HtmlWebpackPlugin({
  title: 'Demo Chat app built with redux-saga-sc',
  inject: false,
  template: require('html-webpack-template'),
  appMountId: 'app',
  mobile: true,
  googleAnalytics,
}))

/**
 * JSX syntax is transpiled to React.createElement calls with babel, which is why devs
 * often do `import React from 'react'` even if `React` itself isn't used in the source.
 * it's also why variations like `import React, {Component, PropTypes} from 'react'`
 * is seen in the wild.
 * However, when modules can be inlined using `transform-react-inline-elements`
 * importing `React` isn't necessary as babel replaces the JSX with whatever
 * the React.createElement returns on the call-site, reducing bloat and laying the ground work
 * for tree shaking in webpack v2
 */
plugins = plugins.concat(new webpack.ProvidePlugin({
  React: 'react',
}))

const entry = 'production' === process.env.NODE_ENV ? {
  app: [
    'babel-polyfill',
    './src/client/index',
  ],
} : {
  app: [
    `webpack-dev-server/client?http://${devServerHostName}:${devServerPort}/`,
    'webpack/hot/dev-server',
    'babel-polyfill',
    './src/client/index',
  ],
}

module.exports = {
  devtool: 'production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map',
  entry,
  debug: 'production' !== process.env.NODE_ENV,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: `http://${devServerHostName}:${devServerPort}/`,
    hot: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'production' === process.env.NODE_ENV ? '[name].js?[chunkhash]' : '[name].js?[hash]',
    chunkFilename: 'production' === process.env.NODE_ENV ?
                   '[name].js?[chunkhash]' : '[name].js?[chunkhash]',
    publicPath: 'production' === process.env.NODE_ENV ?
                '/' : `http://${devServerHostName}:${devServerPort}/`,
  },
  plugins,
  uikitLoader: {
    theme: 'src/client/theme.less'
  },
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json' },
    ],
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css?$/, loaders: [
        'classnames',
        ExtractTextPlugin.extract(
           'style',
           'css'
         )
      ] },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
    ],
  },
}
