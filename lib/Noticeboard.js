'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactstrap = require('reactstrap');

require('./Noticeboard.css');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _NoticeboardItem = require('./NoticeboardItem');

var _NoticeboardItem2 = _interopRequireDefault(_NoticeboardItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ONE_MINUTE = 1000 * 60;

var buildQuery = function buildQuery(opts) {
  var q = {};
  if (opts.order_by) {
    q['order_by'] = opts.order_by;
  }
  if (opts.order_type) {
    q['order_type'] = opts.order_type;
  }
  if (!opts.displayResolved) {
    q['filter'] = "new_and_my_open";
  }
  if (opts.updated_since) {
    q['updated_since'] = opts.updated_since;
  }
  if (opts.limit > 0) {
    q['per_page'] = '' + opts.limit;
  }
  if (opts.page > 1) {
    q['page'] = '' + opts.page;
  }

  return q;
};

var fetchResponse = function fetchResponse(subdomain, auth, opts) {
  return _axios2.default.get('https://' + subdomain + '.freshdesk.com/api/v2/tickets', {
    auth: auth,
    params: _extends({
      include: 'requester,description'
    }, buildQuery(opts)),
    paramsSerializer: function paramsSerializer(params) {
      return _qs2.default.stringify(params, {
        arrayFormat: 'brackets', encoder: function encoder(str) {
          // Passed in values `a`, `b`, `c`
          return typeof str === 'string' ? str.trim().replace(/\s+/g, '%20') : str;
        }
      });
    }
  }).then(function (response) {
    return response.data;
  }).catch(function (err) {
    console.error(err.stack);
    return [];
  });
};

var Noticeboard = function Noticeboard(_ref) {
  var children = _ref.children,
      _ref$auth = _ref.auth,
      auth = _ref$auth === undefined ? {} : _ref$auth,
      _ref$subdomain = _ref.subdomain,
      subdomain = _ref$subdomain === undefined ? '' : _ref$subdomain,
      _ref$displayResolved = _ref.displayResolved,
      displayResolved = _ref$displayResolved === undefined ? true : _ref$displayResolved,
      _ref$updated_since = _ref.updated_since,
      updated_since = _ref$updated_since === undefined ? "1970-01-01" : _ref$updated_since,
      _ref$limit = _ref.limit,
      limit = _ref$limit === undefined ? -1 : _ref$limit,
      _ref$page = _ref.page,
      page = _ref$page === undefined ? 0 : _ref$page,
      _ref$order_by = _ref.order_by,
      order_by = _ref$order_by === undefined ? "created_at" : _ref$order_by,
      _ref$order_type = _ref.order_type,
      order_type = _ref$order_type === undefined ? "desc" : _ref$order_type;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      response = _useState2[0],
      setResponse = _useState2[1];

  (0, _react.useEffect)(function () {
    var update = void 0;
    var updateFunc = function updateFunc() {
      fetchResponse(subdomain, auth, { order_by: order_by, order_type: order_type, displayResolved: displayResolved, updated_since: updated_since, limit: limit, page: page }).then(function (resp) {
        return setResponse(resp);
      });
      update = setTimeout(function () {
        updateFunc();
      }, 5 * ONE_MINUTE);
    };

    updateFunc();

    return function () {
      clearTimeout(update);
    };
    // fetchResponse(subdomain, auth, {order_by, order_type, updated_since, displayResolved, limit, page})
    //   .then(resp => setResponse(resp))
    // ;
  }, [subdomain, auth]);

  var fsItem = children || _NoticeboardItem2.default;
  console.log(fsItem);
  return _react2.default.createElement(
    _reactstrap.Container,
    { className: 'freshdesk-notice' },
    _react2.default.createElement(
      _reactstrap.ListGroup,
      null,
      response.map(function (ticket) {
        return fsItem({ ticket: ticket, key: ticket.id });
      })
    )
  );
};

exports.default = Noticeboard;