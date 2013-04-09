#!/usr/bin/env node
var PB = require('./pb');
var args = process.argv.slice(2);
var type = args[0] || '';
console.log(String(PB.get(type)));
