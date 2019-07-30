import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import sinon from 'sinon';
import Noticeboard from './Noticeboard';
import tickets from '../../tickets-stub.json';
import ticketids from '../../ticket-stub.json';

const getTickets = (url, data) => {
    if (/api\/v2\/tickets\/?\?/i.test(url)) {
        return Promise.resolve({data: tickets})
    } else if (/api\/v2\/tickets\/\d+\?/i.test(url)) {
        const [_, id] = url.match(/api\/v2\/tickets\/(\d+)\?/i);
        return ticketids[id] 
            ? Promise.resolve({ data: ticketids[id] }) 
            : Promise.reject({});
    }
    return Promise.reject({});
}

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
