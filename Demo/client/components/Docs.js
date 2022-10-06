import React from 'react';
import Navigation from './Navigation';
// import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router';
import '../styles.scss';
import Sidebar from './Sidebar';
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Form, FormLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const Docs = (props) => {
  
  return(
    <div>
      <Navigation id='navbar'></Navigation>
      <Sidebar />
    </div>
  );
};

export default Docs;