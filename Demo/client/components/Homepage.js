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
      <div id="navbar">
        <Navigation></Navigation>
      </div>
      <Container className="homepage-container">
        <Row>
          <Col>
            <div className="fs-1">
              Introduction
              <Info />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
