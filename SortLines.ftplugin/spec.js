define(function (require) {
	'use strict';

	describe('Sort Lines', function () {
		var Editor = require('ft/editor/editor').Editor,
			editor;

		beforeEach(function () {
			editor = new Editor('');
		});

		afterEach(function () {
			editor.removeAndCleanupForCollection();
		});

		it('should sort selected text line', function () {
			editor.replaceSelection('c\na\nb', 'around');
			editor.performCommand('sort lines');
			expect(editor.textContent()).toEqual('a\nb\nc');
		});
	});
});