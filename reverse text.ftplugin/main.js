define(function(require, exports, module) {
	Extensions = require('ft/core/extensions');

	Extensions.add('com.foldingtext.editor.commands', {
		name: 'reverse',
		description: 'Reverse the selected text.',
		performCommand: function (editor) {
			var text = editor.selectedText(),
				reverseText = text.split('').reverse().join('');
			editor.replaceSelection(reverseText, 'around');
		}
	});
});