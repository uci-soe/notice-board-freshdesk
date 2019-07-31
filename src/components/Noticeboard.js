import React from 'react';
import axios from 'axios';
import {
  Container,
  ListGroup
} from 'reactstrap';
import './Noticeboard.css';
import NoticeboardItem from './NoticeboardItem';

export default class Noticeboard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {response: []};
  }

  componentDidMount () {
    return axios.get(`https://${this.props.subdomain}.freshdesk.com/api/v2/tickets/?order_by=${this.props.order_by}&order_type=${this.props.order_type}`, {
      auth: this.props.auth
    }).then(response => {
        return Promise.all(response.data.map(ticket => {
            return axios.get(`https://${this.props.subdomain}.freshdesk.com/api/v2/tickets/${ticket.id}?include=requester`, {
                auth: this.props.auth
              })
              .then(response => response.data)
          }))
          .then(tickets => this.setState({response: tickets}))
      })
      .catch(err => {
        console.error(err.stack);
      });
  }

  limitTickets (tickets) {
    if (this.props.limit > -1) {
      console.log(this.props)
      tickets = tickets.slice(this.props.skip, this.props.skip + this.props.limit)
    }
    return tickets
  }

  render () {
    // console.log(this.state.response)
    const fsItem = this.props.children || NoticeboardItem;
    // console.log(fsItem);
    return (
      <Container className="freshdesk-notice">
        <ListGroup>
          {this.limitTickets(this.state.response).map((ticket) => fsItem({ticket, key: ticket.id}))}
        </ListGroup>
      </Container>
    );
  }
}

Noticeboard.defaultProps = {
    auth:      {},
    subdomain: '',
    limit:     -1,
    skip:      0,
    order_by:  "created_at",
    order_type: "desc"
}
