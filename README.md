# Introduction

Qint (Quasar internationalization) is a library that facilitate the i18n of
Quasar apps. Qint extends [Vint](https://github.com/pyxo-dev/vint).

# Installation

``` bash
yarn add vue-i18n@next
yarn add @pyxo/qint
# or
npm install vue-i18n@next
npm install @pyxo/qint
```

For an easier way to get started, see the app extension [Int](https://github.com/pyxo-dev/quasar-app-extension-int).

# Features

-   SSR support.
-   Supports different URL modes: prefix (example.com/en), subdomain
    (en.example.com), host (example.co.uk), search-param (example.com?l=en), none
    (example.com)
-   Supports the use of a language tag cookie.
-   Can make use of the user's client language preferences (e.g. browser
    settings).
-   Support for `hreflang` link tags.
-   Lazy loading of Quasar language packs and `vue-i18n` locale messages.
-   Language tags, Qint uses the term "language tag" to denote a language or a
    locale, and recommends the use of [BCP 47](https://www.w3.org/International/articles/language-tags) language tags.

# Documentation

API docs: [qint.pyxo.net/api](https://qint.pyxo.net/api)

# Source code

Repository: [github.com/pyxo-dev/qint](https://github.com/pyxo-dev/qint)

Contributions are welcome!

# See also

-   [Wint](https://github.com/pyxo-dev/wint) Web apps int.
-   [Vint](https://github.com/pyxo-dev/vint) Vue int.
-   [Int](https://github.com/pyxo-dev/quasar-app-extension-int) Quasar Int app extension.
