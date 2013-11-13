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

From node, `pb` exposes:

- `get(type)`: get pasteboard data from specified pasteboard
- `set(type, data)`: set pasteboard data (overwrites other pasteboards)

```
var pb = require('pb');
var HTMLOutput = pb.get('html');
var textOutput = pb.get();
```

## Supported Pasteboards

- `NSStringPboardType` (plaintext) 
- `NSHTMLPboardType` (HTML) 
