# pb

Improved pbcopy/pbpaste for OSX

## Installation

`npm install pb`

## Usage

```
$ pb [type]
$ get_data | pb -s [type]
```

For example, to grab the contents of the html pasteboard and put it on the 
plaintext pasteboard:


```bash
$ pb html | pb -s
```

From node, `pb` exposes `get(type)` and `set(type, data)` functions

```
var PB = require('pb');
var HTMLOutput = pb.get('html');
var textOutput = pb.get();
```
