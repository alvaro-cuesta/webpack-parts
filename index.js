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
      metadata: require(path.join(PROJECT_ROOT, 'package.json')),
    }),
    parts.babelJS(),
    parts.babelJSX(),
    parts.styles([
      parts.CSS(),
      parts.CSSModules(),
      parts.SASS(),
    ]),
  )
);
