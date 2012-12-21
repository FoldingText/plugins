define(function(require, exports, module) {
	exports.editorDidLoad = function editorDidLoad(editor) {
		
		editor.treeController.addCommand('sort', 'Sort the selected lines of text.', function(treeController) {
			var treeView = treeController.treeView,
				treeModel = treeController.treeModel,
				selectedRange = treeView.selectedRange(),
				selectedParagraphRange = selectedRange.rangeByExtendingToParagraph(),
				selectionLocation = selectedParagraphRange.location(),
				sortedText = selectedParagraphRange.linesInRange().sort().join('\n');
			
			treeView.beginUpdates();
			treeModel.replaceTextInRange(sortedText, selectedParagraphRange);
			treeView.setSelectedRange(treeModel.createRangeFromLocation(selectionLocation, sortedText.length));
			treeController.undoManager.setActionName("Sort");
			treeView.endUpdates();
		});
		
	};
});