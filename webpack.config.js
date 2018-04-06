/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptmizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

const isProd = ENV == 'production';

const plugins = [];

if (isProd) {
  plugins.push(
    new OptmizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    })
  );

  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

plugins.push(new CleanWebpackPlugin(['dist']));
plugins.push(
  new HtmlWebpackPlugin({
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true,
    },
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html',
    inject: 'body',
    favicon: 'src/assets/images/favicon.ico',
  })
);
plugins.push(new ExtractTextWebpackPlugin({ filename: 'css/styles.css', allChunks: true }));
plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
  })
);

module.exports = {
  entry: {
    application: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'moment',
      'mobx',
      'mobx-react',
      'lodash',
      'crypto-js',
      'axios',
    ],
  },
  plugins: plugins,
  resolve: {
    alias: {
      config: path.join(__dirname, 'src/config', ENV),
    },
  },
  devServer: {
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-1'],
            plugins: ['transform-decorators-legacy'],
          },
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextWebpackPlugin.extract('css-loader!sass-loader'),
      },
      { test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
};
