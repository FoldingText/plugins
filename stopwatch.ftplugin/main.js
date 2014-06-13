define(function (require, exports, module) {
	'use strict';

	var AmountHelper = require('ft/taxonomy/helpers/amounthelper'),
		Extensions = require('ft/core/extensions').Extensions,
		NodeSet = require('ft/core/nodeset').NodeSet,
		DateUtils = require('ft/util/date'),
		currentDate = new Date(),
		stopwatchs = new NodeSet();

	Extensions.addMode({
		name: 'stopwatch'
	});

	function start(editor, node) {
		node.setPropertyNodeValue('Start', currentDate.format('mmm d, yyyy h:MM:ss TT'));
	}

	function stop(editor, node) {
		var tree = editor.tree(),
			startDate = getStartDate(node),
			startPropertyNode = node.propertyNode('start'),
			duration = formatDuration((currentDate.valueOf() - startDate.valueOf()) / 1000);

		tree.beginUpdates();
		node.insertChildBefore(tree.createNode('- ' + duration), startPropertyNode);
		startPropertyNode.removeFromParent();
		tree.endUpdates();
	}

	function getStartDate(node) {
		var startPropertyNode = node.propertyNode('start');
		if (startPropertyNode) {
			var value = startPropertyNode.tags().value;
			if (value) {
				return new Date(value);
			}
		}
		return undefined;
	}

	function formatDuration(duration, shortFormat) {
		var hours = Math.floor(duration / 3600),
			minutes = Math.floor((duration - (hours * 3600)) / 60),
			seconds = Math.ceil(duration - (hours * 3600) - (minutes * 60)),
			result = [];

		if (hours) {
			if (shortFormat) {
				result.push(hours + 'h');
			} else {
				result.push(hours + ' hours');
			}
		}
		if (minutes) {
			if (shortFormat) {
				result.push(minutes + 'm');
			} else {
				result.push(minutes + ' minutes');
			}
		}
		if (seconds) {
			if (shortFormat) {
				result.push(seconds + 's');
			} else {
				result.push(seconds + ' seconds');
			}
		}

		return result.join(' ');
	}

	Extensions.addRenderNode(function (editor, node, nodeRenderer) {
		if (node.mode() === 'stopwatch') {
			var widget = document.createElement('div'),
				button = document.createElement('span'),
				label = document.createElement('span'),
				startDate = getStartDate(node),
				duration = 0;

			widget.className = 'cm-' + 'stopwatch' + '-renderwidget';
			button.className = 'button';
			label.className = 'label';

			widget.appendChild(label);
			widget.appendChild(button);

			if (startDate) {
				widget.className += ' running';
				duration = (currentDate.valueOf() - startDate.valueOf()) / 1000;
			} else {
				node.children().forEach(function (each) {
					if (each.tags().duration) {
						duration += each.tags().duration;
					}
				});
			}

			if (duration) {
				label.textContent = formatDuration(duration, true) + '\xA0';
			}

			button.addEventListener('mousedown', function (e) {
				e.preventDefault();
			});

			button.addEventListener('mouseup', function (e) {
				e.preventDefault();
				editor.tree().ensureClassified();
				if (getStartDate(node)) {
					stop(editor, node);
				} else {
					start(editor, node);
				}
			});

			nodeRenderer.renderLineWidget(widget, {
				overlay : true,
				positionWidget : function (widgetWidth, widgetHeight) {
					var line = node.lineNumber(),
						leadingSpace = node.line().match(/\s*/)[0],
						coords = editor.cursorCoords({ line : line, ch : leadingSpace.length}, 'div');
					return {
						left: Math.round(coords.left - (widgetWidth + editor.defaultSpaceWidth())) + 'px'
					};
				}
			});
		}
	});

	Extensions.addTreeChanged(function (editor, e) {
		var deltas = e.deltas;
		for (var i = 0; i < deltas.length; i++) {
			var insertedNodes = deltas[i].insertedNodes,
				removedNodes = deltas[i].removedNodes,
				updatedNode = deltas[i].updatedNode,
				parent,
				each,
				j;

			length = removedNodes.length;
			for (j = 0; j < length; j++) {
				each = removedNodes[j];
				var previousParent = e.previousParent(each);
				if (previousParent && previousParent.mode() === 'stopwatch') {
					editor.setNeedsRender(previousParent);
				}
			}

			length = insertedNodes.length;
			for (j = 0; j < length; j++) {
				each = insertedNodes[j];
				if (each.mode() === 'stopwatch') {
					stopwatchs.addNode(each);
				} else {
					parent = each.parent;
					if (parent && parent.mode() === 'stopwatch') {
						editor.setNeedsRender(parent);
					}
				}
			}

			if (updatedNode) {
				if (updatedNode.mode() === 'stopwatch') {
					stopwatchs.addNode(updatedNode);
				} else {
					parent = updatedNode.parent;
					if (parent && parent.mode() === 'stopwatch') {
						editor.setNeedsRender(parent);
					}
				}
			}
		}
	});

	Extensions.add('com.foldingtext.taxonomy.classifier', {
		classify: function (text, state, previousState) {
			if (state.type === 'unordered') {
				var modeStack = state.modeStack;
				if (modeStack) {
					var modeRecord = modeStack.lastObject();
					if (!modeRecord || modeRecord.mode !== 'stopwatch') {
						return;
					}
				} else {
					return;
				}

				var duration = AmountHelper.parseDuration(text, state, previousState);
				if (duration) {
					state.tags.duration = duration;
				}
			}
		},
		attributesToClear: [].concat(AmountHelper.attributesToClear)
	});

	Extensions.add('com.foldingtext.editor.clockTick', function (editor, date) {
		currentDate = date;
		stopwatchs.forEachNodeInSet(function (each) {
			if (!each.isTracked || each.mode() !== 'stopwatch') {
				stopwatchs.removeNode(each);
			} else {
				editor.setNeedsRender(each);
			}
		});
	});
});