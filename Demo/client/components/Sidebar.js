import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Form, FormLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../styles.scss';
const drawerWidth = 240;

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

  return (
    <Box sx={{ display: 'fixed' }}>
      <CssBaseline />
      <Drawer className = 'drawer'
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box', height:'100%', zIndex:'-1' }, //z-index
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List sx={{marginTop: '20px'}}>
            {['DacheQL', 'Using DacheQL', 'Getting Started', 'DacheQL with Redis', 'DacheQL with HTTP cache'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                 
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Technology Stack'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
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
            <p>
            DacheQL is an open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and implements caching to improve your website’s query efficiency
            </p>
          </div>
          <div>
            <h1>Using DacheQL</h1>
            <p>Prerequistes:
              <ul>
                <li>Redis installed if using Redis as your cache</li>
                <li>GraphQL schemas setup with your database</li>
                <li>Fullstack Application where frontend makes query request to backend</li>
              </ul>
            </p>
          </div>
        
          <div className='gettingstarted'>
            <h1>Getting Started</h1>
            <p>
          If this is your first time using DacheQL, run the following command in your terminal
            </p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
            npm install dacheql
                </pre>
                <CopyToClipboard text = 'npm install dacheql'>
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>In your server file, you want require in the our middleware to handle GraphQL request using the CommonJS format.</p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              const dacheql = require('dacheql');
                </pre>
                <CopyToClipboard text = "const dacheql = require('dacheql');">
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>DacheQL functionality depends on Express' built-in method express.json() middleware function in order to parse incoming JSON payloads.</p>
            <p id = 'below'>If you haven't already set up your server file with Express, add the following code to require Express: </p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              const express = require('express');
                </pre>
                <CopyToClipboard text = "const express = require('express');">
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>Add the following code to use the express.json() middleware function: </p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              app.use(express.json());
                </pre>
                <CopyToClipboard text = "app.use(express.json());">
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id='below'></p>
          </div>
        
          <div>
            <h1>Using DacheQL with Redis</h1>
            <p>
          DacheQL lets you decide if you would like to use Redis as your cache, or an HTTP cache. If you are using Redis, make sure you have Redis installed and your Redis server is running. To Run Redis, type the following command in your terminal:
            </p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
            redis-cli
                </pre>
                <CopyToClipboard text = 'redis-cli'>
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>
          Once your Redis server is up and running, type <code>PING</code> into the terminal where your Redis server is running and you should receive a <code>PONG</code> response. If you get this response, you are ready to use DacheQL with Redis!
            </p>
            <p>
            Now that your Redis server is up and running, in your backend server file, import Redis like so:
            </p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              const redis = require('redis');
                </pre>
                <CopyToClipboard text = "const redis = require('redis');">
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
         
            <p id = 'below'>
           After importing Redis, you will have to create your Redis client which can be done as so:
            </p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>const client = redis.createClient(REDIS_PORT);</pre>
                <CopyToClipboard text = "const client = redis.createClient(REDIS_PORT);">
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>
            Replace the text <code>REDIS_PORT</code> with your own Redis port (typically 6379)
            </p>
            <p>
            Lastly, connect your client!
            </p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
              client.connect();
                </pre>
                <CopyToClipboard text = "client.connect();">
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>

            <div>
              <p id = 'below'>
            In order to cache your graphQL query responses, all you have to do is call our DacheQL function as middleware in your /graphql endpoint. The parameters for our function are as follows:
              </p>
              <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
                <Card.Text className='code-text'>
                  <pre>
                    {string1}
                  </pre>
                  <CopyToClipboard text = "dacheQL({ redis } = {}, endpoint = '', TTL)">
                    <button className = 'copy-button'>Copy</button>
                  </CopyToClipboard>
                </Card.Text>
              </Card>
              <p id='below'>
            The first parameter is to let the function know where you are using Redis or not as your cache. If you are, you will have to pass Redis into the function as <code> {string4} </code> like so. The second parameter is the endpoint at which you are actually using GraphQL. For example, this endpoint may be <code>http://localhost:3000/graphql.</code> Our last paramter is the Time to Live, or how long you want this specific query to last in your cache for. This parameter is given in seconds, so make sure to convert the time you want the query to last in your Redis cache for into seconds. Now you are good to cache your GraphQL responses!
              </p>
            </div>
          </div>
        
          <div className='httpcache'>
            <h1>Using DacheQL with HTTP cache</h1>
            <p>If you are not using Redis caching, DacheQL provides a middleware for caching using the server's memory.</p>
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '3rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre>
                  {string2}
                </pre>
                <CopyToClipboard text = "app.use('/graphql', dacheql(), /* other middleware */);">
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id='below'>Use the following HTTPcache middleware prior to sending a response, so that the responses are cacheable.</p>    
            <Card className='code-box'style={{color: '#000', width: '50rem', height: '12rem', top: '10px'}}>
              <Card.Text className='code-text'>
                <pre> 
                  {string3}
                </pre>
                <CopyToClipboard text = {string3}>
                  <button className = 'copy-button'>Copy</button>
                </CopyToClipboard>
              </Card.Text>
            </Card>
            <p id = 'below'>Now, you have properly set up the middleware functions in order to use DacheQL's caching tools!</p>
          </div>
          <div className='built-with'>
            <h1>Technology Stack</h1>
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
