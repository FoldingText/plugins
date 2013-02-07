define(function(require, exports, module) {
	exports.editorDidLoad = function editorDidLoad(editor) {
		editor.treeController.addCommand('toggle empty lines', 'Toggle between no empty lines and every other line empty.', function(treeController) {
			var treeModel = treeController.treeModel,
				undoManager = treeController.undoManager,
				emptyLines = treeModel.evaluateNodePath('//@type empty');
											
			undoManager.beginUndoGrouping();
			treeModel.beginUpdates();
			
			if (emptyLines.count > 0) {
				if (treeModel.linesLength() > emptyLines.count) {
					treeModel.removeNodes(emptyLines.nodesInLineOrder());					
				}
			} else {
				var each = treeModel.lineNumberToNode(1);
				while (each) {
					treeModel.insertNodeBefore(treeModel.createNode(''), each);
					each = each.nextLineNode();					
				}				
			}
			
			treeModel.endUpdates();
			undoManager.endUndoGrouping();
			undoManager.setActionName("Toggle Empty Lines");
		});
	};
});