define(function (require) {
	'use strict';

	describe('Reverse Text', function () {
		var Editor = require('ft/editor/editor').Editor,
			editor;

		beforeEach(function () {
			editor = new Editor('');
		});

		afterEach(function () {
			editor.removeAndCleanupForCollection();
		});

		it('should reverse selected text', function () {
			editor.replaceSelection('hello world!', 'around');
			editor.performCommand('reverse');
			expect(editor.textContent()).toEqual('!dlrow olleh');
		});
	});
});