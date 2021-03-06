import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PrismCode } from 'react-prism';
import { dedent } from 'dentist';
import {
  Jumbotron,
  Button,
  Container,
  Col,
  Row
} from 'reactstrap';
import { Noticeboard } from '../components';
import Auth from './components/Auth';
import MockTickets from '../test-data/mock-tickets';

// import { freshdesk } from '../../.credentials.json'

const example = dedent(`
  import React from 'react';
  import { Noticeboard } from 'uci-soe/notice-board-freshdesk';

  const Example = () => {
    return (
        <Noticeboard subdomain="ucieducation" auth={freshdesk} limit={2} />
    );
  };

  export default Example;
`);


const Home = ({title, gh}) => {
  const { subdomain, auth } = useContext(MockTickets);

  return (
    <div>
      <Jumbotron tag="section" className="jumbotron-header text-center my-5">
        <Container fluid>
          <Row>
            <Col sm={{ size: 10, offset: 1}}>
              <h1 className="display-4">{title}</h1>
              <p className="lead my-3">
                A component built, documented & published with <a href="https://github.com/reactstrap/component-template">Component Template </a>
                that displays technical tasks assigned to the Technical Support Team at UCI School of Education.
              </p>
              <p>
                <Button outline color="danger" href={`https://github.com/${gh}`}>View on Github</Button>
                <Button tag={Link} color="danger" to="/documentation">Documentation</Button>
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container fluid>
        <Row style={{marginBottom: 70}}>
          <Col sm={{ size: 8, offset: 2 }}>
            <Auth />
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <h2>Getting Started</h2>
            <hr/>
            <p>
              Install and save the component to your project
            </p>
            <pre>
              <PrismCode className="language-bash">
                npm install uci-soe/notice-board-freshdesk --save
              </PrismCode>
            </pre>
            <p>
              ES6 - import the component you need
            </p>
            <div className="docs-example-custom">
                <Noticeboard subdomain={subdomain} auth={auth} limit={2} updated_since="2010-01-01"/>
            </div>
            <pre>
              <PrismCode className="language-jsx">
                {example}
              </PrismCode>
            </pre>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
