import React, {useState} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Card, Container } from 'react-bootstrap';
import Query from './Query';
import Metrics from './Metrics';
import DacheQL from '../../../library/dacheql';


const Demo = () => {
  //react hook for whatever displaying the query in Selected query box but in html format
  const [query, setQuery] = useState('Select Query');

  //react hook for storing whichever button from the dropdown was selected
  const [output, setOutput] = useState('');

  //react hook that stores in state the actual query string
  const [queryString, setQueryString] = useState('');

  //react hook for the timer state comparing the diference will give us the time elapsed
  const [timeToFetch, setTimeToFetch] = useState([0,0]);

  //react hook for storing the state of whatever was fetched (will use to render on resulting query)
  const [result, setResult] = useState({});


  //upon change of drop down after selection set new values for react states for etc...
  const handleChangeValorant = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Valorant');
    setQueryString(`
    {
      valorant  {
        id,
        name,
        role,
        ultimate
      }
    }
    `);
  };

  const handleChangePokemon = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Pokemon');
    setQueryString(`{
      pokemon  {
        id
        name
        type
        ability
      }
    }`);
  };

  const handleChangeCities = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Cities');
    setQueryString(`{
      cities  {
        id 
        name
        population
        country_id
      }
    }`);
  };

  //instantiate 2 variables at time trackers for the timeToFetch state
  let startTime; 
  let endTime;
  const runQuery = () =>{
    console.log('running query!');
    console.log('queryString: ', queryString);
    console.log('json ver: ', JSON.stringify(queryString));
    //as soon as they click button
    startTime = performance.now();
    fetch('/graphql', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        queryString
      })
    })
      .then((res) => res.json())
      .then((data) => {
        //update the second timer variable once fetch is finished 
        console.log('data: ', data);
        endTime = performance.now();
        const totalRunTime = (endTime - startTime);
        //update the react hook state for timetofetch
        setTimeToFetch([...timeToFetch, totalRunTime]);
        //react hook for updating the new jsonified resulting query for render purposes
        setResult(JSON.stringify(data));
      })
      .catch((err) => console.log('error on demo runQuery', err));
  };

  const handleChange = (event) => {
    //resets the fetch time whenever they change the query
    setTimeToFetch([0,0]);
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
      <Dropdown onChange={handleChange} >
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

      <Card style={{color: '#000', width: '20rem', height: '20rem'}}>
        <Card.Body>
          <Card.Title>
            Resulting Query
          </Card.Title>
          <Card.Text>
            
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  ); 
};

export default Demo;
