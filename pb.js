/* pb.js -- (C) 2013-2015 SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*jshint node:true */
var $ = require('nodobj'+'c');
$.framework('AppKit');
$.NSAutoreleasePool('alloc')('init');

var basetypes = [ 'HTML', 'PNG', 'TEXT' ];
var alltypes;

var mytype = exports.mytype = function mytype(type/*:string*/)/*:Array<any>*/ {
	if(!type) return [$.NSStringPboardType, 's'];
	switch(type.toUpperCase()) {
		case 'HTML': return [$.NSHTMLPboardType, 's'];
		case 'PNG': return [$.NSHTMLPboardType, 'i'];
		case 'TEXT': return [$.NSStringPboardType, 's'];
	}
	return [$[type], 's'];
};

exports.gettypes = function gettypes()/*:Array<any>*/ {
	if(!alltypes) {
		var filterfunc = function(x) { return x.match(/^NS.*PboardType$/); };
		var nstypes = Object.keys($).filter(filterfunc);
		alltypes = basetypes.concat(nstypes);
	}
	return alltypes;
};

exports.version = '0.3.0';

exports.get = function get(type/*:string*/)/*:any*/ {
	var x = $.NSPasteboard('generalPasteboard');
	var tt = mytype(type);
	var t = tt[0], o = tt[1];

	switch(o) {
		case 's': return x('stringForType',t);
		case 'i': {
			var y = $.NSImage('alloc')('initWithPasteboard', x);
			return y;
		}
	}
};

exports.set = function set(type/*:string*/, str/*:string*/)/*:void*/ {
	var x = $.NSPasteboard('generalPasteboard');
	var tt = mytype(type);
	var t = tt[0], o = tt[1], data;
	x('clearContents');
	switch(o) {
		case 's':
			data = $.NSString('stringWithUTF8String', str);
			return x('setString', data, 'forType', t);
	}
};
