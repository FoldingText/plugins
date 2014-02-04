define(function (require) {
	'use strict';

	describe('Date and time', function () {
		var Editor = require('ft/core/editor').Editor,
			editor;

		beforeEach(function () {
			editor = new Editor('');
		});

		afterEach(function () {
			editor.removeAndCleanupForCollection();
		});

		it('should reverse selected text', function () {
			editor.replaceSelection('hello world!');
			editor.performCommand('reverse');
			expect(editor.textContent()).toEqual('!dlrow olleh');
		});
	});
});