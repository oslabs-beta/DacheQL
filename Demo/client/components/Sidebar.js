import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {
  DropdownButton,
  Dropdown,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  FormLabel,
} from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../styles.scss';
import logo from './assets/runpig.png';

const drawerWidth = 260;

const Sidebar = () => {
  const string1 = `app.use(
    '/graphql', 
    dacheQL({ redis } = {<redis: client>}, capacity, endpoint, TTL),
    expressGraphQL({
      schema: schema,
      graphiql: true,
    })
  );`;
  const string2 = `app.use(
    '/graphql', 
    dacheQL({}, capacity, endpoint, TTL),
    expressGraphQL({
      schema: schema,
      graphiql: true,
    })
  );`;
  const string4 = '{redis: client}';
  const string5 = '{}';
  const hash = '#';

  const change = (num) => {
    const elem = document.getElementById(`button${num}`);
    if (elem.innerHTML === 'Copy') {
      elem.innerHTML = 'Copied!';
      elem.style.width = '75px';
    } else {
      elem.innerHTML = 'Copy';
      elem.style.width = '50px';
    }
  };

  return (
    <Box sx={{ display: 'fixed' }}>
      <CssBaseline />
      <Drawer
        className="drawer"
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: {
            width: drawerWidth,
            boxSizing: 'border-box',
            height: '100%',
            zIndex: '0',
            fontFamily: 'Inter',
          },
        }}
      >
        <Toolbar />
        <img src={logo} id="doclogo"></img>
        <Box sx={{ overflow: 'hidden' }} className="list">
          <List>
            {['DacheQL'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href="#top">
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['Using DacheQL'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href="#usingdacheql">
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['Getting Started'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href="#gettingstarted">
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['DacheQL with Redis'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href="#dacheqlwithredis">
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['DacheQL without Redis'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href="#dacheqlwithhttpcache">
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Technology Stack'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href="#techstack">
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="docsbg">
        <Toolbar />

        <div className="textbox">
          <div className="dacheqldocs">
            <h2>DacheQL</h2>
            <p>
            DacheQL is an open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and implements caching to improve your website’s query efficiency.
            </p>
          </div>
          <div id = 'usingdacheql'>
            <div id='breakline2' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1>Using DacheQL</h1>
            <p>
              Prerequistes:
              <ul>
                <li>Redis installed if you are using Redis as your cache.</li>
                <li>GraphQL schemas setup with your database.</li>
                <li>Fullstack Application where frontend makes query request to backend.</li>
              </ul>
            </p>
          </div>
         
          <div id='gettingstarted' className='gettingstarted' >
            <div id='breakline2' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1>Getting Started</h1>
            <p>
              If this is your first time using DacheQL, run the following command in your terminal:
            </p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>npm install dacheql</pre>
                <CopyToClipboard text="npm install dacheql">
                  <button className="copy-button" onClick={() => change(1)} id="button1">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id="below">
              In your server file, you want to require our middleware to handle GraphQL requests
              using the CommonJS format.
            </p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>const dacheql = require('dacheql');</pre>
                <CopyToClipboard text="const dacheql = require('dacheql');">
                  <button className="copy-button" onClick={() => change(2)} id="button2">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id="below">
              DacheQL functionality depends on Express' built-in method express.json() middleware
              function in order to parse incoming JSON payloads.
            </p>
            <p id="below">
              If you haven't already set up your server file with Express, add the following code to
              require Express:{' '}
            </p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>const express = require('express');</pre>
                <CopyToClipboard text="const express = require('express');">
                  <button className="copy-button" onClick={() => change(3)} id="button3">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id='below'>
              Add the following code to construct an Express application based on a GraphQL schema: 
            </p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>const expressGraphQL = require('express-graphql').graphqlHTTP;</pre>
                <CopyToClipboard text="const expressGraphQL = require('express-graphql').graphqlHTTP;">
                  <button className="copy-button" onClick={() => change(12)} id="button12">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>Add the following code to use the express.json() middleware function: </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              app.use(express.json());
                </pre>
                <CopyToClipboard text = "app.use(express.json());">
                  <button className = 'copy-button' onClick = {() => change(4)} id ='button4'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id="below"></p>
          </div>
        
          <div id = 'dacheqlwithredis'>
            <div id='breakline' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1>Using DacheQL with Redis</h1>
            <p>
              DacheQL lets you decide if you would like to use Redis, or our custom LRU eviction cache. If you are using Redis, make sure you have Redis installed and your Redis
              server is running. To run Redis, type the following command in your terminal:
            </p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>redis-cli</pre>
                <CopyToClipboard text="redis-cli">
                  <button className="copy-button" onClick={() => change(5)} id="button5">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id="below">
              Once your Redis server is up and running, type <code>PING</code> into the terminal
              where your Redis server is running and you should receive a <code>PONG</code>{' '}
              response. If you get this response, you are ready to use DacheQL with Redis!
            </p>
            <p>
              Now that your Redis server is up and running, in your backend server file, import
              Redis like so:
            </p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>const redis = require('redis');</pre>
                <CopyToClipboard text="const redis = require('redis');">
                  <button className="copy-button" onClick={() => change(6)} id="button6">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>

            <p id="below">
              After importing Redis, you will have to create your Redis client which can be done as
              so:
            </p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>const client = redis.createClient(REDIS_PORT);</pre>
                <CopyToClipboard text="const client = redis.createClient(REDIS_PORT);">
                  <button className="copy-button" onClick={() => change(7)} id="button7">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id="below">
              Replace the text <code>REDIS_PORT</code> with your own Redis port (typically 6379).
            </p>
            <p>Lastly, connect your client!</p>
            <Card
              className="code-box"
              style={{ color: '#000', width: '100%', height: '100%', top: '10px' }}
            >
              <Card.Text className="code-text">
                <pre>client.connect();</pre>
                <CopyToClipboard text="client.connect();">
                  <button className="copy-button" onClick={() => change(8)} id="button8">
                    Copy
                  </button>
                </CopyToClipboard>
              </Card.Text>
            </Card>

            <div>
              <p id="below">
                In order to cache your graphQL query responses, all you have to do is call our
                DacheQL function as middleware in your /graphql endpoint. The parameters for our
                function are as follows:
              </p>
              <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
                <Card.Text className='code-text'>
                  <pre>
                    {string1}
                  </pre>
                  <CopyToClipboard text = {string1}>
                    <button className = 'copy-button' onClick = {() => change(9)} id ='button9'>Copy</button>
                  </CopyToClipboard>
                </Card.Text>
              </Card>
              <p id='below'>
            The first parameter is to let the function know whether you are using Redis or not as your cache. If you are, you will have to pass Redis into the function as <code> {string4} </code> like so. <br></br> <br></br>The second parameter is the capacity for our custom LRU cache. If you are using Redis as your cache, just default to leaving the cache at 50. <br></br> <br></br> The third parameter is the endpoint at which you are actually using GraphQL. For example, this endpoint may be <code>http://localhost:3000/graphql.</code> <br></br> <br></br>Our last parameter is the Time to Live, or how long you want this specific query to last in your cache for. Pass in your time to live as seconds. Now you are good to cache your GraphQL responses!
              </p>
            </div>
          </div>
        
          <div className='httpcache' id = 'dacheqlwithhttpcache'>
            <div id='breakline2' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1>Using DacheQL without Redis</h1>
            <p>If you are not using Redis caching, DacheQL provides a middleware for caching using the server's memory with our custom cache that behaves with an LRU eviction policy. The arguments you should input for this middlware are as follows: <br></br> <br></br>For the first parameter, since you are not using Redis, simply pass in an empty object <code id='dacheqlwithhttpcache'> {string5} </code> like so. <br></br> <br></br>Next, is the capacity you would like your cache to hold. This capacity refers to when our cache will begin evicting items. For example, if you set the capacity to 50, it will evict an item upon the 51st unique query. It should be noted that if you pass in a non-whole number, it will be rounded down for you. Non integers, negative numbers, and capacities below two will default to simply creating a GraphQL fetch without storing values in the cache. <br></br> <br></br>The third parameter is the endpoint at which you are actually using GraphQL. For example, this endpoint may be <code>http://localhost:3000/graphql.</code> <br></br> <br></br>Our last parameter is the Time to Live, or how long you want this specific query to last in your cache for. Since we aren't using Redis here, just pass in anything for your TTL as our cache is not reliant on this information. Now you are good to cache your GraphQL responses! </p>
             
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
                  {string2}
                </pre>
                <CopyToClipboard text = {string2}>
                  <button className = 'copy-button' onClick = {() => change(10)} id ='button10'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
    
            <p id = 'below'>Now, you have properly set up the middleware functions in order to use DacheQL's caching tools!</p>
          </div>
          <div className="built-with">
            <div
              id="breakline2"
              style={{ borderTop: '3px solid lightgrey', marginLeft: 0, marginRight: 0 }}
            ></div>
            <h1 id="techstack">Technology Stack</h1>
            <ul>
              <li>GraphQL</li>
              <li>Typescript</li>
              <li>Redis</li>
              <li>Node/Express</li>
              <li>AWS RDS</li>
              <li>React</li>
              <li>Chart.js</li>
              <li>Boostrap</li>
              <li>Jest/Supertest</li>
              <li>Webpack</li>
            </ul>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default Sidebar;
