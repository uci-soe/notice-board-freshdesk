import React, {useState, useContext} from 'react';
import {  Button,
  Input,
  Form, FormGroup, Label
} from 'reactstrap';
import MockTickets from '../../test-data/mock-tickets';

const Auth = () => {
  const [subdomain, setSubdomain] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {reset, authenticate} = useContext(MockTickets);

  const paraStyle = {
    color: '#34495e',
    fontSize: 14
  }

  const onSubmit = (func) => {
    return (e) => {
      e.preventDefault();
      func(e);
    }
  }

  return (
    <div>
      <p style={paraStyle}>NOTE: This site presents a mockup of Freshdesk API calls due to confidentiality reasons.
        If you have a valid Freshdesk credential and would like to see the real Freshdesk calls,
        please login using your username and password.
      </p>
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="subdomain" className="mr-sm-2">Subdomain:</Label>
          <Input type="text" name="subdomain" id="subdomain" placeholder="<subdomain>.freshdesk.com" 
            value={subdomain} onChange={e => setSubdomain(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Email:</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Freshdesk Username" 
            value={email} onChange={e => setEmail(e.target.value)}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Password:</Label>
          <Input type="text" name="password" id="examplePassword" placeholder="Freshdesk Password" 
            value={password} onChange={e => setPassword(e.target.value)}/>
        </FormGroup>
        <Button type="submit" color="danger" 
          onClick={onSubmit(() => authenticate(email, password, subdomain))}
          >Submit</Button>
        <Button color="primary" onClick={onSubmit(reset)}>Reset</Button>
      </Form>
    </div>
  );
};

export default Auth;