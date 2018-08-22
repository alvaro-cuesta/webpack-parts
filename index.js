"use strict";

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const parts = require('./parts');

const IS_BUILD =
  process.env.npm_lifecycle_event === 'build:gh-pages' ||
  process.env.npm_lifecycle_event === 'deploy:gh-pages' ||
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
    /* IS_BUILD && parts.clean(PATHS.build), */
  )
)
