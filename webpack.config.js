const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    application: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextWebpackPlugin({ filename: 'css/styles.css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
    }),
  ],
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
    ],
  },
};
