# pb

Improved pbcopy/pbpaste for OSX

The standard pbcopy and pbpaste utilities can manipulate the plaintext clipboard
but have no easy way of accessing the HTML pasteboard.  This module and CLI tool
provide a more convenient way to access the pasteboard from node.


## Command-Line Tool Usage

To get data from a specific pasteboard:

```bash
$ npx pb [type]
$ npx pb -m <type>
```

To set a specific pasteboard, pipe data into pb:

```bash
$ get_data | npx pb -s [type]
```

To list available pasteboards:

```bash
$ npx pb -l
```

For example, to grab the contents of the HTML pasteboard and put it on the
plaintext pasteboard:

```bash
$ npx pb -m html | npx pb -s
```


## Library Usage

From node, `pb` exposes:

- `get(type)`: get pasteboard data from specified pasteboard
- `set(type, data)`: set pasteboard data (overwrites other pasteboards)
- `available()`: enumerate available pasteboards

This example gets the pasteboard HTML data and copies to plaintext pasteboard:

```js
var pb = require('pb');
var HTMLOutput = pb.get('html');
pb.set('text', HTMLOutput);
```


## Supported Pasteboards

| type                 | description |
|:---------------------|:------------|
| `NSStringPboardType` | plaintext   |
| `NSHTMLPboardType`   | HTML        |
| `NSRTFPboardType`    | RTF         |


## License

Please consult the attached LICENSE file for details.  All rights not explicitly
granted by the Apache 2.0 license are reserved by the Original Author.

[![Analytics](https://ga-beacon.appspot.com/UA-36810333-1/SheetJS/pb?pixel)](https://github.com/SheetJS/pb)
