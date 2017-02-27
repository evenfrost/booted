const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { port } = require('./misc');

const rootResolve = pathname => resolve(__dirname, '../../', pathname);


module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    rootResolve('client/index.js'),
  ],
  output: {
    path: rootResolve('public'),
    filename: 'bundle.js',
    publicPath: `http://localhost:${port}/`,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.pug$/,
      loader: 'pug-loader',
    }, {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        'stylus-loader',
      ],
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: `${rootResolve('client/index.pug')}`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    modules: [
      rootResolve('client'),
      'node_modules',
    ],
  },
};
