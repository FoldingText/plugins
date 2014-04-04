define(function (require) {
	'use strict';

	describe('Toggle Tags', function () {
		var MarkdownTaxonomy = require('ft/taxonomy/markdowntaxonomy').MarkdownTaxonomy,
			Taxonomies = require('ft/core/taxonomies'),
			Editor = require('ft/editor/editor').Editor,
			taxonomy = Taxonomies.taxonomy({
				foldingtext: true,
				multimarkdown: true,
				gitmarkdown: true,
				criticMarkup: true
			}, 'markdown'),
			editor;

		beforeEach(function () {
			editor = new Editor('', taxonomy);
		});

		afterEach(function () {
			editor.removeAndCleanupForCollection();
		});

		it('should toggle tags', function () {
			editor.setTextContent('hello');
			editor.performCommand('toggleToday');
			expect(editor.textContent()).toEqual('hello @today');
			editor.performCommand('toggleToday');
			expect(editor.textContent()).toEqual('hello');
		});
	});
});