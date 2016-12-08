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
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json',
    }, {
      test: /\.pug$/,
      loader: 'pug',
    }, {
      test: /\.styl$/,
      loader: 'style!css!stylus',
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${rootResolve('client/index.pug')}`,
    }),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.js',
    },
  },
  devServer: {
    contentBase: rootResolve('client'),
    inline: true,
    hot: true,
    port: PORT || 3000,
  },
};
