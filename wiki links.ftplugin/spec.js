define(function (require) {
	'use strict';

	describe('Wiki Links', function () {
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

		it('should find wiki links tags', function () {
			editor.setTextContent('hello [[world]]');
			editor.tree().ensureClassified();
			expect(editor.tree().firstLineNode().lineAttributedString().toString()).toEqual('(hello /text)([[/keyword, text, wikilink)(world/linktarget, text, wikilink)(]]/keyword, text, wikilink)');
		});
	});
});