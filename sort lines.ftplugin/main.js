define(function(require, exports, module) {
	Extensions = require('ft/core/extensions');

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'sort lines',
		description: 'Sort the selected lines of text.',
		performCommand: function (editor) {
			var text = editor.selectedText(),
				sortedText = text.split('\n').sort().join('\n');
			editor.replaceSelection(sortedText, 'around');
		}
	});
});