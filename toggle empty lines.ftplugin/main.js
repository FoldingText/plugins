define(function(require, exports, module) {
	Extensions = require('ft/core/extensions');

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'toggle empty lines',
		description: 'Toggle between no empty lines and every other line empty.',
		performCommand: function (editor) {
			var tree = editor.tree(),
				emptyLines = tree.evaluateNodePath('//@type empty');

			tree.beginUpdates();
			if (emptyLines.length > 0) {
				tree.removeNodes(emptyLines);
			} else {
				var each = tree.firstLineNode();
				while (each) {
					tree.insertNodeBefore(tree.createNode(''), each);
					each = each.nextLineNode();
				}
			}
			tree.endUpdates();
		}
	});
});