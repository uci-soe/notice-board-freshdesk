import React from 'react';
import DocumentComponent from '../layout/DocumentComponent';
import { Noticeboard } from '../../components';
// import { freshdesk } from '../../../.credentials.json';

import axios from 'axios';
import mockTickets from '../../test-data/mock-tickets';
mockTickets(axios);

const components = [];
// Add your component proptype data here
// multiple component proptype documentation supported
components.push({
  name: 'Noticeboard',
  proptypes: `
{
    auth: PropTypes.dict,
    subdomain: PropTypes.string,
    limit: PropTypes.int,
    skip: PropTypes.int,
    order_by: PropTypes.string,
    order_type: PropTypes.string
}
  `
});

const examples = [];
// Add your component example data here
// multiple examples supported
examples.push({
  name: 'Noticeboard - Standard',
  demo: (
    <Noticeboard subdomain="ucieducation" limit={1}/>
  ),
  source: `
    <Noticeboard subdomain="ucieducation" auth={freshdesk} limit={1}/>
  `
});

examples.push({
    name: 'Noticeboard - Customization 1',
    demo: (
        <Noticeboard subdomain="ucieducation" limit={2} order_by="updated_at" order_type="asc"/>
    ),
    source: `
    <Noticeboard subdomain="ucieducation" auth={freshdesk}>
        {(ticket) => (<div>
            {ticket.id}
        </div>)}
    </Noticeboard>
    `
});

examples.push({
    name: 'Noticeboard - Customization 2',
    demo: (
        <Noticeboard subdomain="ucieducation">
            {({ticket}) => (<div key={ticket.id}>{ticket.id}</div>)}
        </Noticeboard>
    ),
    source: `
    <Noticeboard subdomain="ucieducation" auth={freshdesk}>
        {(ticket) => (<div>
            {ticket.id}
        </div>)}
    </Noticeboard>
    `
});

const Documentation = () => {
  return (
    <DocumentComponent
      name="Noticeboard"
      components={components}
      examples={examples}>
      <p>Noticeboard is a component that displays technical tasks assigned by the UCI School of Education
          by calling Freshdesk's APIs. Noticeboard is highly customizable, which users can specify the number 
          of tickets, the order types, etc. 
      </p>
      <p>A Noticeboard ticket (aka. question/issue in forums) contains the following: </p>
        <dl>
            <dt><pre>id</pre></dt>
            <dd>- each ticket has its unique id (not displayed in standard view)</dd>
            <dt><pre>requester.name</pre></dt>
            <dd>- the person who asks for help</dd>
            <dt><pre>created_at</pre></dt>
            <dd>- the time (in PST) that a ticket is submitted</dd>
            <dt><pre>subject</pre></dt>
            <dd>- the title of the ticket</dd>
            <dt><pre>description_text</pre></dt>
            <dd>- snapshot of the first ~250 characters of ticket description</dd>
            <dt><pre>tags</pre></dt>
            <dd>- tag technical assistants who will help with the ticket issue</dd>
            <dt><pre>status</pre></dt>
            <dd>- status of a ticket: open, pending, resolved, closed</dd>
            <dt><pre>priority</pre></dt>
            <dd>- importance of tickets: low, medium, high</dd>
        </dl>
        <p>It is not required to get all specified fields above at once when calling the Noticeboard
            component. Users may choose to only retrieve parts (e.g. ticket id) of tickets. See examples below.
        </p>
        <hr />
        <p>Note: This site presents a mockup of Freshdesk API calls due to confidentiality reasons.</p>
    </DocumentComponent>
  );
};

export default Documentation;
