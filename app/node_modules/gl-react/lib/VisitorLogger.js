"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log = require("./helpers/log");

var _log2 = _interopRequireDefault(_log);

var _Visitor2 = require("./Visitor");

var _Visitor3 = _interopRequireDefault(_Visitor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable no-console */


var aggregateInfo = function aggregateInfo(info) {
  return Array.isArray(info) ? info.reduce(function (acc, info) {
    return acc.concat(aggregateInfo(info));
  }, []) : [String(info.dependency && info.dependency.getGLName() || info.initialObj)].concat(info.textureOptions ? [info.textureOptions] : []);
};

/**
 *
 */

var VisitorLogger = function (_Visitor) {
  _inherits(VisitorLogger, _Visitor);

  function VisitorLogger() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VisitorLogger);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VisitorLogger.__proto__ || Object.getPrototypeOf(VisitorLogger)).call.apply(_ref, [this].concat(args))), _this), _this.groupNestedLvl = 0, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VisitorLogger, [{
    key: "onSurfaceGLContextChange",
    value: function onSurfaceGLContextChange(surface, gl) {
      if (gl) {
        (0, _log2.default)(surface.getGLName() + " _context acquired_");
      } else {
        (0, _log2.default)(surface.getGLName() + " _context lost_");
      }
    }
  }, {
    key: "onSurfaceDrawSkipped",
    value: function onSurfaceDrawSkipped() {}
  }, {
    key: "onSurfaceDrawStart",
    value: function onSurfaceDrawStart(surface) {
      var _surface$getGLSize = surface.getGLSize(),
          _surface$getGLSize2 = _slicedToArray(_surface$getGLSize, 2),
          width = _surface$getGLSize2[0],
          height = _surface$getGLSize2[1];

      console.groupCollapsed("Surface draw");
      this.groupNestedLvl = 1;
      (0, _log2.default)("_size_ `" + width + "`x`" + height + "`");
    }
  }, {
    key: "onSurfaceDrawError",
    value: function onSurfaceDrawError(e) {
      console.error(e);
      while (this.groupNestedLvl > 0) {
        console.groupEnd();
        this.groupNestedLvl--;
      }
      return true;
    }
  }, {
    key: "onSurfaceDrawEnd",
    value: function onSurfaceDrawEnd() {
      this.groupNestedLvl--;
      console.groupEnd();
    }
  }, {
    key: "onNodeDrawSkipped",
    value: function onNodeDrawSkipped(node) {
      (0, _log2.default)(node.getGLName() + " redraw _skipped_: " + (!node.context.glSurface.gl ? "no gl context available!" : !node._needsRedraw ? "no need to redraw" : ""));
    }
  }, {
    key: "onNodeDrawStart",
    value: function onNodeDrawStart(node) {
      this.groupNestedLvl++;
      console.group(node.getGLName());
    }
  }, {
    key: "onNodeSyncDeps",
    value: function onNodeSyncDeps(node, additions, deletions) {
      if (additions.length) console.log(node.getGLName() + " +deps " + additions.map(function (n) {
        return n.getGLName();
      }).join(", "));
      if (deletions.length) console.log(node.getGLName() + " -deps " + additions.map(function (n) {
        return n.getGLName();
      }).join(", "));
    }
  }, {
    key: "onNodeDraw",
    value: function onNodeDraw(node, preparedUniforms) {
      var _node$props = node.props,
          blendFunc = _node$props.blendFunc,
          clear = _node$props.clear;

      this.groupNestedLvl++;
      console.group("DRAW " + node.getGLName());

      var _node$getGLSize = node.getGLSize(),
          _node$getGLSize2 = _slicedToArray(_node$getGLSize, 2),
          w = _node$getGLSize2[0],
          h = _node$getGLSize2[1];

      (0, _log2.default)("_size_ `" + w + "`x`" + h + "` " + "_clear_ `" + JSON.stringify(clear) + "` " + "_blendFunc_ `" + JSON.stringify(blendFunc) + "`");
      (0, _log2.default)("_" + preparedUniforms.length + " uniforms:_");
      preparedUniforms.forEach(function (obj) {
        var key = obj.key,
            type = obj.type,
            value = obj.value,
            getMetaInfo = obj.getMetaInfo;

        type = String(type || "UNKNOWN");
        var values = value === undefined ? "" : Array.isArray(value) ? "[" + value.map(function (v) {
          return "`" + String(v) + "`";
        }).join(",") + "]" : "`" + String(value) + "`";
        var spaces = "";
        for (var i = type.length + key.length - 18; i < 0; i++) {
          spaces += " ";
        }
        _log2.default.apply(undefined, [spaces + "*" + (type === "UNKNOWN" ? "[c='color:red']UNKNOWN[c]" : type) + "* _" + key + "_ = " + values].concat(_toConsumableArray(getMetaInfo ? aggregateInfo(getMetaInfo()) : [])));
      });
    }
  }, {
    key: "onNodeDrawEnd",
    value: function onNodeDrawEnd() {
      this.groupNestedLvl -= 2;
      console.groupEnd();
      console.groupEnd();
    }
  }]);

  return VisitorLogger;
}(_Visitor3.default);

exports.default = VisitorLogger;
//# sourceMappingURL=VisitorLogger.js.map