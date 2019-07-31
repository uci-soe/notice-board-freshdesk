import tickets from './tickets-stub';
import ticketids from './ticket-stub';
import MockAxios from 'axios-mock-adapter';

// to simulate calling axios get using locally-stored tickets
export default (axios) => {

  const mock = new MockAxios(axios);

  mock.onGet(/api\/v2\/tickets\/?$/i).reply(200, tickets);
  mock.onGet(/api\/v2\/tickets\/\d+\?/i).reply((config) => {
    const {url}   = config;
    const [_, id] = url.match(/api\/v2\/tickets\/(\d+)\?/i);

    return ticketids[id]
           ? [200, ticketids[id]]
           : [404, {}];
  });
}
