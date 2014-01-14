define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions'),
		DateUtils = require('ft/util/date');

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'date',
		description: 'Insert the current date',
		performCommand: function (editor) {
			editor.replaceSelection(new Date().format('shortDate'));
		}
	});

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'time',
		description: 'Insert the current time',
		performCommand: function (editor) {
			editor.replaceSelection(new Date().format('shortTime'));
		}
	});

});