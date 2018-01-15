const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    application: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
      { from: path.join(__dirname, 'src/assets') }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    })
  ],
  resolve: {
    alias: {
      config: path.join(__dirname, 'src/config', ENV)
    }
  },
  devServer: {
    port: 3000,
    compress: true,
    historyApiFallback: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
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
            plugins: ['transform-decorators-legacy']
          }
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
