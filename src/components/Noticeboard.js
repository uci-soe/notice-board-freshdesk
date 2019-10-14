import React, {useState, useEffect} from 'react';
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
};

const ONE_MINUTE = 1000 * 60;

const buildQuery = (params) => {
  let q = [];

  let status = ['status:<2'];
  if (params.displayPending) {
    status.push('status:3');
  }
  if (params.displayResolved) {
    status.push('status:>4');
  }
  q.push('(' + status.join(' OR ') + ')');

  if (params.agent) {
    q.push(`agent_id:${params.agent}`);
  }
  if (params.updated_since) {
    q.push(`updated_at:>'${params.updated_since}'`);
  }

  return '"' + q.join(' AND ') + '"';
};

const ticketsGenerator = (subdomain, auth) => {
  const paramsSerializer = (params) => {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      encoder:     function (str) {
        // Passed in values `a`, `b`, `c`
        return typeof str === 'string' ? str.trim().replace(/\s+/g, '%20') : str;
      }
    })
  };
  const call             = (endpoint, params) => {
    return axios
      .get(`https://${subdomain}.freshdesk.com/api/v2/${endpoint}`, {auth, params, paramsSerializer})
      .then(response => response.data)
      ;
  };

  const all = (params) => {
    return call('search/tickets', {
      query: buildQuery(params),
    })
      .catch(err => {
        console.error(err.stack);
        return {total: 0, results: []};
      })

  };
  const one = (id, params) => {
    return call(`tickets/${id}`, {
      include: 'requester,conversations',
    })
      .catch(err => {
        console.error(err.stack);
        return {};
      })

  };


  return {one, all};
};


const fetchResponse = (subdomain, auth, opts) => {
  return axios.get(`https://${subdomain}.freshdesk.com/api/v2/tickets`, {
    auth:             auth,
    params:           {
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
    agent = 0, // our student agent is 2043025904255
    displayResolved = false,
    displayPending = true,
    updated_since = null,
    limit = -1,   // will now have a max of 30, but a silent max
    // page = 0,     // just cant find a reasonable way to make it work
    // order_by = 'created_at',  // couldn't make this work with query // order is now always newest to oldest
    // order_type = 'desc', // couldn't make this work with query
    noTickets
  }
) => {

  const [response, setResponse] = useState([]);

  useEffect(() => {
    let update;
    const tickets    = ticketsGenerator(subdomain, auth);
    const updateFunc = () => {
      // fetchResponse(subdomain, auth, {order_by, order_type, displayResolved, updated_since, limit, page})
      //   .then(resp => limit >= 0 ? resp.slice(0, limit) : resp)
      //   .then(resp => setResponse(resp))
      // ;

      const params = {agent, displayResolved, displayPending, updated_since};
      tickets.all(params)
        .then(({total, results}) => {
          /*
            Using the Freshdesk Query endpoint, instead of the list endpoint, there is no sort or limit and
            pagination would be painful.
            Luckily in our case we only need to show recent things and are unlikely to have more than a dozen at
            any time. So we will only care about limits from 1-30.
           */
          if (limit > -1 && limit < 30) {
            results = results.slice(0, limit);
          }
          return { total, results }
        })
        .then(({total, results}) => Promise.all(results.map(t => tickets.one(t.id, params))))
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

  }, [subdomain, auth, displayResolved, displayPending, updated_since, agent]);

  const fsItem    = children || NoticeboardItem;
  const NoTickets = noTickets || TicketsNoTickets;
  // console.log(fsItem);
  return (
    <ListGroup className="tickets">
      {response.length
       ? response.map((ticket) => fsItem({ticket, key: ticket.id}))
       : NoTickets()}
    </ListGroup>
  );
}

export default Noticeboard;
