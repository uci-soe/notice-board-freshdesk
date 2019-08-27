'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  name: _propTypes2.default.string,
  message: _propTypes2.default.string
};

var defaultProps = {
  name: 'World',
  message: 'This is a simple component.'
};

var HelloWorld = function (_Component) {
  _inherits(HelloWorld, _Component);

  function HelloWorld() {
    _classCallCheck(this, HelloWorld);

    return _possibleConstructorReturn(this, (HelloWorld.__proto__ || Object.getPrototypeOf(HelloWorld)).apply(this, arguments));
  }

  _createClass(HelloWorld, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          message = _props.message,
          children = _props.children;


      return _react2.default.createElement(
        _reactstrap.Jumbotron,
        { className: 'text-xs-center' },
        _react2.default.createElement(
          _reactstrap.Container,
          { fluid: true },
          _react2.default.createElement(
            _reactstrap.Row,
            null,
            _react2.default.createElement(
              _reactstrap.Col,
              null,
              _react2.default.createElement(
                'h1',
                { className: 'display-4' },
                'Hello ',
                name,
                '!'
              ),
              _react2.default.createElement(
                'p',
                { className: 'lead' },
                message
              ),
              children
            )
          )
        )
      );
    }
  }]);

  return HelloWorld;
}(_react.Component);

HelloWorld.propTypes = propTypes;
HelloWorld.defaultProps = defaultProps;

exports.default = HelloWorld;