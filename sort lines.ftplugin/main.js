define(function(require, exports, module) {
	var Extensions = require('ft/core/extensions').Extensions;

	Extensions.addCommand({
		name: 'sort lines',
		description: 'Sort the selected lines of text.',
		performCommand: function (editor) {
			var text = editor.selectedText(),
				sortedText = text.split('\n').sort().join('\n');
			editor.replaceSelection(sortedText, 'around');
		}
	});
});