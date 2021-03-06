const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const getConfig = require('./webpack.config.common');

module.exports = (_env, { mode }) => {
  return getConfig(mode, (_options, baseConfig) => {
    return merge(baseConfig, {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [new webpack.HotModuleReplacementPlugin()],
      devtool: 'inline-cheap-module-source-map',
      optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: 6,
            },
            test: /\.js($|\?)/i,
          }),
        ],
      },
    });
  });
};
