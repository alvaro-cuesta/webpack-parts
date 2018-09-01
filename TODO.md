# TODO

- Banner plugin
- SASS modules
- Is SASS source map working in dev?
- optimization.noEmitOnErrors?
- Error overlay?
- CLI display options?
- Build errors/lint warnings on CLI?
- Lint warnings on dev console
- https://github.com/andywer/webpack-blocks
- @babel/plugin-transform-runtime?
- Is vendor chunk extraction separating CSS in a separate chunk too?
- Allow specifying html lang and meta tag
- mobile-web-app-capable, manifest, apple-touch-icon, etc.
- OpenGraph/Twitter meta tags
- Is hash getting changed when source code is the same? Might be related to
  html plugin, hard to reproduce (but sometimes happens when uploading to gh pages)
- Migrate back to webpack-dev-server?
  - https://github.com/webpack/webpack-dev-server/issues/1463
  - AFAICT there is no way to tune output (e.g. only errors and warning), maybe
    using webpackDevMiddleware?
