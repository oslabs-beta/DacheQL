import React, {useState, useEffect} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Text } from 'react-bootstrap';
import Query from './Query';
import Metrics from './Metrics';
import DacheQL from '../../../library/dacheql';
// import fs from './fs';




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
  const [result, setResult] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  //upon change of drop down after selection set new values for react states for etc...
  const handleChangeValorant = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Valorant');
    setQueryString(`
    query  {
      valorant  {
        id
        name
        role
        ultimate
      }
    }
    `);
    setTimeToFetch([0, 0]);
  };

  const handleChangePokemon = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Pokemon');
    setQueryString(`
    query {
      pokemon  {
        id
        name
        type
        ability
      }
    }`);
    setTimeToFetch([0, 0]);
  };

  const handleChangeCities = (event) => {
    console.log(event.target.innerHTML);
    setQuery(event.target.innerHTML);
    setOutput('Query For Cities');
    setQueryString(`
    query {
      cities  {
        id 
        name
        population
        country_id
      }
    }`);
    setTimeToFetch([0, 0]);
  };

  let startTime; 
  let endTime;
  const runQuery = () =>{
    console.log('running query!');
    console.log('queryString: ', queryString);
    console.log('json ver: ', JSON.stringify(queryString));
    setIsLoading(true);
    console.log(isLoading);
    startTime = performance.now();
    // fetch('/graphql', options)
    fetch('http://localhost:3000/graphql', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: queryString,
      })
    })
      .then((res) => {

        return res.json();

      })
  
      .then((data) => {
        //update the second timer variable once fetch is finished 
        console.log('data: ', data);
        endTime = performance.now();
        const totalRunTime = (endTime - startTime);
        //update the react hook state for timetofetch
        setTimeToFetch([timeToFetch, totalRunTime]);
        //react hook for updating the new jsonified resulting query for render purposes
        // const space = JSON.stringify(data, null, 2);
        // console.log('space: ', space);
        console.log(JSON.stringify(data, null, 2));
        setResult(JSON.stringify(data, null, 2));
        setIsLoading(false);
        console.log('result',result);
      })
      .catch((err) => console.log('error on demo runQuery', err));
  };

  return (
    <div>
      <div id='navbar'>
        <Navigation></Navigation>
      </div>
      <Container>
        <div className='demo-query'>
          <Card.Text style={{ 'width': 'max-content','flex-direction': 'row' }}>Choose A Demo Query</Card.Text>
          <div className='demo-query-btns btn-group-vertical'>
            <Button  variant="secondary"  className='demo-query-btn' href = "#/action-1" onClick = {handleChangeValorant} >Query For Valorant</Button>
            <Button variant="secondary"  className='demo-query-btn' href = "#/action-2" onClick = {handleChangePokemon} >Query For Pokemon</Button>
            <Button variant="secondary" className='demo-query-btn' href="#/action-3" onClick={handleChangeCities} >Query For Cities</Button>
            <Button variant="secondary" className='demo-query-btn' id='runQueBtn' onClick={runQuery}>{isLoading ? 'Loading…' : 'Run Query'}</Button>
          </div>
        </div>

        <Container className='card-container'>
          <Row>
            <Col>
              <Card style={{ color: '#000', width: '20rem', height: '20rem' }} className='selected-query'>
                <Card.Body>
                  <Card.Title className='selected-query'>
                  Selected Query:
                  </Card.Title>
              
                  <Card.Text className='selected-query'>
                    <Query output = {output} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='result-query'style={{color: '#000', width: '30rem', height: '20rem'}}>
                <Card.Body>
                  <Card.Title className='result-query'>
                  Resulting Query:
                  </Card.Title>
                  <Card.Text className='result-query'>
                    <pre>
                      <code>{result}</code>
                    </pre>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
            

          <Row>
            <Col>
              <Card style={{color: '#000', width: '20rem', height: '20rem'}}>
                <Card.Body>
                  <Card.Title>
                    Metrics
                  </Card.Title>
                  <Card.Text>
                    <Metrics
                      timeToFetch = {timeToFetch} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{color: '#000', width: '30rem', height: '20rem'}}>
                <Card.Body>
                  <Card.Title>
                    Gragh
                  </Card.Title>
                  <Card.Text>
                  Graph
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

            

      </Container>
    </div>
  ); 
};

export default Demo;
