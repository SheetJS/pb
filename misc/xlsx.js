#!/usr/bin/env node
/* pb.js -- (C) 2013-present  SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*jshint node:true */
var PB = require('../'), fs = require('fs');

/* generate RTF */
var XLSX = require('xlsx');
var wb = XLSX.utils.book_new();
var ws = XLSX.utils.aoa_to_sheet([["Sheet", "JS"],[1,2,3,4]]);
XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
var RTF = XLSX.write(wb, {type:'binary', bookType:'rtf'});

/* copy to pasteboard */
PB.set('RTF', RTF);
