define(function (require, exports, module) {
    'use strict';

    require('ft/util/parallel');

    var Extensions = require('ft/core/extensions').Extensions,
        element;

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function updateDisplay(editor) {
        if (!element) {
            element = document.createElement('div');
            document.body.insertBefore(element, document.body.firstChild);
        }

        var selectedRange = editor.selectedRange(),
            newInnerHTML;

        if (selectedRange.isCollapsed()) {
            element.className = 'characterCount';
            newInnerHTML = formatNumber(editor.tree().textLength()) + ' Characters<br/>';
        } else {
            element.className = 'characterCount characterCountSelected';
            newInnerHTML = formatNumber(selectedRange.length()) + ' Characters<br/>';
        }

        if (newInnerHTML !== element.innerHTML) {
            element.innerHTML = newInnerHTML;
        }
    }

    Extensions.addInit(function (editor) {
        updateDisplay(editor);
    });

    Extensions.addTreeChanged(function (editor, e) {
        updateDisplay(editor);
    });

    Extensions.addSelectionDidChange(function (editor) {
        updateDisplay(editor);
    });

    /*jshint multistr:true */
    Extensions.add('com.foldingtext.editor.styles',
        '.characterCount {\
            pointer-events: none;\
            position: fixed;\
            top: 0.5rem;\
            right: 1.5rem;\
            color: @secondaryTextColor;\
            z-index: 100;\
            background-color: fadeout(@paperColor, 20%);\
            padding: 5px;\
            border-radius: 3px;\
        }\
        .characterCountSelected {\
            color: @secondaryTextColor;\
        }'
    );
    /*jshint multistr:false */

});
