"use strict";

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const parts = require('./parts');
const util = require('./util');

const projectRoot = process.cwd();

const metadata = require(path.join(projectRoot, 'package.json'))

exports.spa = ({
  name,
  paths,
  alias,
  template = path.join(__dirname, 'spa.ejs'),
  vendorSourceMap = true,
}) => env => (
  merge(
    parts.basic({
      entry: path.join(paths.app, 'index.jsx'),
      projectName: metadata.name,
      projectRoot,
      outputPath: paths.output,
      alias,
      publicServer: env.public,
      colors: env.colors,
      vendorSourceMap,
    }),
    parts.extractManifest(),
    parts.extractVendor(),
    parts.EJS({
      title: name,
      template,
      metadata: {
        ...metadata,
        revision: util.getCurrentGitRevision(projectRoot),
      },
      inlineManifest: true,
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
