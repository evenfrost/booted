import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const { PORT } = process.env;

const rootResolve = pathname => resolve(__dirname, pathname);

export default {
  entry: rootResolve('client/index.js'),
  output: {
    path: rootResolve('public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
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
      loaders: [
        'style-loader',
        'css-loader',
        'stylus-loader',
      ],
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${rootResolve('client/index.pug')}`,
    }),
  ],
  resolve: {
    modules: [
      rootResolve('client'),
      'node_modules',
    ],
  },
  devServer: {
    contentBase: rootResolve('client'),
    compress: true,
    port: +PORT || 3000,
  },
};
