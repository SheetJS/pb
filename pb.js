/* pb.js -- (C) 2013-present  SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*jshint node:true */
var $ = require('nodobjc');
$.framework('AppKit');
$.NSAutoreleasePool('alloc')('init');

exports.version = '0.3.2';

var basetypes = [ 'HTML', 'PNG', 'TEXT', 'RTF' ];
var alltypes;

var mytype = exports.mytype = function mytype(type/*:string*/)/*:Array<any>*/ {
	if(!type) return [$.NSStringPboardType, 's'];
	switch(type.toUpperCase()) {
		case 'HTML': return [$.NSHTMLPboardType,        's'];
		case 'PNG':  return [$.NSHTMLPboardType,        'i'];
		case 'TEXT': return [$.NSStringPboardType,      's'];
		case 'RTF':  return [$.NSRTFPboardType,         's'];
	}
	return [$[type], 's'];
};

var filterfunc = function(x/*:string*/)/*:boolean*/ { return !!(x.match(/^NS.*PboardType$/)); };
exports.gettypes = function gettypes()/*:Array<any>*/ {
	if(!alltypes) {
		var nstypes = Object.keys($).filter(filterfunc);
		alltypes = basetypes.concat(nstypes);
	}
	return alltypes;
};

exports.get = function get(type/*:string*/)/*:any*/ {
	var x = $.NSPasteboard('generalPasteboard');
	var tt = mytype(type);
	var t = tt[0], o = tt[1];

	switch(o) {
		case 's': return String(x('stringForType',t));
		case 'i': {
			var y = $.NSImage('alloc')('initWithPasteboard', x);
			return y;
		}
	}
};

exports.set = function set(type/*:string*/, str/*:string*/)/*:boolean*/ {
	var x = $.NSPasteboard('generalPasteboard');
	var tt = mytype(type);
	var t = tt[0], o = tt[1], data;
	x('clearContents');
	switch(o) {
		case 's':
			data = $.NSString('stringWithUTF8String', str);
			return x('setString', data, 'forType', t);
	}
	return false;
};

function NSArray2ArrayStr(arr)/*:Array<string>*/ {
	var out/*:Array<string>*/ = [];
	var len = arr('count');
	for(var i = 0; i < len; ++i) out[i] = arr('objectAtIndex', i).toString();
	return out;
}

exports.available = function avail()/*:Array<string>*/ {
	var x = $.NSPasteboard('generalPasteboard');
	return NSArray2ArrayStr(x('types'));
};
