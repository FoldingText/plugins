Extensions.addCommand({
    name: 'ReverseText',
    description: 'Reverse the selected text.',
    performCommand: (editor) => {
        var text = editor.selectedText(),
            reverseText = text.split('').reverse().join('');
        editor.replaceSelection(reverseText, 'around');
    }
});
