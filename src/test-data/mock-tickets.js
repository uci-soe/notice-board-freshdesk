import React from 'react';
import tickets from './tickets-stub';
import ticketids from './ticket-stub';
import MockAxios from 'axios-mock-adapter';

export default React.createContext(
{
  auth: {},
  subdomain: '',
  reset: () => {},
  authenticate: () => {}
});

class Mock {
  constructor(axios) {
    this._axios = axios;
    this._mock = new MockAxios(this._axios);

    this.mock();
  }

  reset() {
    console.log("mock is restored")
    this._mock.reset();
    this._mock.onAny().passThrough();
  }

  mock() {
    console.log("mock is called");
    this._mock.reset();
    this._mock.onGet(/api\/v2\/tickets\/?/i).reply(200, tickets);
  }
}

let instance;
// to simulate calling axios get using locally-stored tickets
export const initMock = (axios) => {
  return instance || (instance = new Mock(axios));
};
