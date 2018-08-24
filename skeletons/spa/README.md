# #APP_NAME#

`@alvaro-cuesta/webpack-parts` has no auto-generator for now, so just copy
this skeleton and replace placeholders in every file:

- `#PROJECT_NAME#`: your project short name (as in `package.json`).
- `#APP_NAME#`: human-readable application name.
- `#APP_DESCRIPTION#`: application description.
- `#GITHUB_USERNAME#`: your GitHub username.
- `#KEYWORDS#`: array of strings (tags) for NPM registry.
- Optional (remove in `package.json` if needed, or replace with a string):
  - `#AUTHOR_NAME#`: your name.
  - `#AUTHOR_EMAIL#`: your email.
  - `#AUTHOR_URL#`: your website URL.
- `#AUTHOR#`: `#AUTHOR_NAME# <#AUTHOR_EMAIL#> (#AUTHOR_URL#)` (or any combination of them)

#APP_DESCRIPTION#

Live demo: https://#GITHUB_USERNAME#.github.io/#PROJECT_NAME#/

## Development

- Start a development server at http://localhost:8080:

```sh
yarn start
```

- Build the application in the `build/` directory:

```sh
yarn build
```

- See [open tasks](TODO.md)

## Publishing

1. `yarn version --(major | minor | patch)`
2. `yarn deploy`
3. `git push && git push --tags`

## License

**ISC License (ISC)**

Copyright (c) 2018, #AUTHOR#

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
