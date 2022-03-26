Extensions.addCommand({
    name: 'toggleDone',
    keymap: 'Cmd-D',
    description: 'Toggle @done tag for selected lines.',
    performCommand: (editor)  => {
        editor.toggleTag('done', new Date().toISOString().substr(0, 10));
    }
});

Extensions.addCommand({
    name: 'toggleToday',
    keymap: 'Cmd-T',
    description: 'Toggle @today tag for selected lines.',
    performCommand: (editor) => {
        editor.toggleTag('today');
    }
});

Extensions.addCommand({
    name: 'toggleError',
    keymap: 'Shift-Cmd-E',
    description: 'Toggle @error tag for selected lines.',
    performCommand: (editor) => {
        editor.toggleTag('error');
    }
});

Extensions.addCommand({
    name: 'toggleMonthly',
    keymap: 'Shift-Cmd-M',
    description: 'Toggle @monthly tag for selected lines.',
    performCommand: (editor) => {
        editor.toggleTag('monthly');
    }
});

Extensions.addCommand({
    name: 'toggleCCMB',
    keymap: 'Ctrl-C',
    description: 'Toggle @ccmb tag for selected lines.',
    performCommand: (editor) => {
        editor.toggleTag('ccmb');
    }
});

Extensions.addCommand({
    name: 'toggleUSMC',
    keymap: 'Shift-Cmd-U',
    description: 'Toggle @usmc tag for selected lines.',
    performCommand: (editor) => {
        editor.toggleTag('usmc');
    }
});

Extensions.addCommand({
    name: 'newday',
    description: 'Insert the current date and make it a day formatted as needed',
    keymap: 'Shift-Cmd-N',
    performCommand: (editor) => {
        var today = new Date().toLocaleDateString(),
            str   = "# **" + today + "** @day";
            editor.replaceSelection(str, 'end');
    }
});

Extensions.addKeyMap({
    'Shift-Cmd-T': 'setTheme',
});

