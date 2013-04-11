#!/usr/bin/env node
var PB = require('./pb');
var args = process.argv.slice(2);
if(args[0] == "-s") {
	var type = args[1] || '';
	var data = "";
	process.stdin.on('data', function(d) { data += d; });
	process.stdin.on('end', function() { PB.set(type, data);});
	process.stdin.resume();
} else {
	var type = args[0] || '';
	console.log(String(PB.get(type)));
}
