import { Container, Row, Col, Image } from 'react-bootstrap';
import runpig from '../assets/runpig.png';
import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { faMemory } from '@fortawesome/react-fontawesome';
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
      <Row className='introduction'>
        <Col id='intro'>
          <h1>Introducing DacheQL </h1>
          <h6>An open-source developer tool that leverages the pinpoint accuracy of GraphQL’s queries and implements caching to improve your website’s query efficiency</h6>
          <div className='introbody'>
           
            <h2>Blazingly Fast</h2>
            <h5>Our caching methods provide fast access to information in constant time - O(1)</h5>
            <h2>Efficient Memory Usage</h2>
            <h5>We store your cached information for you in our own database and prevent excessive information from being called from the API</h5>
              
            <h2>Ease of Use</h2>
            <h5>Our tool is easy to install and apply to your coding base</h5>
          </div>
          
        </Col>
        <Col className='piglogo'><Image className='img-fluid hover-shadow' src={runpig} width={'550vw'} height={'550vh'}></Image></Col>
      </Row>
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
      </Row>
    </div>
  );
};

export default Info;