/**
 * The DOM element parts of this plugins are probalby not the best approach,
 * and will probably change in the future. But for now this shows how to register
 * for tree changes and do something as a result.
 */
define(function(require, exports, module) {
	exports.editorDidLoad = function editorDidLoad(editor) {
		
		var element;
		var count;

		function treeChanged(e) {
			var textDeltas = e.textDeltas;
			var length = textDeltas.length;

			for (var i = 0; i < length; i++) {
				count += textDeltas[i].changeInLength();
			}

			element.innerText = count;
		}

		editor.treeController.addCommand('character count', 'Display character count.', function(treeController) {
			var treeModel = treeController.treeModel;

			if (element) {
				treeModel.removeEventListener('treeChanged', treeChanged);
				element.parentNode.removeChild(element);
				element = null;
			} else {
				count = treeModel.textLength();
				element = document.createElement('div');
				element.style.position = 'fixed';
				element.innerText = count;
				document.body.appendChild(element);
				treeModel.addEventListener('treeChanged', treeChanged);
			}
		});
		
	};
});