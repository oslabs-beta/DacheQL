import React, {useState, useEffect} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Card, Container } from 'react-bootstrap';
import Query from './Query';
import Metrics from './Metrics';
import DacheQL from '../../../library/dacheql';
import { Bar  } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
} from 'chart.js';



// import Redis from 'ioredis';
// import fs from './fs';
const cache = {};

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);


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

  //react hook for data for chartjs
  const [chartData, setChartData] = useState({
    datasets: [],
  });


  //useffect hook on dom content loaded the chart will be created
  useEffect(() => {
    setChartData({
      // type: 'horizontalBar',
      labels: ['Uncached Data (ms)', 'Cached Data (ms)'],
      datasets: [
        {
          label: 'Response Times',
          data: [timeToFetch[1],timeToFetch[0]],
          border: 'rgb(153,31,173)',
          backgroundColor: 'rgba(153,31,173,0.4)',
        }
      ]
    });
  },[timeToFetch]);


  const config = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

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
    
  };

  let startTime; 
  let endTime;
  const runQuery = async() =>{
    startTime = performance.now();

    if(cache[queryString]){
      console.log('accessing from local cache');
      endTime = performance.now();
      const totalRunTime = (endTime - startTime);
      setCacheFetchTime(totalRunTime);
      return cache[queryString];
    }
    else{
      // console.log('running query!');
    // console.log('queryString: ', queryString);
    // console.log('json ver: ', JSON.stringify(queryString));
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
          // console.log('data: ', data);
          endTime = performance.now();
          const totalRunTime = (endTime - startTime);
          //update the react hook state for timetofetch
          setTimeToFetch([timeToFetch, totalRunTime]);
          //react hook for updating the new jsonified resulting query for render purposes
          // const space = JSON.stringify(data, null, 2);
          // console.log('space: ', space);
          // console.log(JSON.stringify(data, null, 2));
          setResult(JSON.stringify(data, null, 2));
        // console.log('result',result);
        })
        .catch((err) => console.log('error on demo runQuery', err));
    }

    
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
      <Dropdown  >
        <Dropdown.Toggle variant = "secondary" id ="query-dropdown">
          {query}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href = "#/action-1" onClick = {handleChangeValorant} >Query For Valorant</Dropdown.Item>
          <Dropdown.Item href = "#/action-2" onClick = {handleChangePokemon} >Query For Pokemon</Dropdown.Item>
          <Dropdown.Item href = "#/action-3" onClick = {handleChangeCities} >Query For Cities</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Card style={{color: '#000', width: '20rem', height: '20rem'}}>
        <Card.Body>
          <Card.Title>
            Metrics
          </Card.Title>
          <Card.Text>
            <Metrics
              timeToFetch = {timeToFetch}
              cacheFetchTime = {cacheFetchTime} />
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className='result-query'style={{color: '#000', width: '20rem', height: '20rem'}}>
        <Card.Body>
          <Card.Title>
            Resulting Query
          </Card.Title>
          <Card.Text>
            <pre>
              <code>{result}</code>
            </pre>
          </Card.Text>
        </Card.Body>
      </Card>


      
      <Bar options={config} data={chartData} />
    
    </div>
  ); 
};

export default Demo;
