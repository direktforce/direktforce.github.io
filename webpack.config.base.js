const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({ filename: 'index.html',        template: './src/index.pug' }),
    new HtmlWebpackPlugin({ filename: 'applications.html', template: './src/applications.pug' }),
    new HtmlWebpackPlugin({ filename: 'products.html',     template: './src/products.pug' }),
    new HtmlWebpackPlugin({ filename: 'capabilities.html', template: './src/capabilities.pug' }),
    new HtmlWebpackPlugin({ filename: 'careers.html',      template: './src/careers.pug' }),
    new HtmlWebpackPlugin({ filename: 'contact.html',      template: './src/contact.pug' }),
    new MiniCssExtractPlugin(),
    new CopyPlugin([
      {from: 'static', to: 'static'},
      'favicon.ico',
    ]),
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
  },
};
