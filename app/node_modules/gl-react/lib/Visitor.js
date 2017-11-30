"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var Visitor = function () {
  function Visitor() {
    _classCallCheck(this, Visitor);
  }

  _createClass(Visitor, [{
    key: "onSurfaceMount",

    /**
     *
     */
    value: function onSurfaceMount(surface) {}
    /**
     *
     */

  }, {
    key: "onSurfaceUnmount",
    value: function onSurfaceUnmount(surface) {}
    /**
     *
     */

  }, {
    key: "onSurfaceGLContextChange",
    value: function onSurfaceGLContextChange(surface, gl) {}
    /**
     */

  }, {
    key: "onSurfaceDrawSkipped",
    value: function onSurfaceDrawSkipped(surface) {}
    /**
     */

  }, {
    key: "onSurfaceDrawStart",
    value: function onSurfaceDrawStart(surface) {}
    /**
     * if returns true, it prevent a throw to happen from the request animation frame loop (or from a surface.flush() call).
     */

  }, {
    key: "onSurfaceDrawError",
    value: function onSurfaceDrawError(e) {
      return false;
    }
    /**
     */

  }, {
    key: "onSurfaceDrawEnd",
    value: function onSurfaceDrawEnd(surface) {}
    /**
     */

  }, {
    key: "onNodeDrawSkipped",
    value: function onNodeDrawSkipped(node) {}
    /**
     */

  }, {
    key: "onNodeDrawStart",
    value: function onNodeDrawStart(node) {}
    /**
     */

  }, {
    key: "onNodeSyncDeps",
    value: function onNodeSyncDeps(node, additions, deletions) {}
    /**
     */

  }, {
    key: "onNodeDraw",
    value: function onNodeDraw(node, preparedUniforms) {}
    /**
     */

  }, {
    key: "onNodeDrawEnd",
    value: function onNodeDrawEnd(node) {}
  }]);

  return Visitor;
}();

exports.default = Visitor;
//# sourceMappingURL=Visitor.js.map