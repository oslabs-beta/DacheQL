import React from 'react';
import Navigation from './Navigation.js';
import { Container, Row, Col } from 'react-bootstrap';
import Info from './homepageComps/Info.js';
const Homepage = () => {
  return (
    <div>
      <Container className='homepage-container'>
        <Row>
          <Navigation></Navigation>
        </Row>
       
        <Row>
          <Col><div className='fs-1'>Info <Info></Info></div></Col>
        </Row>
      </Container>
			This is Homepage
    </div>
  );
};

export default Homepage;
