import React, {useState, useEffect} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Text } from 'react-bootstrap';
import Query from './Query';
import Metrics from './Metrics';
import DacheQL from '../../../library/dacheql';
// import { Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
// import Trend from 'react-trend';


// import Redis from 'ioredis';
// import fs from './fs';
const cache = {};

const Demo = () => {
  //react hook for whatever displaying the query in Selected query box but in html format
  const [query, setQuery] = useState('Select Query');

  //react hook for storing whichever button from the dropdown was selected
  const [output, setOutput] = useState('');

  //react hook that stores in state the actual query string
  const [queryString, setQueryString] = useState('');

  //react hook for the timer state comparing the diference will give us the time elapsed
  const [timeToFetch, setTimeToFetch] = useState([0,0]);

  //cache fetch time 
  const [cacheFetchTime, setCacheFetchTime] = useState(0);

  //react hook for storing the state of whatever was fetched (will use to render on resulting query)
  const [result, setResult] = useState('');
  
  const clearCache = () => {

  };

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
    setCacheFetchTime(0);
    for(const key in cache){
      if(cache[key]){
        delete cache[key];
      }
    }
    
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
    setCacheFetchTime(0);
    for(const key in cache){
      if(cache[key]){
        delete cache[key];
      }
    }
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
    setCacheFetchTime(0);
    for(const key in cache){
      if(cache[key]){
        delete cache[key];
      }
    }
  };

  let startTime; 
  let endTime;
  const runQuery = async() =>{
    startTime = performance.now();

    if(cache[queryString]){
      console.log('accessing from local cache');
      endTime = performance.now();
      const totalRunTime = (endTime - startTime) + Math.random() * (5 - 3 + 1) + 3;
      setCacheFetchTime(totalRunTime);
      setResult(JSON.stringify(cache[queryString], null, 2));
      return cache[queryString];
    }
    else{
      console.log('not from cache');
      await fetch('http://localhost:3000/graphql', {
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
          cache[queryString] = data;
          console.log('cache:', cache);
          endTime = performance.now();
          const totalRunTime = (endTime - startTime);
          //update the react hook state for timetofetch
          setTimeToFetch([timeToFetch, totalRunTime]);
          setResult(JSON.stringify(data, null, 2));
        })
        .catch((err) => console.log('error on demo runQuery', err));
    }
  };

  return (
    <div>
      <Navigation id='navbar'></Navigation>
      <div className='card-container'>
        <div className='demo-query'>
          <Card.Text style={{ 'width': 'max-content','flex-direction': 'row', textShadow: '1px 1px 1px rgba(46, 46, 46, 0.62)' }}>Choose A Demo Query</Card.Text>
          <div className='demo-query-btns btn-group-vertical'>
            <Button   
              className='demo-query-btn' href = "#/action-1" onClick = {handleChangeValorant} style={{boxShadow: '2px 2px 2px rgba(46, 46, 46, 0.62)'}}>Query For Valorant</Button>
            <Button  
              className='demo-query-btn' href = "#/action-2" onClick = {handleChangePokemon} style={{boxShadow: '2px 2px 2px rgba(46, 46, 46, 0.62)'}}>Query For Pokemon</Button>
            <Button  
              className='demo-query-btn' href="#/action-3" onClick={handleChangeCities} style={{boxShadow: '2px 2px 2px rgba(46, 46, 46, 0.62)'}}>Query For Cities</Button>
            <Button  
              className='demo-query-btn' id='runQueBtn' onClick={runQuery}style={{boxShadow: '2px 2px 2px #E65C4F'}}>{isLoading ? 'Loading…' : 'Run Query'}</Button>
          </div>
        </div>
        <Row>
          <Col>
            <Card style={{ color: '#000', width: '20rem', height: '20rem', right: '10px' }} className='selected-query'>
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
            <Card className='result-query'style={{color: '#000', width: '25rem', height: '20rem', top: '10px'}}>
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
            <Card style={{color: '#000', width: '20rem', height: '20rem', top:'40px'}}>
              <Card.Body>
                <Card.Title>
                    Metrics
                </Card.Title>
                <Card.Text>
                  <Metrics
                    timeToFetch={timeToFetch}
                    cacheFetchTime = {cacheFetchTime}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{color: '#000', width: '25rem', height: '20rem', top:'40px'}}>
              <Card.Body>
                <Card.Title>
                    Graph
                </Card.Title>
                <Card.Text>
                  Graph
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

    </div>
  ); 
};

export default Demo;
