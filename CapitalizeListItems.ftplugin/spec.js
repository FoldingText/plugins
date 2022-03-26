define(function (require) {
	'use strict';

	describe('Capitalize List Items', function () {
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

		it('should capitlize each list item', function () {
			editor.setTextContent('line\n\n- one\n- two');
			editor.tree().ensureClassified();
			editor.performCommand('selectAll');
			editor.performCommand('capitalize lists');
			expect(editor.textContent()).toEqual('line\n\n- One\n- Two');
		});
	});
});