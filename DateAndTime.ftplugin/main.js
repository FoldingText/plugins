Extensions.addCommand({
    name: 'date',
    description: 'Insert the current date',
    performCommand: function (editor) {
        editor.replaceSelection(new Date().toLocaleDateString(), 'around');
    }
});

Extensions.addCommand({
    name: 'time',
    description: 'Insert the current time',
    performCommand: function (editor) {
        editor.replaceSelection(new Date().toLocaleTimeString(), 'around');
    }
});

