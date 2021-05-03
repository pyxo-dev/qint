# Introduction

Qint (Quasar internationalization) is a library (and app extension) to
facilitate the i18n of Quasar apps.

# Installation

``` bash
npm install @pyxo/qint
# or
yarn add @pyxo/qint
```

# Features

-   SSR support.
-   Supports different URL modes: prefix (example.com/en), subdomain
    (en.example.com), host (example.co.uk), search-param
    (example.com?l=en), none (example.com)
-   Supports the use of a language tag cookie.
-   Can make use of the user's client language preferences (e.g. browser
    settings).
-   Support for `hreflang` link tags.
-   Language tags, Qint uses the term "language tag" to denote a
    language or a locale, and recommends the use of [BCP
    47](https://www.w3.org/International/articles/language-tags)
    language tags.

# Documentation

API docs: [qint.pyxo.net/api](https://qint.pyxo.net/api)

# Source code

Repository: [github.com/pyxo-dev/qint](https://github.com/pyxo-dev/qint)

Contributions are welcome!

# See also

-   [Wint](https://github.com/pyxo-dev/wint) Web apps int.
-   [Vint](https://github.com/pyxo-dev/vint) Vue int.
