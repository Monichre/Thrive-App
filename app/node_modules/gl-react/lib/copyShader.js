"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\nprecision highp float;\nvarying vec2 uv;\nuniform sampler2D t;\nvoid main(){\n  gl_FragColor=texture2D(t,uv);\n}"], ["\nprecision highp float;\nvarying vec2 uv;\nuniform sampler2D t;\nvoid main(){\n  gl_FragColor=texture2D(t,uv);\n}"]);

var _GLSL = require("./GLSL");

var _GLSL2 = _interopRequireDefault(_GLSL);

var _Shaders = require("./Shaders");

var _Shaders2 = _interopRequireDefault(_Shaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = _Shaders2.default.create({
  copy: {
    frag: (0, _GLSL2.default)(_templateObject)
  }
}).copy;
//# sourceMappingURL=copyShader.js.map