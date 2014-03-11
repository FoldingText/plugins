/*
 * Alternative word count approach that tracks counts per node. This makes it possible
 * to filter certain node types out of the count, and to exclude trailing tags and other
 * syntax from the count.
 *
 * - This word count ignores words in blockquotes
 * - This word count doesn't yet have a visual display, it's just a coding approach example
 */
define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions'),
		nodeIDsToLastCount = {},
		totalWordCount = 0;

	function updateAndReturnWordCountForNode(node) {
		var text;
		if (node.type() != 'blockquote') {
			text = node.text();
		}

		var match = text ? text.match(/\S+/g) : null,
			newWordCount = match ? match.length : 0;
		nodeIDsToLastCount[node.id] = newWordCount;
		return newWordCount;
	}

	Extensions.add('com.foldingtext.editor.init', function (editor) {
		var each = editor.tree().firstLineNode();
		while (each) {
			totalWordCount += updateAndReturnWordCountForNode(each);
			each = each.nextLineNode();
		}
	});

	Extensions.add('com.foldingtext.editor.treeChange', function (editor, e) {
		var deltas = e.deltas,
			deletasLength = deltas.length;
		for (var i = 0; i < deletasLength; i++) {
			var eachDelta = deltas[i],
				updatedNode = eachDelta.updatedNode,
				removedNodes = eachDelta.removedNodes,
				insertedNodes = eachDelta.insertedNodes;

			if (updatedNode) {
				totalWordCount -= nodeIDsToLastCount[updatedNode.id];
				totalWordCount += updateAndReturnWordCountForNode(updatedNode);
			}

			for (var j = 0; j < removedNodes.length; j++) {
				totalWordCount -= nodeIDsToLastCount[removedNodes[j].id];
				delete nodeIDsToLastCount[removedNodes[j].id];
			}

			for (var k = 0; k < insertedNodes.length; k++) {
				totalWordCount += updateAndReturnWordCountForNode(insertedNodes[k]);
			}
		}
	});
});