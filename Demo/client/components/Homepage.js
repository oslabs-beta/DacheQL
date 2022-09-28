import React from 'react';
import Navigation from './Navigation.js';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Info from './homepageComps/Info.js';
import logo from './assets/logo.png';

const Homepage = () => {

  // removing background image when entered
  console.log('entered homepage');
  document.body.style.backgroundImage = '';
  
  return (
    <div>
      <Navigation id='navbar'></Navigation>
      <Row>
        <Col><div className='fs-1'>Introduction<Info /></div></Col>
        <Col><Image className='img-fluid shadow-4' src={logo} width={'400vw'} height={'400vh'}></Image></Col>
      </Row>
    </div>
  );
};

export default Homepage;
