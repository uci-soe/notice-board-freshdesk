import React from 'react';
import {mount} from 'enzyme';
import axios from 'axios';
import Noticeboard from './Noticeboard';

import mockTickets from '../test-data/get-tickets';

mockTickets(axios);

describe('Noticeboard', () => {
  it('should render without crashing', () => {

    mount(<Noticeboard subdomain="ucieducation" />);
  });

  it('should retrieve all tickets', () => {

    const wrapper = mount(<Noticeboard subdomain="ucieducation">
      {(ticket) => (<h1 className="test" key={ticket.id}>{ticket.id}</h1>)}
    </Noticeboard>);

    wrapper.setState({
      response: [
        {id: 1},
        {id: 2}
      ]
    });

    expect(wrapper.find('.test')).toHaveLength(2);

  });

});
