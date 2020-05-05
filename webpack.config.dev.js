const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [ ],
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    disableHostCheck: true,
    contentBase: "./dist",
    staticOptions: {
      extensions: ['html', 'pug'], // doesn't work
    },
    writeToDisk: true,
  },
  output: {
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      { test: /\.pug$/, loader: 'pug-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
    ]
  }
});
