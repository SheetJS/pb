/* pb.js -- (C) 2013-present  SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*jshint node:true */
const objc = require('objc');
objc.import('AppKit');

const {
	NSPasteboard,
	NSPasteboardTypeHTML,
	NSPasteboardTypePNG,
	NSPasteboardTypeRTF,
	NSPasteboardTypeString,
} = objc;

exports.version = '0.4.0';

var mytype = exports.mytype = function mytype(type/*:string*/)/*:Array<any>*/ {
	if(!type) return [NSPasteboardTypeString, 's'];
	switch(type.toUpperCase()) {
		case 'HTML': return [NSPasteboardTypeHTML, 's'];
		case 'PNG':  return [NSPasteboardTypePNG, 'i'];
		case 'TEXT': return [NSPasteboardTypeString, 's'];
		case 'RTF':  return [NSPasteboardTypeRTF, 's'];
	}
	try {
		return [objc[type], 's'];
	} catch(e) { return [type, 's']; }
};

exports.get = function get(type/*:string*/)/*:any*/ {
	const gp = NSPasteboard.generalPasteboard();
	var tt = mytype(type), t = tt[0], o = tt[1];

	switch(o) {
		case 's': return objc.js(gp.stringForType(t));
		case 'i': {
			throw new Error("Unsupported images");
		}
	}
	throw new Error("Cannot process pasteboard data");
};

exports.set = function set(type/*:string*/, str/*:string*/)/*:boolean*/ {
	var gp = NSPasteboard.generalPasteboard();
	var tt = mytype(type);
	var t = tt[0], o = tt[1], data;
	gp.clearContents();
	switch(o) {
		case 's':
			return gp.setString_forType(str, t);
	}
	return false;
};

exports.available = function avail()/*:Array<string>*/ {
	const gp = NSPasteboard.generalPasteboard();
	const types = gp.types();
	const out = [];
	const len = types.count();
	for(let i = 0; i < len; ++i) out[i] = objc.js(types.objectAtIndex(i));
	return out;
};
