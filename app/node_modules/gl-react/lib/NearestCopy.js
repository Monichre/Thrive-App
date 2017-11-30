"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

var _copyShader = require("./copyShader");

var _copyShader2 = _interopRequireDefault(_copyShader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * copy pixel with no interpolation (nearest pixel)
 * @prop {any} children content to render
 */
var NearestCopy = function (_Component) {
  _inherits(NearestCopy, _Component);

  function NearestCopy() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NearestCopy);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NearestCopy.__proto__ || Object.getPrototypeOf(NearestCopy)).call.apply(_ref, [this].concat(args))), _this), _this._onRef = function (node) {
      _this._node = node;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NearestCopy, [{
    key: "getNodeRef",

    /**
     * get a reference to the underlying Node instance
     * @return {Node}
     */
    value: function getNodeRef() {
      return this._node;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          t = _props.children,
          rest = _objectWithoutProperties(_props, ["children"]);

      return _react2.default.createElement(_Node2.default, _extends({}, rest, {
        ref: this._onRef,
        shader: _copyShader2.default,
        blendFunc: { src: "one", dst: "one minus src alpha" },
        uniformsOptions: { t: { interpolation: "nearest" } },
        uniforms: { t: t }
      }));
    }
  }]);

  return NearestCopy;
}(_react.Component);

exports.default = NearestCopy;
//# sourceMappingURL=NearestCopy.js.map