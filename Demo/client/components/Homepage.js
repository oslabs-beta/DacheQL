import React from 'react';
import Navigation from './Navigation.js';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Footer from './Footer.js';
import Info from './Info.js';

const Homepage = () => {
  // removing background image when entered
  console.log('entered homepage');
  document.body.style.backgroundImage = '';

  return (
    <div>
      <Navigation id="navbar"></Navigation>
      <Row>
        <div className="info2">
          <Info />{' '}
        </div>
      </Row>
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
