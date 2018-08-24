"use strict";

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const parts = require('./parts');

const projectRoot = process.cwd();

const metadata = require(path.join(projectRoot, 'package.json'))

exports.spa = ({
  name,
  paths,
  alias,
  template = path.join(__dirname, 'index.ejs')
}) => (
  merge(
    parts.basic({
      entry: path.join(paths.app, 'index.jsx'),
      projectName: metadata.name,
      projectRoot,
      outputPath: paths.output,
      alias,
    }),
    parts.EJS({
      title: name,
      template,
      metadata,
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
