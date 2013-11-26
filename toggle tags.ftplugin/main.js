define(function(require, exports, module) {
	Extensions = require('ft/core/extensions');

	function toggleTag(editor, tagName) {
		var tree = editor.tree(),
			range = editor.getSelectedRange(),
			addTag;

		tree.beginUpdates();
		range.forEachLineInRange(function (node) {
			if (addTag === undefined) {
				addTag = node.tag(tagName) === undefined ? true : false;
			}

			if (addTag) {
				node.addTag(tagName);
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
			toggleTag(editor, 'done');
		}
	});

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'today',
		description: 'Toggle @today tag for selected lines.',
		performCommand: function (editor) {
			toggleTag(editor, 'today');
		}
	});
});