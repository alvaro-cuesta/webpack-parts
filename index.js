"use strict";

const merge = require('webpack-merge');

const isDevelopment = !!process.env.WEBPACK_SERVE;

exports.basic = function({ entry, outputPath }) {
  return {
    entry,
    output: {
      path: outputPath,
      filename: isDevelopment ? '[name].js' : '[name].[hash].js',
      chunkFilename: '[chunkhash].js'
    },
    serve: {
      //host: '0.0.0.0',  TODO: Bind on 0.0.0.0 but keep WS address
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map ' : 'source-map',
  };
};

/* Dependencies:
 *
 * babel-loader                               ^8.0.0-beta.3
 * @babel/core                                ^7.0.0-beta.47
 * @babel/preset-env                          ^7.0.0-beta.47
 * @babel/plugin-transform-runtime            ^7.0.0-beta.47
 * @babel/plugin-transform-async-to-generator ^7.0.0-beta.53
 * @babel/plugin-proposal-class-properties    ^7.0.0-rc.2
 *
 * Runtime dependencies:
 *
 * @babel/runtime                   ^7.0.0-beta.47
 */
exports.babelJS = function() {
  process.env.BABEL_ENV = isDevelopment ? 'development' : 'production'

  return {
    resolve: {
      extensions: [ '.js' ]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [ '@babel/preset-env' ],
                plugins: isDevelopment
                  ? [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
                  : [ '@babel/plugin-proposal-class-properties' ],
                cacheDirectory: isDevelopment,
              },
            },
          ],
        },
      ],
    },
  };
};

/* Dependencies:
 *
 * All from babelJS() and:
 *
 * @babel/preset-react  ^7.0.0-beta.47
 * react-hot-loader     ^4.2.0
 */
exports.babelJSX = function() {
  const babel = exports.babelJS();

  babel.resolve.extensions = [ '.jsx' ];

  const rule = babel.module.rules[0];

  rule.test = /\.jsx$/;

  const options = rule.use[0].options

  options.presets.push('@babel/preset-react');

  if (isDevelopment) {
    options.plugins.push('react-hot-loader/babel');
  }

  return babel;
};

/* Dependencies:
 *
 * css-loader   ^0.28.11
 */
exports.CSS = function() {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'css-loader' ],
        },
      ],
    },
  };
};

/* Dependencies:

 * node-sass    ^4.9.0
 * sass-loader  ^7.0.1
 * css-loader   ^0.28.11
 */
exports.SASS = function() {
  return {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [ 'css-loader', 'sass-loader' ],
        },
      ],
    },
  };
};

/* Dependencies:
 *
 * style-loader ^0.21.0
 */
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.styles = function(styleLoaders) {
  for (let { module: { rules } } of styleLoaders) {
    for (let rule of rules) {
      rule.use.splice(0, 0,
        isDevelopment
          ? 'style-loader'
          : MiniCssExtractPlugin.loader
      );
    }
  }

  return merge(
    ...styleLoaders,

    !isDevelopment
      ? {
          plugins: [
            new MiniCssExtractPlugin({
              filename: isDevelopment ? '[name].css' : '[name].[hash].css',
              chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
            }),
          ],
        }
      : {},
  );
};
