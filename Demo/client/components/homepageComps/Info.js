import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
const Info = () => {
  return (
    <div className='info-containter'>
      <Container>
        <Row>
          <div className='fs-4 lh-base'>DacheQL is an open source, lightweight JavaScript library providing a client- and server-side caching
          solution and cache invalidation for GraphQL.</div>
        </Row>
        <Row>
          <a href="https://www.npmjs.com/package/dacheql" target="_blank" rel="noreferrer">
            <img className="npm-logo"src='https://raw.githubusercontent.com/oslabs-beta/hacheQL/main/demo/images/npm-logo.png' />
          </a>
        </Row>
      </Container>  
    </div>
    
  );
};

export default Info;