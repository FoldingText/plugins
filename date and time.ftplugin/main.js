define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions').Extensions,
		DateUtils = require('ft/util/date');

	Extensions.addCommand({
		name: 'date',
		description: 'Insert the current date',
		performCommand: function (editor) {
			editor.replaceSelection(new Date().format('mediumDate'), 'around');
		}
	});

	Extensions.addCommand({
		name: 'time',
		description: 'Insert the current time',
		performCommand: function (editor) {
			editor.replaceSelection(new Date().format('shortTime'), 'around');
		}
	});

});