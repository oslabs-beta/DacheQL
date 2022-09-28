import React, {useState, useEffect} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Text } from 'react-bootstrap';
import Query from './Query';
import Metrics from './Metrics';
import DacheQL from '../../../library/dacheql';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const cache = {/*query: queried result => 10 most recent ones*/};
//counter to keep track for our incrementer function globally declared
let counter = 0;
//global variable for labels 
// let labels = [];

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
  const [cacheFetchTime, setCacheFetchTime] = useState([0]);

  //react hook for storing the state of whatever was fetched (will use to render on resulting query)
  const [result, setResult] = useState('');
  
  const clearCache = () => {

  };

  const [isLoading, setIsLoading] = useState(false);

  //react hook for building the chartjs graph
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  //this is gon hold all values of the times so that the line chart can know how to structure itself (data area)

  const [timeArray, setTimeArray] = useState([0]);

  //react hook for a boolean value that the incrementor will accept 
  const [booleanVal, setBooleanVal] = useState(false);

  //options for line chart
  const options = {
    responsive: false, 
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position:'top',
      },
    },
    scales: {
      yAxes: {
        beginAtZero: true,
      },
    },
  };


  //everytime the timearray length changes we are rerendering the chart to account for that with new labels for nodes

  useEffect(() => {

    const labels = [];
    
    //dynamically updates the label for each node on line chart after the first uncached node
    for (let i = 0; i < timeArray.length; i++) {

      if (i === 0) {
        labels.push('Starting Point');
      }
      else if(i === 1) {
        labels.push('Uncached Data');
      }

      else {
        labels.push('Cached data');
      }
    }
    
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Response Times',
          data: timeArray,
          border: 'rgb(153,31,173)',
          backgroundColor: 'rgba(153,31,173,0.4)', 
        }
      ]
    });
    console.log('useEffect timearray: ', timeArray);
    //console.log('chartdata length: ', Object.keys(chartData).length);
  },[timeArray]);
  
  //instead of calling incremeneter inside the runquery we just call it everytime either of the times change

  useEffect( () => {
    // console.log('time to fetch: ', timeToFetch);
    // console.log('cache fetch time: ', cacheFetchTime);
    incrementer(timeToFetch[1], cacheFetchTime[0],booleanVal);
  },[timeToFetch]);

  useEffect( () => {
    // console.log('time to fetch: ', timeToFetch);
    // console.log('cache fetch time: ', cacheFetchTime);
    incrementer(timeToFetch[1], cacheFetchTime[0],booleanVal);
  },[cacheFetchTime]);


  console.log('chartdata: ', chartData);

  //function to incremement a counter so that the first element of the array 
  //is the uncached time and it isnt ever repeated 
  const incrementer = (uncachedData, cachedData, bool) => {
    // console.log('cache data: ', cachedData, 'uncache data: ', uncachedData);
    // console.log(typeof cachedData);
    //control flow to check the state of the booleanval hook and then if its switched i will reassign counter to 0 to begin again
    // console.log('boolean after setting: ', bool);
    if(bool === true) {
      counter = 0;
      setBooleanVal(false);
    }
    console.log('counter ', counter);
    if(counter < 1) {
      counter++;
    }else if(counter === 1) {
      setTimeArray((timeArray) => [...timeArray, uncachedData ]);
      //console.log('timeArrayIncrementor: ', timeArray);
      counter++;
    } else {
      setTimeArray((timeArray) => [...timeArray, cachedData]);
      //console.log('timeArrayIncrementor: ', timeArray);
      counter++;
    }
  };

  //useffect hook on dom content loaded the chart will be created
  // useEffect(() => {
  //   setChartData({
  //     // type: 'horizontalBar',
  //     labels: ['Uncached Data (ms)', 'Cached Data (ms)'],
  //     datasets: [
  //       {
  //         label: 'Response Times',
  //         data: [timeToFetch[1],cacheFetchTime],
  //         border: 'rgb(153,31,173)',
  //         backgroundColor: 'rgba(153,31,173,0.4)',
  //       }
  //     ]
  //   });
  // },[timeToFetch,cacheFetchTime]);


  // const config = {
  //   indexAxis: 'y',
  //   elements: {
  //     bar: {
  //       borderWidth: 2,
  //     },
  //   },
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'right',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Horizontal Bar Chart',
  //     },
  //   },
  // };

  //upon change of drop down after selection set new values for react states for etc...
  const handleChangeValorant = (event) => {
    //console.log(event.target.innerHTML);
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
    setCacheFetchTime([0]);
    //resets the time array when switching queries
    setTimeArray([0]);
    // setLabel([]);
    //reset the chart render to its original state 
    setChartData({
      datasets: [],
    });
    setBooleanVal(true);
    for(const key in cache){
      if(cache[key]){
        delete cache[key];
      }
    }
    
  };

  const handleChangePokemon = (event) => {
    //console.log(event.target.innerHTML);
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
    setCacheFetchTime([0]);
    //resets the time array when switching queries
    setTimeArray([0]);
    //reset the chart render to its original state 
    setChartData({
      datasets: [],
    });
    setBooleanVal(true);
    for(const key in cache){
      if(cache[key]){
        delete cache[key];
      }
    }
  };

  const handleChangeCities = (event) => {
    //console.log(event.target.innerHTML);
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
    setCacheFetchTime([0]);
    //resets the time array when switching queries
    setTimeArray([0]);
    //reset the chart render to its original state 
    setChartData({
      datasets: [],
    });
    setBooleanVal(true);
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
      //console.log('accessing from local cache');
      setResult(JSON.stringify(cache[queryString,null,2]));
      // incrementer(timeToFetch[1], cacheFetchTime);
      endTime = performance.now();
      console.log('startTime: ', startTime, 'endTime: ', endTime);
      const totalRunTime = (endTime - startTime);
      setCacheFetchTime([totalRunTime]);
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
              className='demo-query-btn' id='runQueBtn' onClick={runQuery}style={{boxShadow: '2px 2px 2px rgba(46, 46, 46, 0.62)'}}>{isLoading ? 'Loading…' : 'Run Query'}</Button>
          </div>
        </div>
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
            <Card className='result-query'style={{color: '#000', width: '25rem', height: '20rem'}}>
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
                    timeToFetch={timeToFetch}
                    cacheFetchTime = {cacheFetchTime}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{color: '#000', width: '25rem', height: '20rem'}}>
              <Card.Body>
                <Card.Title>
                  <Line options = {options} data = {chartData}/>
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
