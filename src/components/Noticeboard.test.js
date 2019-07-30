import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import sinon from 'sinon';
import Noticeboard from './Noticeboard';
import tickets from '../../tickets-stub.json';
import ticketids from '../../ticket-stub.json';

import getTickets from '../get-tickets';

describe('Noticeboard', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.createSandbox());
    afterEach(() => sandbox.restore());

    it('should render without crashing', () => {
        sandbox.stub(axios, 'get').callsFake(getTickets);

        mount(<Noticeboard subdomain="ucieducation" />);
    });

    it('should retrieve all tickets', () => {
        sandbox.stub(axios, 'get').callsFake(getTickets);

        const wrapper = mount(<Noticeboard subdomain="ucieducation">
            {(ticket) => (<h1 className="test">{ticket.id}</h1>)}
        </Noticeboard>);
        expect(wrapper.find('h1.test')).toHaveLength(6);

    });

});
