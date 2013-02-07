/**
 * The DOM element parts of this plugins are probalby not the best approach,
 * and will probably change in the future. But for now this shows how to register
 * for tree changes and do something as a result.
 */
define(function(require, exports, module) {
	exports.editorDidLoad = function editorDidLoad(editor) {
		
		var element;
		var lineCount;
		var wordCount;
		var charCount;

		function updateDisplay() {
			if (!element) {
				element = document.createElement('div');
				element.style.position = 'fixed';
				element.style.bottom = '0.5rem';
				element.style.right = '0.5rem';
				element.style.opacity = '.5';
				document.body.appendChild(element);	
			}
			
			var newInnerHTML =
				charCount + ' chars<br/>' +
				wordCount + ' words<br/>' +
				lineCount + ' lines';
				
			if (newInnerHTML !== element.innerHTML) {
				element.innerHTML = newInnerHTML;
			}
		}

		function updateNodeWordCount(node) {
			var match = node.line().match(/\S+/g);
			var eachWordCount = match ? match.length : 0;
			node.setUserData('com.foldingtext.wordcount', eachWordCount);
			return eachWordCount;
		}

		function treeChanged(e) {
			// Update Character Count
			var textDeltas = e.textDeltas;
			var length = textDeltas.length;
			for (var i = 0; i < length; i++) {
				charCount += textDeltas[i].changeInLength();
			}
						
			// Update Word Count
			var insertedNodes = e.insertedNodes;
			var updatedNodes = e.updatedNodes;
			var removedNodes = e.removedNodes;
			
			removedNodes.forEachNodeInSet(function(eachNode) {
				wordCount -= eachNode.userData('com.foldingtext.wordcount');
			});

			insertedNodes.forEachNodeInSet(function(eachNode) {
				wordCount += updateNodeWordCount(eachNode);
			});

			updatedNodes.forEachNodeInSet(function(eachNode) {
				var oldCount = eachNode.userData('com.foldingtext.wordcount');
				var newCount = updateNodeWordCount(eachNode);
				wordCount += (newCount - oldCount);
			});

			// Update Line Count
			lineCount += insertedNodes.count;
			lineCount -= removedNodes.count;

			updateDisplay();
		}

		editor.treeController.addCommand('word count', 'Display character, word, and line counts.', function(treeController) {
			var treeModel = treeController.treeModel;

			if (element) {
				treeModel.removeEventListener('treeChanged', treeChanged);
				element.parentNode.removeChild(element);
				element = null;
			} else {
				charCount = treeModel.textLength();
				wordCount = 0;
				treeModel.evaluateNodePath(null).forEachNodeInSet(function(eachNode) {
					wordCount += updateNodeWordCount(eachNode);
				});
				lineCount = treeModel.linesLength();
				updateDisplay();
				treeModel.addEventListener('treeChanged', treeChanged);
			}
		});	
	};
});