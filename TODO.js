
const MINIFY_CONFIG = {
  minimize: true,
  screw_ie8 : true,
  mangle: {
    except: ['webpackJsonp'],
    screw_ie8 : true,
    keep_fnames: false,
  },
  output: {
    comments: false,
    screw_ie8 : true
  },
  compress: {
    sequences: true,
    properties: true,
    dead_code: true,
    drop_debugger: true,
    unsafe: false,
    unsafe_comps: false,
    conditionals: true,
    comparisons: true,
    evaluate: true,
    booleans: true,
    loops: true,
    unused: true,
    hoist_funs: true,
    hoist_vars: false,
    if_return: true,
    join_vars: true,
    cascade: true,
    collapse_vars: true,
    reduce_vars: true,
    warnings: false,
    negate_iife: true,
    pure_getters: true,
    pure_funcs: null,
    drop_console: false,
    keep_fargs: false,
    keep_fnames: false,
    screw_ie8 : true
  }
};

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin(Object.assign(
        {},
        MINIFY_CONFIG,
        {
          exclude: [/vendor/, /manifest/],
          sourceMap: true,
        }
      )),
      new webpack.optimize.UglifyJsPlugin(Object.assign(
        {},
        MINIFY_CONFIG,
        {
          test: [/vendor/, /manifest/],
          sourceMap: false,
        }
      )),
      new webpack.optimize.OccurrenceOrderPlugin(false),
    ]
  };
};

exports.productionSourceMap = function() {
  return {
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        exclude: [/vendor/, /manifest/],
        filename: '[file].map',
        moduleFilenameTemplate: 'webpack:///[resource-path]',
        fallbackModuleFilenameTemplate: 'webpack:///[resourcePath]?[hash]',
        columns: true
      })
    ]
  }
}

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    entry: entry,
    output: {filename: '[name].[chunkhash].js'},
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}
