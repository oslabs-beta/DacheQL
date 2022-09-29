import React from 'react';
import Navigation from './Navigation.js';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Info from './homepageComps/Info.js';
import logo from './assets/logo.png';
import Footer from './Footer.js';

const Homepage = () => {

  // removing background image when entered
  console.log('entered homepage');
  document.body.style.backgroundImage = '';
  
  return (
    <div>
      <Navigation id='navbar'></Navigation>
      <Row>
        <div className='fs-1'><Info /></div>
      </Row>
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
