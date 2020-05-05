const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

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
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      analyzerMode: 'static',
      openAnalyzer: false,
      statsFilename: 'stats.json',
    }),
  ],
  module: {
    rules: [
      { test: /\.pug$/, loader: 'pug-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      // { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
  },
};
