"use strict";

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_DEVELOPMENT = !!process.env.WEBPACK_SERVE;

exports.basic = function({ entry, outputPath, alias }) {
  return {
    entry,
    output: {
      path: outputPath,
      filename: IS_DEVELOPMENT ? '[name].js' : '[name].[hash].js',
      chunkFilename: '[chunkhash].js'
    },
    resolve: { alias },
    serve: {
      //host: '0.0.0.0',  TODO: Bind on 0.0.0.0 but keep WS address
    },
    mode: IS_DEVELOPMENT ? 'development' : 'production',
    devtool: IS_DEVELOPMENT ? 'eval-source-map ' : 'source-map',
  };
};

exports.babelJS = function() {
  process.env.BABEL_ENV = IS_DEVELOPMENT ? 'development' : 'production'

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
                plugins: IS_DEVELOPMENT
                  ? [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
                  : [ '@babel/plugin-proposal-class-properties' ],
                cacheDirectory: IS_DEVELOPMENT,
              },
            },
          ],
        },
      ],
    },
  };
};

exports.babelJSX = function() {
  const babel = exports.babelJS();

  babel.resolve.extensions = [ '.jsx' ];

  const rule = babel.module.rules[0];

  rule.test = /\.jsx$/;

  const options = rule.use[0].options

  options.presets.push('@babel/preset-react');

  if (IS_DEVELOPMENT) {
    options.plugins.push('react-hot-loader/babel');
  }

  return babel;
};

exports.CSS = function() {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'css-loader' ],
          /*options: {
            modules: true,
          },*/
        },
      ],
    },
  };
};

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

exports.styles = function(styleLoaders) {
  for (let { module: { rules } } of styleLoaders) {
    for (let rule of rules) {
      rule.use.splice(0, 0,
        IS_DEVELOPMENT
          ? 'style-loader'
          : MiniCssExtractPlugin.loader
      );
    }
  }

  return merge(
    ...styleLoaders,
    !IS_DEVELOPMENT
      ? {
          plugins: [
            new MiniCssExtractPlugin({
              filename: IS_DEVELOPMENT ? '[name].css' : '[name].[hash].css',
              chunkFilename: IS_DEVELOPMENT ? '[id].css' : '[id].[hash].css',
            }),
          ],
        }
      : {},
  );
};

/**/
exports.EJS = function({
  title,
  metadata,
  template = path.join(__dirname, 'index.ejs'),
}) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        title,
        metadata,
        template,
        chunksSortMode: 'dependency',
        minify: { collapseWhitespace: true },
      }),
    ],
  };
};
