#!/usr/bin/env node
/* pb.js (C) 2013-present  SheetJS -- http://sheetjs.com */
var n = "pb";
/* vim: set ts=2 ft=javascript: */
var X = require('../');
var program = require('command'+'er');
program
	.version(X.version)
	.usage('[options] [mode]')
	.option('-m, --mode <mode>', 'use specified mode (default text)')
	.option('-l, --list-modes', 'list available modes')
	.option('-s, --set', 'read from stdin and set the specified clipboard');

program.on('--help', function() {
	console.log('  Support email: dev@sheetjs.com');
});

program.parse(process.argv);

var type = program.mode || program.args[0] || 'text';
if(!X.mytype(type)[0]) throw new Error("Unsupported type " + type);

if(program.listModes) { console.log(X.available().join("\n")); process.exit(0); }
if(program.set) {
	var data = "";
	process.stdin.on('data', function(d) { data += d; });
	process.stdin.on('end', function() { X.set(type, data);});
	process.stdin.resume();
} else {
	process.stdout.write(String(X.get(type)));
	if(process.stdout.isTTY) process.stdout.write("\n");
}
