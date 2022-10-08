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
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Form, FormLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../styles.scss';
import logo from './assets/runpig.png';


const drawerWidth = 260;

const Sidebar = () => {
  const string1 = 'dacheQL({ redis } = {}, endpoint = \'\', TTL)';
  const string2 = 'app.use(\'/graphql\', dacheql(), /* other middleware */);';
  const string3 = `app.use( 
    '/graphql',
    dacheql(),
    httpCache(),
    graphqlHTTP({ schema: schema, graphiql: true })
);`;
  const string4 = '{redis: client}';
  const hash = '#';

  const change = (num) => {
    const elem = document.getElementById(`button${num}`);
    if(elem.innerHTML === 'Copy'){
      elem.innerHTML = 'Copied!';
      elem.style.width = '75px';
    }
    else{
      elem.innerHTML = 'Copy';
      elem.style.width = '50px';
    }
  };

  // const onNavClick = (event, id) => {
  //   const element = document.getElementById(id);
  //   event.preventDefault();
  //   element.scrollIntoView();
  //   window.history.pushState(id, id);
  // };

  return (
    <Box sx={{ display: 'fixed' }}>
      <CssBaseline />
      <Drawer 
        className = 'drawer'
        variant="permanent"
        open
        sx={{
          display: {xs: 'none', sm: 'block'},
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box', height:'100%', zIndex:'0', fontFamily: 'Inter'}, 
        }}
      >
        <Toolbar /> 
        <img src={logo} id="doclogo"></img>
        <Box sx={{ overflow: 'hidden' }} className = 'list' >
          <List>
            {['DacheQL'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href = '#top'>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['Using DacheQL'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href = '#usingdacheql'>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['Getting Started'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href = '#gettingstarted'>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['DacheQL with Redis'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href = '#dacheqlwithredis'>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {['DacheQL with HTTP cache'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href = '#dacheqlwithhttpcache'>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Technology Stack'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href = '#techstack'>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='docsbg'>
        <Toolbar />
    
        <div className='textbox'>
          <div className = 'dacheqldocs'>
            <h2>DacheQL</h2>
            <p id = 'usingdacheql'>
            DacheQL is an open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and implements caching to improve your website’s query efficiency
            </p>
          </div>
          <div>
            <div id='breakline2' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1>Using DacheQL</h1>
            <p>Prerequistes:
              <ul>
                <li>Redis installed if using Redis as your cache</li>
                <li>GraphQL schemas setup with your database</li>
                <li id='gettingstarted'>Fullstack Application where frontend makes query request to backend</li>
              </ul>
            </p>
          </div>
         
          <div className='gettingstarted' >
            <div id='breakline2' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1>Getting Started</h1>
            <p>
          If this is your first time using DacheQL, run the following command in your terminal
            </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
            npm install dacheql
                </pre>
                <CopyToClipboard text = 'npm install dacheql'>
                  <button className = 'copy-button' onClick = {() => change(1)} id ='button1'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>In your server file, you want to require our middleware to handle GraphQL request using the CommonJS format.</p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              const dacheql = require('dacheql');
                </pre>
                <CopyToClipboard text = "const dacheql = require('dacheql');">
                  <button className = 'copy-button' onClick = {() => change(2)} id ='button2'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>DacheQL functionality depends on Express' built-in method express.json() middleware function in order to parse incoming JSON payloads.</p>
            <p id = 'below'>If you haven't already set up your server file with Express, add the following code to require Express: </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              const express = require('express');
                </pre>
                <CopyToClipboard text = "const express = require('express');">
                  <button className = 'copy-button' onClick = {() => change(3)} id ='button3'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>Add the following code to use the express.json() middleware function: </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre id = 'dacheqlwithredis'>
              app.use(express.json());
                </pre>
                <CopyToClipboard text = "app.use(express.json());">
                  <button className = 'copy-button' onClick = {() => change(4)} id ='button4'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id='below'></p>
          </div>
        
          <div>
            <div id='breakline' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1 >Using DacheQL with Redis</h1>
            <p>
          DacheQL lets you decide if you would like to use Redis as your cache, or an HTTP cache. If you are using Redis, make sure you have Redis installed and your Redis server is running. To run Redis, type the following command in your terminal:
            </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
            redis-cli
                </pre>
                <CopyToClipboard text = 'redis-cli'>
                  <button className = 'copy-button' onClick = {() => change(5)} id ='button5'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>
          Once your Redis server is up and running, type <code>PING</code> into the terminal where your Redis server is running and you should receive a <code>PONG</code> response. If you get this response, you are ready to use DacheQL with Redis!
            </p>
            <p>
            Now that your Redis server is up and running, in your backend server file, import Redis like so:
            </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              const redis = require('redis');
                </pre>
                <CopyToClipboard text = "const redis = require('redis');">
                  <button className = 'copy-button' onClick = {() => change(6)} id ='button6'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
         
            <p id = 'below'>
           After importing Redis, you will have to create your Redis client which can be done as so:
            </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>const client = redis.createClient(REDIS_PORT);</pre>
                <CopyToClipboard text = "const client = redis.createClient(REDIS_PORT);">
                  <button className = 'copy-button' onClick = {() => change(7)} id ='button7'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>
            Replace the text <code>REDIS_PORT</code> with your own Redis port (typically 6379)
            </p>
            <p>
            Lastly, connect your client!
            </p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              client.connect();
                </pre>
                <CopyToClipboard text = "client.connect();">
                  <button className = 'copy-button' onClick = {() => change(8)} id ='button8'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>

            <div>
              <p id = 'below'>
            In order to cache your graphQL query responses, all you have to do is call our DacheQL function as middleware in your /graphql endpoint. The parameters for our function are as follows:
              </p>
              <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
                <Card.Text className='code-text'>
                  <pre>
                    {string1}
                  </pre>
                  <CopyToClipboard text = "dacheQL({ redis } = {}, endpoint = '', TTL)">
                    <button className = 'copy-button' onClick = {() => change(9)} id ='button9'>Copy</button>
                  </CopyToClipboard>
                </Card.Text>
              </Card>
              <p id='below'>
            The first parameter is to let the function know where you are using Redis or not as your cache. If you are, you will have to pass Redis into the function as <code  id = 'dacheqlwithhttpcache'> {string4} </code> like so. The second parameter is the endpoint at which you are actually using GraphQL. For example, this endpoint may be <code>http://localhost:3000/graphql.</code> Our last parameter is the Time to Live, or how long you want this specific query to last in your cache for. This parameter is given in seconds, so make sure to convert the time you want the query to last in your Redis cache for into seconds. Now you are good to cache your GraphQL responses!
              </p>
            </div>
          </div>
        
          <div className='httpcache'>
            <div id='breakline2' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1>Using DacheQL with HTTP cache</h1>
            <p>If you are not using Redis caching, DacheQL provides a middleware for caching using the server's memory.</p>
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
                  {string2}
                </pre>
                <CopyToClipboard text = "app.use('/graphql', dacheql(), /* other middleware */);">
                  <button className = 'copy-button' onClick = {() => change(10)} id ='button10'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id='below'>Use the following HTTPcache middleware prior to sending a response, so that the responses are cacheable:</p>    
            <Card className='code-box'style={{color: '#000', width: '100%', height: '100%', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre> 
                  {string3}
                </pre>
                <CopyToClipboard text = {string3}>
                  <button className = 'copy-button' onClick = {() => change(11)} id ='button11'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>Now, you have properly set up the middleware functions in order to use DacheQL's caching tools!</p>
          </div>
          <div className='built-with'>
            <div id='breakline2' style={{ borderTop: "3px solid lightgrey", marginLeft: 0, marginRight: 0 }}></div>
            <h1 id = 'techstack'>Technology Stack</h1>
            <ul>
              <li>GraphQL</li>
              <li>Redis</li>
              <li>Chart.js</li>
              <li>React</li>
              <li>Typescript</li>
              <li>Jest</li>
              <li>Node</li>
            </ul>
          </div>
        </div>
        
      </Box>
    </Box>
  );
};
export default Sidebar;
