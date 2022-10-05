import React from 'react';
import Navigation from './Navigation';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router';
import './styles/aboutStyles.css';
import Sidebar from './Sidebar';
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Form, FormLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const Docs = (props) => {
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);
  
  return(
    <div>
      <Navigation id='navbar'></Navigation>
    
      <p>HIIIII</p>
    </div>
  );
};

// const Docs = withRouter(Dash);
export default Docs;