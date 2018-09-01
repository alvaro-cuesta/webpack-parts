# Álvaro Cuesta Webpack config parts

My Webpack (^4.8.3) config parts. Simple and sane Webpack defaults for _my_
most common use cases.

```sh
npm install --save-dev @alvaro-cuesta/webpack-parts webpack webpack-merge webpack-cli webpack-serve react-hot-loader
```

You can import [parts](lib/parts.js) individually, load a [preset](lib/index.js)
or just copy&paste (or base your project) in one of our [skeletons](skeletons).

For now some parts are heavily tied to `package.json` script names. Namely,
`build`, `build:gh-pages` and `deploy:gh-pages` are required for `parts.basic`
to configure webpack correctly. Check out our example [`package.json`](skeletons/spa/package.json).

## Publishing `@alvaro-cuesta/webpack-parts`

1. `yarn version --(major | minor | patch)`
2. `yarn publish`
3. `git push && git push --tags`

## License

**ISC License (ISC)**

Copyright (c) 2018, Álvaro Cuesta <https://alvaro-cuesta.github.io>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
