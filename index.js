"use strict";

const isDevelopment = !!process.env.WEBPACK_SERVE

exports.basic = function({ entry, outputPath }) {
  return {
    entry,
    output: {
      path: outputPath,
      filename: '[name].[hash].js',
      chunkFilename: '[chunkhash].js'
    },
    serve: {
      host: '0.0.0.0',
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map ' : 'source-map',
  };
};

/* Dependencies:
 *
 * babel-loader                     ^8.0.0-beta.3
 * @babel/core                      ^7.0.0-beta.47
 * @babel/preset-env                ^7.0.0-beta.47
 * @babel/preset-stage-3            ^7.0.0-beta.47
 * @babel/plugin-transform-runtime  ^7.0.0-beta.47
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
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-stage-3',
                ],
                plugins: isDevelopment
                  ? [ '@babel/plugin-transform-runtime' ]
                  : [],
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
 * style-loader ^0.21.0
 */
exports.CSS = function() {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ],
        },
      ],
    },
  };
}
