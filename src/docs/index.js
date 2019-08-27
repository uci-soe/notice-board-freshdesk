import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LayoutNav from './layout/Nav';
import LayoutFooter from './layout/Footer';
import Home from './Home';
import Documentation from './Documentation';

import 'bootstrap/dist/css/bootstrap.css';
import './prism.css';
import './index.css';

import axios from 'axios';
import MockTickets, {initMock} from '../test-data/mock-tickets';
const mockCtrl = initMock(axios);

const title = 'Noticeboard Freshdesk';
const gh = 'uci-soe/notice-board-freshdesk';
// if using a root url, remove the basename value here and in BrowserRouter
const basename = process.env.REACT_APP_GH_PAGES_PATH ?
  `/${process.env.REACT_APP_GH_PAGES_PATH}` : '';

class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      subdomain: "ucieducation",
      authenticate: (username, password, subdomain) => {
        mockCtrl.reset();
        this.setState({
          auth: {username, password},
          subdomain
        });
      },
      reset: () => {
        mockCtrl.mock();
        this.setState({
          auth: {username: null, password: null},
          subdomain: "ucieducation"
        });
      }
    };
  }

  render() {
    return (
      <MockTickets.Provider value={this.state}>
        <BrowserRouter basename={basename}>
          <div className="App">
            <LayoutNav title={title} gh={gh} />
            {/* Begin Routes */}
            <Switch>
                <Route exact path="/" render={() => <Home title={title} gh={gh} />} />
                <Route path="/documentation" component={Documentation} />
            </Switch>
            {/* End Routes */}
            <LayoutFooter gh={gh} />
          </div>
        </BrowserRouter>
      </MockTickets.Provider>
    );
  }
};

export default Docs;
