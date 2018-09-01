"use strict";

const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const IS_DEVELOPMENT = !!process.env.WEBPACK_SERVE;

const IS_GITHUB =
  process.env.npm_lifecycle_event === 'build:gh-pages' ||
  process.env.npm_lifecycle_event === 'deploy:gh-pages';

const IS_OPEN_PUBLIC = process.env.npm_lifecycle_event === 'public'

exports.basic = function basic({ entry, projectName, projectRoot, outputPath, alias, colors, vendorSourceMap = true }) {
  return {
    entry,
    output: {
      path: outputPath,
      filename: IS_DEVELOPMENT ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: IS_DEVELOPMENT ? '[name].js' : '[name].[contenthash].js',
      publicPath: (
          IS_DEVELOPMENT
          ? '/'
        : IS_GITHUB
          ? `/${projectName}/`
        : undefined
      )
    },
    resolve: { alias },
    serve: {
      ...(IS_OPEN_PUBLIC
        ? {
            host: '0.0.0.0',
            hotClient: {
              host: {
                client: '*',
                server: '0.0.0.0',
              },
            },
          }
        : {}
      ),
    },
    plugins: [
      ...(!IS_DEVELOPMENT
        ? [
            new CleanWebpackPlugin(
              [ outputPath ],
              {
                root: projectRoot,
                beforeEmit: true
              }
            ),

            new webpack.SourceMapDevToolPlugin({
              exclude: [/manifest/, ...(!vendorSourceMap ? [/vendor/] : [])],
              filename: '[file].map',
              moduleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
              fallbackModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]/[hash]?[loaders]',
              columns: true,
            }),
          ]
        : []
      ),
    ],
    mode: IS_DEVELOPMENT ? 'development' : 'production',
    devtool: IS_DEVELOPMENT ? 'eval-source-map ' : undefined,
    stats: IS_DEVELOPMENT
      ? {
          all: false,
          modules: true,
          maxModules: 0,
          errors: true,
          warnings: true,
          colors,
        }
      : {
          entrypoints: true,
          chunkGroups: true,
          modules: false,
          chunks: true,
          chunkModules: true,
          chunkOrigins: true,
          depth: true,
          reasons: true,
          usedExports: true,
          providedExports: true,
          optimizationBailout: true,
          errorDetails: true,
          publicPath: true,
          exclude: false,
          maxModules: Infinity,
          colors,
        },
  };
};

exports.extractManifest = function extractManifest() {
  if (IS_DEVELOPMENT) return {}

  return {
    optimization: {
      runtimeChunk: { name: 'manifest' },
    },
  };
};

exports.extractVendor = function extractVendor() {
  if (IS_DEVELOPMENT) return {}

  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /node_modules/,
            chunks: 'initial',
            priority: 10,
            enforce: true
          }
        }
      }
    },
  }
}

exports.babelJS = function babelJS() {
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
                plugins: IS_DEVELOPMENT // Why did I do this? Should it be anything else?
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

exports.babelJSX = function babelJSX() {
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

exports.CSS = function CSS() {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            }
          ],
        },
      ],
    },
  };
};

exports.CSSModules = function CSSModules() {
  return {
    module: {
      rules: [
        {
          test: /\.cssm$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: IS_DEVELOPMENT
                  ? '[path][name]__[local]--[hash:base64:5]'
                  : '[hash:base64]',
                camelCase: 'only',
              },
            }
          ],
        },
      ],
    },
  };
};

exports.SASS = function SASS() {
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

exports.styles = function styles(styleLoaders) {
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
              filename: IS_DEVELOPMENT ? '[name].css' : '[name].[contenthash].css',
              chunkFilename: IS_DEVELOPMENT ? '[name].css' : '[name].[contenthash].css',
            }),
          ],
        }
      : {},
  );
};

/**/
exports.EJS = function EJS({ title, metadata, template, inlineManifest }) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        title,
        metadata,
        template,
        chunksSortMode: 'dependency',
        minify: { collapseWhitespace: true },
      }),

      ...(inlineManifest && !IS_DEVELOPMENT
        ? [ new InlineManifestWebpackPlugin('manifest') ]
        : []
      )
    ],
  };
};
