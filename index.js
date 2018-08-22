"use strict";

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const parts = require('./parts');

const IS_DEVELOPMENT = !!process.env.WEBPACK_SERVE

const IS_GITHUB =
  process.env.npm_lifecycle_event === 'build:gh-pages' ||
  process.env.npm_lifecycle_event === 'deploy:gh-pages'

const IS_BUILD = IS_GITHUB ||
  process.env.npm_lifecycle_event === 'build'

exports.spa = ({
  name,
  paths,
  alias,
  metadata,
}) => (
  merge(
    parts.basic({
      entry: path.join(paths.app, 'index.jsx'),
      outputPath: paths.output,
      alias,
    }),
    parts.EJS({
      title: name,
      template: path.join(paths.app, 'index.ejs'),
      metadata,
    }),
    parts.babelJS(),
    parts.babelJSX(),
    parts.styles([
      parts.CSS(),
      parts.SASS(),
    ]),
    IS_GITHUB && { output: { publicPath: `/${metadata.name}/` } },
    /* IS_BUILD && parts.clean(PATHS.build), */
    IS_DEVELOPMENT && { output: { publicPath: '/' } }
  )
)
