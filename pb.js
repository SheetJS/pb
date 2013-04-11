var $ = require('nodobjc');
$.framework('AppKit');

var mytype = exports.mytype = function(type) {
	if(!type) return [$.NSStringPboardType, 's']; 
	switch(type) {
		case 'HTML': case 'html': return [$.NSHTMLPboardType, 's'];
		case 'PNG': case 'png': return [$.NSHTMLPboardType, 'i'];
		case 'TEXT': case 'text': return [$.NSStringPboardType, 's'];
	}
	return [$[type], 's'];
}

exports.get = function(type) {
	var x = $.NSPasteboard('generalPasteboard');
	var tt = mytype(type);
	var t = tt[0], o = tt[1];

	switch(o) {
		case 's': return x('stringForType',t);
		case 'i': {
			var y = $.NSImage('alloc')('initWithPasteboard', x)
		}
	}
}

exports.set = function(type, str) {
	var x = $.NSPasteboard('generalPasteboard');
	var tt = mytype(type);
	var t = tt[0], o = tt[1], data;
	x('clearContents');
	switch(o) {
		case 's':
			data = $.NSString('stringWithUTF8String', str);
			return x('setString', data, 'forType', t);
	}
}
