const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
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
});
