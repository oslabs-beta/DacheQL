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
  return (
    <Box sx={{ display: 'fixed' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', height:'100%', zIndex:'-1' }, //z-index
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List sx={{marginTop: '20px'}}>
            {['DacheQL', 'Using DacheQL', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                 
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        <div className = 'dacheqldocs'>
          <h1>DacheQL</h1>
          <p>
            DacheQL is an open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and implements caching to improve your website’s query efficiency
          </p>
        </div>

        <h1>Using DacheQL</h1>
        <p>Prerequistes:
          <ul>
            <li>Redis installed if using Redis as your cache</li>
            <li>GraphQL schemas setup with your database</li>
            <li>Fullstack Application where frontend makes query request to backend</li>
          </ul>
        </p>

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
      </Box>
    </Box>
  );
};
export default Sidebar;
