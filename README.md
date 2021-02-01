# Node Google Translate

Scrape from google translate

## Installation

```bash
$ git clone https://github.com/fazxid/node-google-translate
$ npm install
```

## Executing Shell Commands

node translate {select language} {to language} {text translate}

```bash
$ node translate auto id 'Hello World'
// Halo Dunia

$ node translate en id 'Hello World'
// Halo Dunia

```

## Language Shortcode

Look at the google translate url :

ht<span>tps://<span>translate.google.com/`?sl={en}`&`tl={id}`&text=hello%20world&op=translate

## License

[MIT][license-url]

Copyright (c) 2020 Fazxid

[license-url]: LICENSE
