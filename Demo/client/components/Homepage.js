import React from 'react';
import Navigation from './Navigation.js';
import { Container, Row, Col } from 'react-bootstrap';
import Info from './homepageComps/Info.js';
const Homepage = () => {
  return (
    <div>
      <Container className='homepage-container'>
        <Row>
          <Col><Navigation></Navigation></Col>
        </Row>
        <Row>
          <Col><div className='fs-1'>Introduction<Info></Info></div></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
