//
// This plugin is in response to 
//
var wikiLinkRE = /\[\[(.*?)\]\]/g;

Extensions.add('com.foldingtext.taxonomy.classifier', {
    classify: function (text, state, previousState) {
        var escapedText = text.escapedText(),
            match;

        if (escapedText.indexOf(']]') === -1) {
            return;
        }

        while ((match = wikiLinkRE.exec(escapedText))) {
            var linkText = match[0],
                linktarget = 'nv://' + encodeURI(match[1]);

            text.addAttributeInRange('keyword', '[[', match.index, 2);
            text.addAttributeInRange('wikilink', linkText, match.index, linkText.length);
            text.addAttributeInRange('linktarget', linktarget, match.index + 2, linkText.length - 4);
            text.addAttributeInRange('keyword', ']]', match.index + linkText.length - 2, 2);
        }
    },
    attributesToClear: ['wikilink']
});
