import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import graphqlGif from './assets/graphqlGif.gif';
import cache from './assets/cache.png';
import awslogo from './assets/awslogo.png';
import chartjslogo from './assets/chartjslogo.svg';
import redislogo from './assets/redislogo.png';
import GraphQLlogo from './assets/GraphQLlogo.png';
import { Link } from 'react-router-dom';
import typescript from './assets/typescript.png';

const Info = () => {
  return (
    <Container className="homepagediv">
      <div className="homepage">
        <Row>
          <div className="infopage">
            <div className="firstbox">
              <h1>Introducing DacheQL</h1>
              <p>
                An open-source developer tool that leverages the pinpoint accuracy of GraphQL’s
                queries and implements caching to improve your website’s query efficiency
              </p>
              <Row className="twobuttons">
                <Col>
                  <a
                    className="link"
                    href="https://github.com/oslabs-beta/DacheQL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="button1">Get Started</button>
                  </a>
                </Col>
                <Col>
                  <Link className="linktodemo" to="/demo">
                    <button className="button2">Demo</button>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </Row>

        <Row className="secondbox">
          <Col>
            <span className="material-symbols-outlined">speed</span>
            <h2>Lightning Fast</h2>
            <p>Our caching methods provide fast access to information in constant time - O(1)</p>
          </Col>
          <Col>
            <span className="material-symbols-outlined">inventory_2</span>
            <h2>Efficient Memory Usage</h2>
            <p>
              We store your cached information for you in our own database and prevent excessive
              information from being called from the API
            </p>
          </Col>
          <Col>
            <span className="material-symbols-outlined">install_desktop</span>
            <h2>Ease of Use</h2>
            <p>Our tool is easy to install and apply to your coding base</p>
          </Col>
        </Row>

        <Row className="graphql">
          <Col>
            <img src={graphqlGif} />
          </Col>
          <Col>
            <div>
              <div id="graphql">GraphQL</div>
              <div className="fs-5">
                GraphQL is an open-source data query and manipulation language for APIs, and a
                runtime for fulfilling queries with existing data.{' '}
              </div>
              <div className="fs-5">
                With GraphQL, you can specify what data you want to request from your API. You will
                get back exactly what you need, nothing more and nothing less. GraphQL queries
                always return predictable results.
              </div>
              <a className="link" href="https://graphql.org/" target="_blank" rel="noreferrer">
                <button>Learn More</button>
              </a>
            </div>
          </Col>
        </Row>

        <Row className="caching">
          <Col>
            <div>
              <div id="caching">Caching</div>
              <div className="fs-5">
                A cache is a high-speed data storage which stores a subset of data so that future
                requests for that data are served up faster than by accessing the data's primary
                storage location.
              </div>
            </div>
          </Col>
          <Col>
            <img src={cache}></img>
            <p>* Least Recently Used (LRU) Cache *</p>
          </Col>
        </Row>

        <Row className="techstack">
          <Col>
            <Col>
              <img id="graphqllogo" src={GraphQLlogo}></img>
              <img id="typescript" src={typescript}></img>
            </Col>
            <Col>
              <img id="chartjs" src={chartjslogo}></img>
              <img id="redis" src={redislogo}></img>
            </Col>
          </Col>
          <Col>
            <div id="techstack">Tech Stack</div>
            <div className="fs-5">
              In order to provide the developer with extremely efficient caching for their GraphQL
              queries, DacheQL implements numerous modern technology stacks. Cache your queries with
              these stacks to improve your application performance!{' '}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Info;
