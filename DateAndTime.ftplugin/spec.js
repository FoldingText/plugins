define(function (require) {
	'use strict';

	describe('Date and time', function () {
		var Editor = require('ft/editor/editor').Editor,
			editor;

		beforeEach(function () {
			editor = new Editor('');
		});

		afterEach(function () {
			editor.removeAndCleanupForCollection();
		});

		it('should insert date', function () {
			editor.performCommand('date');
			expect(editor.textContent()).not.toEqual('');
		});

		it('should insert time', function () {
			editor.performCommand('time');
			expect(editor.textContent()).not.toEqual('');
		});
	});
});