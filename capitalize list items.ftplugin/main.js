//
// This plugin is in response to http://support.foldingtext.com/discussions/suggestions/834-frq-transformations-make-sentence-case
//
define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions').Extensions;

	Extensions.addCommand({
		name: 'capitalize lists',
		description: 'Capitalize each selected list item.',
		performCommand: function (editor) {
			var range = editor.selectedRange(),
				tree = editor.tree(),
				type, text;

			tree.beginUpdates();
			range.forEachNodeInRange(function (node) {
				type = node.type();
				if (type === 'ordered' || type === 'unordered' || type === 'task')	{
					text = node.text();
					node.setText(text.charAt(0).toUpperCase() + text.slice(1));
				}
			});
			tree.endUpdates();
		}
	});
});