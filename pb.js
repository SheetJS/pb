var $ = require('nodobjc');
$.framework('AppKit');

exports.get = function(type) {
	var x = $.NSPasteboard('generalPasteboard'), t;
	if(!type) t = $.NSStringPboardType; 
	else switch(type) {
		case 'HTML': case 'html': t = $.NSHTMLPboardType; break;
		case 'PNG': case 'png': t = $.NSHTMLPboardType; break;
		case 'TEXT': case 'text': t = $.NSStringPboardType; break;
		default: t = $[type];
	}
	return x('stringForType',t)
}
