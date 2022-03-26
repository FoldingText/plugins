//
// Demo plugin showing how to add a keybinding
//
Extensions.addInit(function (editor) {
	editor.addKeyMap({
		'Ctrl-A' : function (editor) {
			editor.replaceSelection('â');
		}
	});
}, Extensions.PriorityLast);
