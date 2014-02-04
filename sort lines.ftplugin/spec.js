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

		it('should sort selected text line', function () {
			editor.replaceSelection('c\na\nb');
			editor.performCommand('sort lines');
			expect(editor.textContent()).toEqual('a\nb\nc');
		});
	});
});