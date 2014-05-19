define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions').Extensions,
		DateUtils = require('ft/util/date');

	function toggleTag(editor, tagName, tagValue) {
		var tree = editor.tree(),
			range = editor.selectedRange(),
			addTag;

		tree.beginUpdates();
		range.forEachNodeInRange(function (node) {
			if (addTag === undefined) {
				addTag = node.tag(tagName) === undefined ? true : false;
			}

			if (addTag) {
				node.addTag(tagName, tagValue);
			} else {
				node.removeTag(tagName);
			}
		});
		tree.endUpdates();
	}

	Extensions.addCommand({
		name: 'toggleDone',
		description: 'Toggle @done tag for selected lines.',
		performCommand: function (editor) {
			toggleTag(editor, 'done', new Date().format('isoDate'));
		}
	});

	Extensions.addCommand({
		name: 'toggleToday',
		description: 'Toggle @today tag for selected lines.',
		performCommand: function (editor) {
			toggleTag(editor, 'today');
		}
	});

	Extensions.addInit(function (editor) {
		editor.addKeyMap({
			'Cmd-D' : 'toggleDone',
			'Cmd-T' : 'toggleToday',
		});
	});
});