import tickets from './tickets-stub';
import ticketids from './ticket-stub';
import MockAxios from 'axios-mock-adapter';

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



  // let err = new Error('No matching url');
  // err.url = url;
  // err.data = data;
  // err.status = 404;
  //
  // if (/api\/v2\/tickets\/?$/i.test(url)) {
  //   return Promise.resolve(v)
  // } else if (/api\/v2\/tickets\/\d+\?/i.test(url)) {
  //   const [_, id] = url.match(/api\/v2\/tickets\/(\d+)\?/i);
  //
  //   err.message = `ticket ${id} not found`;
  //   return ticketids[id]
  //          ? Promise.resolve({ data: ticketids[id] })
  //          : Promise.reject(err);
  // }
  //
  // return Promise.reject(err);
}
