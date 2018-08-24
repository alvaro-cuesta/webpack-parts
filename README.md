# Álvaro Cuesta Webpack config parts

My Webpack (^4.8.3) config parts. Simple and sane Webpack defaults for _my_
most common use cases.

```sh
npm install --save-dev @alvaro-cuesta/webpack-parts webpack webpack-merge webpack-cli webpack-serve react-hot-loader
```

You can import [parts](lib/parts.js) individually or load a [preset](#presets).

## [Presets](lib/index.js)

### Single-Page App

```javascript
const path = require('path');

const paths = {
  app: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'build'),
};

module.exports = require('@alvaro-cuesta/webpack-parts')
  .spa({
    name: 'My App',
    paths,
    alias: { components: path.join(paths.app, 'components') },
  });

```

## License

**ISC License (ISC)**

Copyright (c) 2018, Álvaro Cuesta <https://alvaro-cuesta.github.io>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
