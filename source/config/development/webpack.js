const webpack = require('webpack');
const { publicPath } = require('./index');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
  ],
  output: {
    publicPath,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    quiet: true,
    noInfo: true,
    inline: true,
    lazy: false,
    stats: {
      colors: true,
    },
  },
};
