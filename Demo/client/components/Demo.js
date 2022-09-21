import React, {useState} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Card, Container } from 'react-bootstrap';
import Query from './Query';
import Metrics from './Metrics';


const Demo = () => {
  const [query, setQuery] = useState('Select Query');
  const [output, setOutput] = useState('');
  const [queryString, setQueryString] = useState('');

  const handleChangeValorant = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Valorant');
  };

  const handleChangePokemon = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Pokemon');
  };

  const handleChangeCities = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Cities');
  };

  const runQuery = () =>{
    console.log('running query!');
  };

  return (
    <div>
      <Navigation></Navigation>
      <Button onClick = {runQuery}>Run Query</Button>
      <Card style={{color: '#000', width: '20rem', height: '20rem'}}>
        <Card.Body>
          <Card.Title>
            Selected Query:
          </Card.Title>
          <Card.Text>
            <Query output = {output} />
          </Card.Text>
        </Card.Body>
      </Card>
      <Dropdown >
        <Dropdown.Toggle variant = "secondary" id ="query-dropdown">
          {query}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href = "#/action-1" onClick = {handleChangeValorant}>Query For Valorant</Dropdown.Item>
          <Dropdown.Item href = "#/action-2" onClick = {handleChangePokemon}>Query For Pokemon</Dropdown.Item>
          <Dropdown.Item href = "#/action-3" onClick = {handleChangeCities}>Query For Cities</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Card style={{color: '#000', width: '20rem', height: '20rem'}}>
        <Card.Body>
          <Card.Title>
            Metrics
          </Card.Title>
          <Card.Text>
            <Metrics />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  ); 
};

export default Demo;
