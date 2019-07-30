import tickets from './tickets-stub';
import ticketids from './ticket-stub';

export default (url, data) => {
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
