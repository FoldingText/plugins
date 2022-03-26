define(function (require) {
	'use strict';

	describe('Run Script', function () {
		var Editor = require('ft/editor/editor').Editor,
			editor;

		beforeEach(function () {
			editor = new Editor('');
		});

		afterEach(function () {
			editor.removeAndCleanupForCollection();
		});

		it('should run script', function () {
			editor.replaceSelection('1 + 2', 'around');
			expect(editor.performCommand('run script')).toEqual(3);
		});

		it('should run script function', function () {
			editor.replaceSelection('function(editor) { return editor.selectedText() }', 'around');
			expect(editor.performCommand('run script')).toEqual(editor.selectedText());
		});
	});
});