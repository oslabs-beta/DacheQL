import React, {useState, useEffect} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Card, Container } from 'react-bootstrap';
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

  //react hook for building the chartjs graph
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  //this is gon hold all values of the times so that the line chart can know how to structure itself (data area)

  const [timeArray, setTimeArray] = useState([0]);

  //react hook for a boolean value that the incrementor will accept 
  const [booleanVal, setBooleanVal] = useState(false);

  // //label hook 
  // const [label, setLabel] = useState([]);

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
        // setLabel((label) => [...label, 'Starting Point']);
      }
      else if(i === 1) {
        labels.push('Uncached Data');
        // setLabel((label) => [...label, 'Uncached Data']);
      }

      else {
        labels.push('Cached data');
        // setLabel((label) => [...label, 'Cached Data']);
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
    console.log('boolean after setting: ', bool);
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
    // labels = [];
    
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
    // setLabel([]);
    // labels = [];
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
    // setLabel([]);
    // labels = [];
    
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
      return cache[queryString];
    }
    else{
      // console.log('running query!');
    // console.log('queryString: ', queryString);
    // console.log('json ver: ', JSON.stringify(queryString));
      //console.log('not from cache');
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
          //console.log('cache:', cache);
          // console.log('data: ', data);
          endTime = performance.now();
          const totalRunTime = (endTime - startTime);
          //update the react hook state for timetofetch
          setTimeToFetch([timeToFetch, totalRunTime]);
          // setTimeToFetch([timeToFetch, totalRunTime]);
          //react hook for updating the new jsonified resulting query for render purposes
          // const space = JSON.stringify(data, null, 2);
          // console.log('space: ', space);
          // console.log(JSON.stringify(data, null, 2));
          setResult(JSON.stringify(data, null, 2));
          // console.log('result',result);
          // console.log('time to fetch at else statement: ',timeToFetch);
          // incrementer(timeToFetch[1], cacheFetchTime);
          // console.log('timeArray: ', timeArray);
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


      
      <Line options={options} data={chartData} />
    
    </div>
  ); 
};

export default Demo;
