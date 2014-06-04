define(function(require, exports, module) {
	var Extensions = require('ft/core/extensions').Extensions;

	Extensions.addCommand({
		name: 'run script',
		description: 'Run the selected text as a javascript function.',
		performCommand: function (editor) {
			var script = editor.selectedText(),
				result;

			try {
				var wrappedScript = '(' + script + ')';
				result = eval(wrappedScript);
				if (typeof(result) == "function") {
					result = result(editor);
				}
			} catch (e) {
				result = e.toString();
			}

			var range = editor.selectedRange().rangeByCollapsing();
			editor.setSelectedRange(range);
			editor.replaceSelection(result + '', 'around');

			return result;
		}
	});
});