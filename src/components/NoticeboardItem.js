import React from 'react';
import {
    Row, Col,
    ListGroupItem
} from 'reactstrap';
import './NoticeboardItem.css';
import moment from 'moment';

export default function NoticeboardItem ({ticket}) {

    return (
        <ListGroupItem className="freshdesk-list fr-ticket-item" key={ticket.id}>
            {displayPriority(ticket.priority)}
            <Row>
                <Col xs="8">
                    <div className="fr-title">{ticket.subject}</div>
                    <div className="fr-description">{displayContent(converseOrDesc(ticket.description_text, ticket.conversations))}</div>
                </Col>
                <Col xs="4">
                    <Row>
                        <Col xs="12"><div className="fr-requester">{ticket.requester.name}</div></Col>
                    </Row>
                    <Row>
                        <Col xs="12"><div className="fr-date">{parseDates(ticket.created_at)}</div></Col>
                    </Row>
                    <Row style={{padding: "0.5rem 0 0.3rem 0"}}>
                        <Col xs="4">
                            Tags:
                        </Col>
                        <Col xs="8" className="fr-tags">
                            {displayTags(ticket.tags)}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            Status:
                        </Col>
                        <Col xs="8">
                            {displayStatus(ticket.status)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ListGroupItem>
    );
}



function converseOrDesc(description, conversations) {

    if (conversations && conversations.length) {
        // return the body of text of the latest email/note sent
        return conversations[conversations.length - 1].body_text;
    }

    return description;
}



function parseDates (UTCDate) {
    let m = moment(UTCDate).format('llll')
    return m;
}

function displayContent (desp_text) {
    if (desp_text && desp_text.length > 250) {
        return desp_text.substring(0, 250) + "...";
    } else {
        return desp_text;
    }
}

function displayTags (tags) {
    if (tags.length === 0) {
        return (
          <div className="fr-empty"></div>
        )
    } else {
        return (
          tags.map(name => <div className="fr-tag">{name}</div>)
        );
    }
}

function displayStatus (status) {
    let status_text = "";
    switch(status) {
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
    return (<div className="fr-ticket-property">{status_text}</div>);
}

function displayPriority (priority) {
    switch(priority) {
        case 2:
            return (
              <div className="fr-priority medium"></div>
            );
        case 3:
            return (
              <div className="fr-priority high"></div>
            );
        default:
            return (
              <div className="fr-priority low"></div>
            );
    }
}
