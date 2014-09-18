//
// http://support.foldingtext.com/t/plugin-for-write-or-it-will-be-erased-mode/520
//
define(function(require, exports, module) {
	'use strict';

	var Extensions = require('ft/core/extensions').Extensions,
		isSpeedUp,
		timeoutID,
		ignore;

	Extensions.addTreeChanged(function (editor, e) {
		if (!editor.option('speedUp')) {
			return;
		}

		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		if (!ignore) {
			timeoutID = setTimeout(function() {
				if (!editor.option('speedUp')) {
					return;
				}
				ignore = true;
				editor.setTextContent('SPEED UP!\n- To get your work back UNDO!\n- To stop this crazyness Edit > Run Command > End Speed Up!');
				ignore = false;
			}, 5000);
		}
	});

	Extensions.addCommand({
		name: 'begin speed up',
		description: 'Begin "Speed Up!" session',
		performCommand: function (editor) {
			editor.setOption('speedUp', true);
		}
	});

	Extensions.addCommand({
		name: 'end speed up',
		description: 'End "Speed Up!" session',
		performCommand: function (editor) {
			editor.setOption('speedUp', false);
		}
	});	
});