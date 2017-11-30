function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var TextInput = function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      inputValue: ''
    };

    _this._handleKeyPress = _this._handleKeyPress.bind(_this);
    _this._handleSubmit = _this._handleSubmit.bind(_this);
    _this._updateInputValue = _this._updateInputValue.bind(_this);
    return _this;
  }

  TextInput.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'TextInput' },
      React.createElement('input', { className: 'Input',
        placeholder: this.props.placeholder,
        onChange: this._updateInputValue,
        onSubmit: this._handleSubmit,
        onKeyPress: this._handleKeyPress }),
      React.createElement(
        'button',
        { className: 'Submit', onClick: this._handleSubmit },
        this.props.submit
      )
    );
  };

  TextInput.prototype._handleKeyPress = function _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmit(this.state.inputValue, this.props.callback);
    }
  };

  TextInput.prototype._handleSubmit = function _handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.inputValue, this.props.callback);
  };

  TextInput.prototype._updateInputValue = function _updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  };

  return TextInput;
}(Component);

TextInput.propTypes = process.env.NODE_ENV !== "production" ? {
  submit: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
} : {};

export default TextInput;