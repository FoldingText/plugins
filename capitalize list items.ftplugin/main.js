//
// This plugin is in response to http://support.foldingtext.com/discussions/suggestions/834-frq-transformations-make-sentence-case
//
define(function(require, exports, module) {
	Extensions = require('ft/core/extensions');

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'capitalize lists',
		description: 'Capitalize the first character in each selected list item.',
		performCommand: function (editor) {
			var range = editor.getSelectedRange(),
				tree = editor.tree(),
				type, text;

			tree.beginUpdates();
			range.forEachLineInRange(function (node) {
				type = node.type();
				if (type === 'ordered' || type === 'unordered')	{
					text = node.text();
					node.setText(text.charAt(0).toUpperCase() + text.slice(1));
				}
			});
			tree.endUpdates();
		}
	});
});