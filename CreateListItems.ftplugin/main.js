//
// This plugin is in response to http://support.foldingtext.com/discussions/suggestions/834-frq-transformations-make-sentence-case
//
Extensions.addCommand({
  name: "create unordered list",
  keymap: "Shift-Cmd-O",
  description: "Create an Unordered list of selected items.",
  performCommand: function (editor) {
    var range = editor.selectedRange(),
      tree = editor.tree(),
      type,
      text;

    tree.beginUpdates();
    range.forEachNodeInRange(function (node) {
      type = node.type();
      if (type !== "ordered" && type !== "unordered" && type !== "todo") {
        text = node.text();
        node.setText("- " + text.charAt(0).toUpperCase() + text.slice(1));
      }
    });
    tree.endUpdates();
  },
});

Extensions.addCommand({
  name: "create ordered list",
  description: "Create an Ordered list of selected items.",
  performCommand: function (editor) {
    var range = editor.selectedRange(),
      tree = editor.tree(),
      type,
      text,
      index = 1;

    tree.beginUpdates();
    range.forEachNodeInRange(function (node) {
      type = node.type();
        if (type !== "ordered" && type !== "unordered" && type !== "task") {
        text = node.text();
        node.setText(
          index + ". " + text.charAt(0).toUpperCase() + text.slice(1)
        );
        index++;
      }
    });
    tree.endUpdates();
  },
});

Extensions.addCommand({
  name: "undo list",
  description: "Undo an list of selected items.",
  keymap: "Shift-Cmd-P",
  performCommand: function (editor) {
    var range = editor.selectedRange(),
      tree = editor.tree(),
      type,
      text;

    tree.beginUpdates();
    range.forEachNodeInRange(function (node) {
      type = node.type();
      if (type === "ordered" || type === "unordered" || type === "task") {
        node.setType("body");
      }
    });
    tree.endUpdates();
  },
});

// Extensions.addInit(function (editor) {
//     editor.addKeyMap({
//         'Shift-Cmd-O': 'create unordered list',
//         'Shift-Cmd-P': 'undo list',
//     });
