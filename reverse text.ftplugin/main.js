define(function(require, exports, module) {
	var Extensions = require('ft/core/extensions').Extensions;

	Extensions.addCommand({
		name: 'reverse',
		description: 'Reverse the selected text.',
		performCommand: function (editor) {
			var text = editor.selectedText(),
				reverseText = text.split('').reverse().join('');
			editor.replaceSelection(reverseText, 'around');
		}
	});
});