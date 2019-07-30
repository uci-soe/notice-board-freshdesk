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
      skip: PropTypes.int
    }
  `
});

const examples = [];
// Add your component example data here
// multiple examples supported
examples.push({
  name: 'Noticeboard - Standard',
  demo: (
    <Noticeboard subdomain="ucieducation" limit={1} />
  ),
  source: `
    <Noticeboard subdomain="ucieducation" auth={freshdesk} limit={1}/>
  `
});


examples.push({
    name: 'Noticeboard - Customization',
    demo: (
        <Noticeboard subdomain="ucieducation" >
            {({ticket}) => (<div key={ticket.id}>{ticket.id}</div>)}
        </Noticeboard>
    ),
    source: `
    // pull out just ticket ids
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
          via calling Freshdesk's APIs.
      </p>
    </DocumentComponent>
  );
};

export default Documentation;
