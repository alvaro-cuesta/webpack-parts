"use strict";

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const parts = require('./parts');

const PROJECT_ROOT = process.cwd();

exports.spa = ({
  name,
  paths,
  alias,
  metadata,
}) => (
  merge(
    parts.basic({
      entry: path.join(paths.app, 'index.jsx'),
      projectRoot: PROJECT_ROOT,
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
  )
);
