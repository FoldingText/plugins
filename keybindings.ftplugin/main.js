//
// Demo plugin showing how to add a keybinding
//
define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions').Extensions;

	Extensions.addInit(function (editor) {
		editor.addKeyMap({
			'Ctrl-A' : function (editor) {
				editor.replaceSelection('â');
			}
		});
	}, Extensions.PriorityLast);
});