"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A High Order Component (HOC) function that provides
 * the contextual `width` and `height` props to a GL Component.
 * It also merge optional width,height props to override the contextual size
 * @function connectSize
 * @param GLComponent - a React Component that receives width and height props
 * @returns {ReactClass<*>} a Component that merge width and height props
 * with context and renders `GLComponent`.
 * @example
 *  const Foo = ({ width, height }) => <Node uniforms={{ width, height }} />;
 *  const FooConnected = connectSize(Foo);
 *  <FooConnected /> // you don't have to provide width, height.
 *  <FooConnected width={64} height={64} /> // If you do, you override width,height in the context as well, so <Node> is implicitly receiving the new width/height.
 */
var connectSize = function connectSize(GLComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "getGLSize",
      value: function getGLSize() {
        var _props = this.props,
            width = _props.width,
            height = _props.height,
            glSizable = this.context.glSizable;

        if (width && height) return [width, height];

        var _glSizable$getGLSize = glSizable.getGLSize(),
            _glSizable$getGLSize2 = _slicedToArray(_glSizable$getGLSize, 2),
            cw = _glSizable$getGLSize2[0],
            ch = _glSizable$getGLSize2[1];

        return [width || cw, height || ch];
      }
    }, {
      key: "getChildContext",
      value: function getChildContext() {
        return {
          glSizable: this
        };
      }
    }, {
      key: "render",
      value: function render() {
        var onConnectSizeComponentRef = this.props.onConnectSizeComponentRef;

        var _getGLSize = this.getGLSize(),
            _getGLSize2 = _slicedToArray(_getGLSize, 2),
            width = _getGLSize2[0],
            height = _getGLSize2[1];

        return _react2.default.createElement(GLComponent, _extends({
          ref: onConnectSizeComponentRef
        }, this.props, {
          width: width,
          height: height
        }));
      }
    }]);

    return _class;
  }(_react.Component), _class.displayName = "connectSize(" + (GLComponent.displayName || GLComponent.name || "?") + ")", _class.propTypes = {
    width: _propTypes2.default.number,
    height: _propTypes2.default.number
  }, _class.contextTypes = {
    glSizable: _propTypes2.default.object.isRequired
  }, _class.childContextTypes = {
    glSizable: _propTypes2.default.object.isRequired
  }, _temp;
};

exports.default = connectSize;
//# sourceMappingURL=connectSize.js.map