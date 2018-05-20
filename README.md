# Álvaro Cuesta Webpack config parts

My Webpack (^4.8.3) config parts. Simple and sane Webpack defaults for _my_
most common use cases.

```sh
npm install --save-dev webpack webpack-merge webpack-cli webpack-serve git+https://github.com/alvaro-cuesta/webpack-parts#semver:^0.1.1
```

Example `webpack.config.js`:

```javascript
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('alvaro-cuesta-webpack-parts');

module.exports = merge(
  parts.basic({
    entry: path.join(__dirname, 'app', 'index.jsx'),
    outputPath: path.join(__dirname, 'build'),
  }),
  parts.babelJS(),
  parts.babelJSX(),
  parts.CSS(),
);
```

See each part in [index.js](index.js) for a list of dependencies you must
include in your project.

## License

ISC License (ISC)

Copyright (c) 2018, Álvaro Cuesta <https://alvaro-cuesta.github.io>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
