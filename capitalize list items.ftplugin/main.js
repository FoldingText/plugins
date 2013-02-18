//
// This plugin is in response to http://support.foldingtext.com/discussions/suggestions/834-frq-transformations-make-sentence-case
//
define(function(require, exports, module) {
	exports.editorDidLoad = function editorDidLoad(editor) {
		
		editor.treeController.addCommand('capitalize lists', 'Capitalize the first character in each selected list item.', function(treeController) {
			var treeView = treeController.treeView,
				treeModel = treeController.treeModel,
				undoManager = treeController.undoManager,
				selectedRange = treeView.selectedRange(),
				selectedNodes = selectedRange.nodesInRange(),
				length = selectedNodes.length;

			undoManager.beginUndoGrouping();
			treeView.beginUpdates();

			for (var i = 0; i < length; i++) {
				var each = selectedNodes[i];
				var type = each.type();
				if (type === 'ordered' || type === 'unordered')	{
					var text = each.text();
					each.setText(text.charAt(0).toUpperCase() + text.slice(1));
				}
			}
			
			treeView.endUpdates();
			undoManager.endUndoGrouping();
			undoManager.setActionName("Sort");
		});
		
	};
});