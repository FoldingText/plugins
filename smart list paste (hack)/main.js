//
// This plugin uses a lot of undocumented API and should not be expected
// to work in future versions of FoldingText. It's purpose is to provide a
// workaround and starting point for a better solution to this request:
//
// http://support.foldingtext.com/discussions/suggestions/816-pasting-a-list-item-should-be-smarter-ie-no-extra-dash
//
define(function(require, exports, module) {
	var TreeModel = require("editor/tree_model").TreeModel;
	
	exports.editorDidLoad = function editorDidLoad(editor) {
		editor.treeController.viewPaste = function viewPaste(e) {
			var treeView = this.treeView;
			var treeModel = this.treeModel;
			var text = e.clipboardData.getData("Text");
			if (text) {
				text = TreeModel.stringByNormalizingLineEndings(text);

				var selectedRanges = treeView.selectedRanges();

				// Begin override default behavior
				if (selectedRanges.length === 1 && selectedRanges[0].length() === 0) {
					var selectedRange = selectedRanges[0];
					var beforePaste = selectedRange.startNode.line().substring(0, selectedRange.startOffset);
					if (beforePaste.hasSuffix('- ')) {
						if (text.hasPrefix('- ')) {
							text = text.substring(2);
						}
					}
				}
				// End override default behavior
				
				if (this.viewShouldInsertTextGivenAction(text, null, selectedRanges)) {
					treeView.beginUpdates();
					this.breakUndoCoalescing();
					this.insertTextGivenAction(text, null, selectedRanges);
					treeView.scrollRangeToVisible(treeView.selectedRange());
					this.undoManager.setActionName("Paste");
					treeView.endUpdates();
				}
			}
			e.preventDefault();
			return true;
		};
	};
});