import React from 'react';
import axios from 'axios';
import { 
    Container,
    ListGroup
} from 'reactstrap';
import './Noticeboard.css';
import NoticeboardItem from './NoticeboardItem';

export default class Noticeboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {response: []};
    }

	componentDidMount() {
        let tickets = []
		axios.get(`https://${this.props.subdomain}.freshdesk.com/api/v2/tickets/`, {
            auth: this.props.auth
        }).then(response => {
            for (let ticket of response.data) {
                axios.get(`https://${this.props.subdomain}.freshdesk.com/api/v2/tickets/${ticket.id}?include=requester`, {
                    auth: this.props.auth
                }).then(response => {
                    tickets.push(response.data)
                    this.setState({response: tickets})
                });
            }
        });
    }

    limitTickets(tickets) {
        if (this.props.limit > -1) {
            console.log(this.props)
            tickets = tickets.slice(this.props.skip, this.props.skip + this.props.limit)
        } 
        return tickets
    }

    render() {
        // console.log(this.state.response)
        const fsItem = this.props.children || NoticeboardItem;
        // console.log(fsItem);
        return (
            <Container className="freshdesk-notice">
                <ListGroup>
                    {this.limitTickets(this.state.response).map((ticket) => fsItem({ticket}))}
                </ListGroup>
            </Container>
        );
    }
}

Noticeboard.defaultProps = {
    auth: {}, 
    subdomain: "", 
    limit:-1, 
    skip:0
}