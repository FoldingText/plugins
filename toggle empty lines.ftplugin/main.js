define(function(require, exports, module) {
	var Extensions = require('ft/core/extensions').Extensions;

	Extensions.addCommand({
		name: 'toggle empty lines',
		description: 'Toggle between no empty lines and every other line empty.',
		performCommand: function (editor) {
			var tree = editor.tree(),
				emptyLines = tree.evaluateNodePath('//@type empty');

			tree.beginUpdates();
			if (emptyLines.length > 0) {
				tree.removeNodes(emptyLines);
			} else if (tree.nodeCount() > 1) {
				var each = tree.firstLineNode().nextLineNode();
				while (each) {
					tree.insertNodeBefore(tree.createNode(''), each);
					each = each.nextLineNode();
				}
			}
			tree.endUpdates();
		}
	});
});