import React from 'react';
import { Row, Col, ListGroupItem } from 'reactstrap';
import './NoticeboardItem.css';
export default function NoticeboardItem({
  ticket
}) {
  const parseDates = UTCDate => {
    const date = new Date(UTCDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedMonth = month < 10 ? "0" + month : month;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hours = (date.getHours() + 11) % 12 + 1;
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const suffix = date.getHours() > 12 ? "PM" : "AM";
    return year + "-" + formattedMonth + "-" + day + " " + hours + ":" + minutes + " " + suffix;
  };

  const displayContent = desp_text => {
    if (desp_text.length <= 250) {
      return desp_text;
    } else {
      return desp_text.substring(0, 250) + "...";
    }
  };

  const displayTags = tags => {
    if (tags.length === 0) {
      return React.createElement("div", {
        className: "fr-empty"
      });
    } else {
      return tags.map(name => React.createElement("div", {
        className: "fr-tag"
      }, name));
    }
  };

  const displayStatus = status => {
    let status_text = "";

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

    return React.createElement("div", {
      className: "fr-ticket-property"
    }, status_text);
  };

  const displayPriority = priority => {
    let pri_text = "";

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

    return React.createElement("div", {
      className: "fr-ticket-property"
    }, pri_text);
  };

  const displayComplexity = complexity => {
    if (complexity === null) {
      return React.createElement("div", {
        className: "fr-ticket-property"
      }, "None");
    } else {
      return React.createElement("div", {
        className: "fr-ticket-property"
      }, complexity);
    }
  }; // console.log(ticket);


  return React.createElement(ListGroupItem, {
    className: "freshdesk-list",
    key: ticket.id
  }, React.createElement(Row, null, React.createElement(Col, {
    xs: "8"
  }, React.createElement(Row, null, React.createElement(Col, {
    xs: "7"
  }, React.createElement("div", {
    className: "fr-requester"
  }, ticket.requester.name)), React.createElement(Col, {
    xs: "5"
  }, React.createElement("div", {
    className: "fr-date"
  }, parseDates(ticket.created_at)))), React.createElement("div", {
    className: "fr-title"
  }, ticket.subject), React.createElement("div", {
    className: "fr-description"
  }, displayContent(ticket.description_text))), React.createElement(Col, {
    xs: "4",
    className: "right-col"
  }, React.createElement(Row, {
    className: "right-row"
  }, React.createElement(Col, {
    xs: "4"
  }, "Tags:"), React.createElement(Col, {
    xs: "8",
    className: "fr-tags"
  }, displayTags(ticket.tags))), React.createElement(Row, {
    className: "right-row"
  }, React.createElement(Col, {
    xs: "4"
  }, "Status:"), React.createElement(Col, {
    xs: "8"
  }, displayStatus(ticket.status))), React.createElement(Row, {
    className: "right-row"
  }, React.createElement(Col, {
    xs: "4"
  }, "Priority:"), React.createElement(Col, {
    xs: "8"
  }, displayPriority(ticket.priority))), React.createElement(Row, {
    className: "right-row"
  }, React.createElement(Col, {
    xs: "5"
  }, "Complexity:"), React.createElement(Col, {
    xs: "7"
  }, displayComplexity(ticket.custom_fields.cf_complexity))))));
}