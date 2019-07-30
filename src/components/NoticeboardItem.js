import React from 'react';
import {
    Row, Col,
    ListGroupItem,
    Button
} from 'reactstrap';
import './NoticeboardItem.css';

export default function NoticeboardItem ({ticket}) {

    const parseDates = (UTCDate) => {
        const date = new Date(UTCDate)
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedMonth = month < 10 ? "0" + month : month;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const hours = ((date.getHours() + 11) % 12 + 1);
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        const suffix = date.getHours() > 12 ? "PM" : "AM";
        return year + "-" + formattedMonth + "-" + day + " " + hours + ":" + minutes + " " + suffix;
    }

    const displayContent = (desp_text) => {
        if (desp_text.length <= 250) {
            return desp_text;
        } else {
            return desp_text.substring(0, 250) + "...";
        }
    }

    const displayTags = (tags) => {
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

    const displayStatus = (status) => {
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

    const displayPriority = (priority) => {
        let pri_text = "";
        switch(priority) {
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
        return (<div className="fr-ticket-property">{pri_text}</div>);
    }

    const displayComplexity = (complexity) => {
        if (complexity === null) {
            return (<div className="fr-ticket-property">None</div>);
        } else {
            return (<div className="fr-ticket-property">{complexity}</div>);
        }
    }
    // console.log(ticket);

    return (
        <ListGroupItem className="freshdesk-list" key={ticket.id}>
            <Row>
                <Col xs="8">
                    <Row>
                        <Col xs="7"><div className="fr-requester">{ticket.requester.name}</div></Col>
                        <Col xs="5"><div className="fr-date">{parseDates(ticket.created_at)}</div></Col>
                    </Row>
                    <div className="fr-title">{ticket.subject}</div>
                    <div className="fr-description">{displayContent(ticket.description_text)}</div>
                </Col>
                <Col xs="4" className="right-col">
                    <Row className="right-row">
                        <Col xs="4">
                            Tags:
                        </Col>
                        <Col xs="8" className="fr-tags">
                            {displayTags(ticket.tags)}
                        </Col>
                    </Row>
                    <Row className="right-row">
                        <Col xs="4">
                            Status:
                        </Col>
                        <Col xs="8">
                            {displayStatus(ticket.status)}
                        </Col>
                    </Row>
                    <Row className="right-row">
                        <Col xs="4">
                            Priority:
                        </Col>
                        <Col xs="8">
                            {displayPriority(ticket.priority)}
                        </Col>
                    </Row>
                    <Row className="right-row">
                        <Col xs="5">
                            Complexity:
                        </Col>
                        <Col xs="7">
                            {displayComplexity(ticket.custom_fields.cf_complexity)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ListGroupItem>
    );
}
