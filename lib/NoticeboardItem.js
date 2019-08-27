'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = NoticeboardItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require('reactstrap');

require('./NoticeboardItem.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoticeboardItem(_ref) {
    var ticket = _ref.ticket;


    var parseDates = function parseDates(UTCDate) {
        var date = new Date(UTCDate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var formattedMonth = month < 10 ? "0" + month : month;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = (date.getHours() + 11) % 12 + 1;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var suffix = date.getHours() > 12 ? "PM" : "AM";
        return year + "-" + formattedMonth + "-" + day + " " + hours + ":" + minutes + " " + suffix;
    };

    var displayContent = function displayContent(desp_text) {
        if (desp_text.length <= 250) {
            return desp_text;
        } else {
            return desp_text.substring(0, 250) + "...";
        }
    };

    var displayTags = function displayTags(tags) {
        if (tags.length === 0) {
            return _react2.default.createElement('div', { className: 'fr-empty' });
        } else {
            return tags.map(function (name) {
                return _react2.default.createElement(
                    'div',
                    { className: 'fr-tag' },
                    name
                );
            });
        }
    };

    var displayStatus = function displayStatus(status) {
        var status_text = "";
        switch (status) {
            case 2:
                status_text = "OPEN";
                break;
            case 3:
                status_text = "PENDING";
                break;
            case 4:
                status_text = "RESOLVED";
                break;
            case 5:
                status_text = "CLOSED";
                break;
            default:
                status_text = "None";
        }
        return _react2.default.createElement(
            'div',
            { className: 'fr-ticket-property' },
            status_text
        );
    };

    var displayPriority = function displayPriority(priority) {
        var pri_text = "";
        switch (priority) {
            case 1:
                pri_text = "LOW";
                break;
            case 2:
                pri_text = "MEDIUM";
                break;
            case 3:
                pri_text = "HIGH";
                break;
            default:
                pri_text = "None";
        }
        return _react2.default.createElement(
            'div',
            { className: 'fr-ticket-property' },
            pri_text
        );
    };

    var displayComplexity = function displayComplexity(complexity) {
        if (complexity === null) {
            return _react2.default.createElement(
                'div',
                { className: 'fr-ticket-property' },
                'None'
            );
        } else {
            return _react2.default.createElement(
                'div',
                { className: 'fr-ticket-property' },
                complexity
            );
        }
    };
    // console.log(ticket);

    return _react2.default.createElement(
        _reactstrap.ListGroupItem,
        { className: 'freshdesk-list', key: ticket.id },
        _react2.default.createElement(
            _reactstrap.Row,
            null,
            _react2.default.createElement(
                _reactstrap.Col,
                { xs: '8' },
                _react2.default.createElement(
                    _reactstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '7' },
                        _react2.default.createElement(
                            'div',
                            { className: 'fr-requester' },
                            ticket.requester.name
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '5' },
                        _react2.default.createElement(
                            'div',
                            { className: 'fr-date' },
                            parseDates(ticket.created_at)
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'fr-title' },
                    ticket.subject
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'fr-description' },
                    displayContent(ticket.description_text)
                )
            ),
            _react2.default.createElement(
                _reactstrap.Col,
                { xs: '4', className: 'right-col' },
                _react2.default.createElement(
                    _reactstrap.Row,
                    { className: 'right-row' },
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '4' },
                        'Tags:'
                    ),
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '8', className: 'fr-tags' },
                        displayTags(ticket.tags)
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Row,
                    { className: 'right-row' },
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '4' },
                        'Status:'
                    ),
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '8' },
                        displayStatus(ticket.status)
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Row,
                    { className: 'right-row' },
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '4' },
                        'Priority:'
                    ),
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '8' },
                        displayPriority(ticket.priority)
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Row,
                    { className: 'right-row' },
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '5' },
                        'Complexity:'
                    ),
                    _react2.default.createElement(
                        _reactstrap.Col,
                        { xs: '7' },
                        displayComplexity(ticket.custom_fields.cf_complexity)
                    )
                )
            )
        )
    );
}