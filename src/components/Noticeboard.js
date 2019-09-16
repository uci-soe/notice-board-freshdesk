import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  ListGroup
} from 'reactstrap';
import './Noticeboard.css';
import qs from 'qs';
import NoticeboardItem from './NoticeboardItem';

const TicketsNoTickets = () => {
  return (<div className="no-tickets" />);
}

const ONE_MINUTE = 1000 * 60;

const buildQuery = (opts) => {
  let q = {};
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

const fetchResponse = (subdomain, auth, opts) => {
  return axios.get(`https://${subdomain}.freshdesk.com/api/v2/tickets`, {
    auth: auth,
    params: {
      include: 'requester,description',
      ...buildQuery(opts)
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {
        arrayFormat: 'brackets', encoder: function (str) {
          // Passed in values `a`, `b`, `c`
          return typeof str === 'string' ? str.trim().replace(/\s+/g, '%20') : str;
        }
      })
    },
  }).then(response => response.data)
    .catch(err => {
      console.error(err.stack);
      return [];
    });
};

const Noticeboard = (
  {
    children,
    auth = {},
    subdomain = '',
    displayResolved = true,
    updated_since = "1970-01-01",
    limit = -1,
    page = 0,
    order_by = "created_at",
    order_type = "desc",
    noTickets
  }
) => {

  const [response, setResponse] = useState([]);

  useEffect(() => {
    let update;
    const updateFunc = () => {
      fetchResponse(subdomain, auth, {order_by, order_type, displayResolved, updated_since, limit, page})
        .then(resp => setResponse(resp))
      ;
      update = setTimeout(() => {
        updateFunc();
      }, 5 * ONE_MINUTE);
    };

    updateFunc();

    return () => {
      clearTimeout(update);
    }
    // fetchResponse(subdomain, auth, {order_by, order_type, updated_since, displayResolved, limit, page})
    //   .then(resp => setResponse(resp))
    // ;

  }, [subdomain, auth]);

  const fsItem = children || NoticeboardItem;
  const NoTickets = noTickets || TicketsNoTickets;
  console.log(fsItem);
  return (
      <ListGroup className="tickets">
        {response.length
          ? response.map((ticket) => fsItem({ticket, key: ticket.id}))
          : NoTickets()}
      </ListGroup>
  );
}

export default Noticeboard;
