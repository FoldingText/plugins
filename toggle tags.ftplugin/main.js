define(function(require, exports, module) {
	exports.editorDidLoad = function editorDidLoad(editor) {
		
		editor.treeController.addCommand('done', 'Toggle @done tag for selected lines.', function(treeController) {
			toggleTag(treeController, 'done');
		});
		
		editor.treeController.addCommand('today', 'Toggle @today tag for selected lines.', function(treeController) {
			toggleTag(treeController, 'today');
		});
		
		// Add more tag commands as needed.
		
		function toggleTag(treeController, tagName) {
			var treeModel = treeController.treeModel,
				undoManager = treeController.undoManager,
				selectedRange = treeController.treeView.selectedRange();
											
			undoManager.beginUndoGrouping();
			treeModel.beginUpdates();
			
			var nodes = selectedRange.nodesInRange();
			var addTag = nodes[0].tag(tagName) === undefined ? true : false;
			var length = nodes.length;
			var i;
			
			for (i = 0; i < length; i++) {
				if (addTag) {
					nodes[i].addTag(tagName);
				} else {
					nodes[i].removeTag(tagName);
				}
			}
			
			treeModel.endUpdates();
			undoManager.endUndoGrouping();
			undoManager.setActionName("Tag " + tagName);
		}
	};
});