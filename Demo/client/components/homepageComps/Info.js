import { Container, Row, Col, Image } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNpm } from '@fortawesome/free-brands-svg-icons';
import logoPic from '../assets/logoPic.png';
import graphqlGif from '../assets/graphqlGif.gif';
import cache from '../assets/cache.png';
import GraphQLlogo from '../assets/GraphQLlogo.png';
import awslogo from '../assets/awslogo.png';
import chartjslogo from '../assets/chartjslogo.svg';
import redislogo from '../assets/redislogo.png';

const Info = () => {
  return (
    <div className='info-containter'>
      {/* <Container> */}
      <Row className='introduction'>
        <Col id='intro'>
          {/* <img src={logoPic}></img> */}
          <h1>Introducing DacheQL </h1>
          <h5>An open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and combines it with LRU and LFU caching to further expedite your website’s query efficiency</h5>
          <h2>Blazingly Fast</h2>
          <h5>Our caching methods provide fast access to information in constant time - O(1)</h5>
          <h2>Efficient Memory Usage</h2>
          <h5>We store your cached information for you in our own database and prevent excessive information from being called from the API</h5>
          <h2>Ease of Use</h2>
          <h5>Our tool is easy to install and apply to your coding base</h5>
          {/* <div className='introtext'>DacheQL is an open source, lightweight JavaScript library providing a client/server side caching
            solution and cache invalidation for GraphQL.</div> */}
        </Col>
        <Col><Image className='img-fluid hover-shadow' src={logo} width={'500vw'} height={'500vh'}></Image></Col>
      </Row>
      {/* <Row>
          <div className='fs-4'>
            <a id='package' href="https://www.npmjs.com/package/dacheql" target="_blank" rel="noreferrer">Download our package and get started:</a>
            <a id='packageIcon' href="https://www.npmjs.com/package/dacheql" target="_blank" rel="noreferrer" >
              <Link className="npm-logo"><FontAwesomeIcon icon={faNpm}/></Link>  
            </a>
          </div>
        </Row> */}
      <Row className='graphql'>
        <Col><img src={graphqlGif}/></Col>
        <Col>
          <div>
            <div id='graphql'>GraphQL</div>
              
            <div className='fs-5'>GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015.</div>
            <div className='fs-5'>With GraphQL, you can specify what data you want to request from your API without leaving your editor, highligh potential issues before sending a query, and take advantage of improved code intelligence. You will get back exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results.</div>
          </div>
        </Col>
      </Row>
      <Row className='caching'>
        <Col>
          <div>
            <div id='caching'>Caching</div>
            <div className='fs-5'>A cache is a high-speed data storage which stores a subset of data so that future requests for that data are served up faster than by accessing the data's primary storage location.
            </div>
          </div>
        </Col>
        <Col>
          <img src={cache}></img>
          <p>* Least Recently Used (LRU) Cache *</p>
        </Col>
      </Row>
      <Row className='techstack'>
        <Col>
          <Col>
            <img id='graphqllogo' src={GraphQLlogo}></img>
            <img id='amazon' src={awslogo}></img>
          </Col>
          <Col>
            <img id = 'chartjs' src={chartjslogo}></img>
            <img id = 'redis' src={redislogo}></img>
          </Col>
        </Col>
        <Col>
          <div id='techstack'>Tech Stack</div>
          <div className='fs-5'>In order to provide the developer with extremely efficient caching for their GraphQL queries, DacheQL implements numerous modern technology stacks. Cache your queries with these stacks to improve your application performance! </div>
        </Col>
        {/* <Col>
            <h1>Tech Stack</h1>
            <p>DacheQL implements a variety of awesome stacks that offers great features, in improving </p>
          </Col> */}
      </Row>
      {/* <Row>
          <Link to={'/demo'}> <a href="/demo" target="_blank" rel="noreferrer">Try Out Our Demo</a></Link>
        </Row> */}
      {/* </Container>   */}
    </div>
  );
};

export default Info;