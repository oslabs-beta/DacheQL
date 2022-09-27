import React from 'react';
import Navigation from './Navigation.js';
import { Container, Row, Col } from 'react-bootstrap';
import Info from './homepageComps/Info.js';
const Homepage = () => {
  return (
    <div>
      <div id = 'navbar'>
        <Navigation></Navigation>
      </div>
      <Container className='homepage-container'>
        
        <Row>
          <Col><div className='fs-1'>Introduction<Info/></div></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
