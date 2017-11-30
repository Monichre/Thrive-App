"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariantNoDependentsLoop;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _Node = require("../Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check that base does not exist in node dependents graph
function invariantNoDependentsLoop(base, node) {
  (0, _invariant2.default)(base !== node, "gl-react: Found a loop in the rendering graph.\n" + "If you want to get back previous state, please use `backbuffering` instead");
  if (node instanceof _Node2.default) {
    for (var i = 0; i < node.dependents.length; i++) {
      invariantNoDependentsLoop(base, node.dependents[i]);
    }
  }
}
//# sourceMappingURL=invariantNoDependentsLoop.js.map