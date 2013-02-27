define(function(require, exports, module) {
	exports.editorDidLoad = function editorDidLoad(editor) {
		
		editor.treeController.addCommand('reverse text', 'Reverse the selected text.', function(treeController) {
			var treeView = treeController.treeView,
				treeModel = treeController.treeModel,
				selectedRange = treeView.selectedRange(),
				selectionLocation = selectedRange.location(),
				selectedText = selectedRange.textInRange(),
				reversedText = selectedText.split("").reverse().join("");

			treeView.beginUpdates();
			treeModel.replaceTextInRange(reversedText, selectedRange);
			treeView.setSelectedRange(treeModel.createRangeFromLocation(selectionLocation, reversedText.length));
			treeController.undoManager.setActionName("Reverse");
			treeView.endUpdates();
		});
		
	};
});