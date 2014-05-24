/**
 * Alternative word count approach that tracks counts per node. This makes it possible
 * to filter certain node types out of the count, and to exclude trailing tags and other
 * syntax from the count.
 */
define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions').Extensions,
		nodeIDsToLastCount = {},
		totalWordCount = 0,
		element;

	function updateDisplay(editor) {
		if (!element) {
			element = document.createElement('div');
			element.className = 'filteringWordCount';
			document.body.appendChild(element);
		}

		var newInnerHTML = totalWordCount + ' Words<br/>';
		if (newInnerHTML !== element.innerHTML) {
			element.innerHTML = newInnerHTML;
		}
	}

	function updateAndReturnWordCountForNode(node) {
		var text;
		if (node.type() !== 'blockquote') {
			text = node.text();
		}

		var match = text ? text.match(/\S+/g) : null,
			newWordCount = match ? match.length : 0;
		nodeIDsToLastCount[node.id] = newWordCount;
		return newWordCount;
	}

	Extensions.addInit(function (editor) {
		var each = editor.tree().firstLineNode();
		while (each) {
			totalWordCount += updateAndReturnWordCountForNode(each);
			each = each.nextLineNode();
		}
	});

	Extensions.addTreeChanged(function (editor, e) {
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

		updateDisplay(editor);
	});

	/*jshint multistr:true */
	Extensions.add('com.foldingtext.editor.styles',
		'.filteringWordCount {\
			pointer-events: none;\
			position: fixed;\
			bottom: 0.5rem;\
			left: 0.5rem;\
			color: @secondaryTextColor;\
		}'
	);
	/*jshint multistr:false */
});