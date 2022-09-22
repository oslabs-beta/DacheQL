import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
const Info = () => {
  return (
    <div className='info-containter'>
      <Container>
        <Row>
          <div className='fs-3 lh-base'>DacheQL is an open source, lightweight JavaScript library providing a client- and server-side caching
          solution and cache invalidation for GraphQL.</div>
        </Row>
        <Row><div className='fs-4'><a href="https://www.npmjs.com/package/dacheql" target="_blank" rel="noreferrer">Download our package and get started:</a></div></Row>
        <Row>
          <a href="https://www.npmjs.com/package/dacheql" target="_blank" rel="noreferrer" >
            <img className="npm-logo"src='https://raw.githubusercontent.com/oslabs-beta/hacheQL/main/demo/images/npm-logo.png' />
          </a>
        </Row>
        <Row>
          <div>GraphQL</div>
          <div className='fs-4'>GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015.</div></Row>
        <Row>
          <Link to={'/demo'}> <a href="/demo" target="_blank" rel="noreferrer">Try Out Our Demo</a></Link>
         
        </Row>
      </Container>  
    </div>
    
  );
};

export default Info;