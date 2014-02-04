define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions'),
		DateUtils = require('ft/util/date');

	function toggleTag(editor, tagName, tagValue) {
		var tree = editor.tree(),
			range = editor.selectedRange(),
			addTag;

		tree.beginUpdates();
		range.forEachLineInRange(function (node) {
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

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'done',
		description: 'Toggle @done tag for selected lines.',
		performCommand: function (editor) {
			toggleTag(editor, 'done', new Date().format('isoDate'));
		}
	});

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'today',
		description: 'Toggle @today tag for selected lines.',
		performCommand: function (editor) {
			toggleTag(editor, 'today');
		}
	});

	Extensions.add('com.foldingtext.editor.init', function (editor) {
		editor.addKeyMap({
			'Cmd-D' : 'done',
			'Cmd-T' : 'today',
		});
	});
});