import React from 'react';
import Navigation from './Navigation';
import { Button, Card, Container, Row, Col, Link } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './styles/aboutStyles.css';
import Footer from './Footer.js';
import sandy from './assets/sandy.jpg';
import andrew from './assets/andrew.png';
import chunhao from './assets/chunhao.png';
import ethan from './assets/ethan.png';
const About = (props) => {
  return (
    <div className="member">
      <Navigation id="navbar"></Navigation>
      <Row>
        <Col>
          <Card className="team-card">
            <Card.Img className="team-picture" src={andrew}></Card.Img>
            <Card.Body>
              <Card.Title>Andrew Moy</Card.Title>
              <Card.Link
                className="contact-icon"
                href="https://github.com/Andrew-Moy"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  className="contact-icon"
                  icon={faGithub}
                  width={'10px'}
                  height={'10px'}
                ></FontAwesomeIcon>
              </Card.Link>

              <Card.Link
                className="contact-icon"
                href="https://www.linkedin.com/in/andrewmoy/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="contact-icon" icon={faLinkedin}></FontAwesomeIcon>
              </Card.Link>
              {/* <Card.Text>Software Engineer</Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="team-card">
            <Card.Img className="team-picture" variant="top" src={chunhao} />
            <Card.Body>
              <Card.Title>ChunHao Zheng</Card.Title>
              <Card.Link
                className="contact-icon"
                href="https://github.com/chunhz"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  className="contact-icon"
                  icon={faGithub}
                  width={'10px'}
                  height={'10px'}
                ></FontAwesomeIcon>
              </Card.Link>

              <Card.Link
                className="contact-icon"
                href="https://www.linkedin.com/mwlite/in/chunhao-zheng-950a2718b"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="contact-icon" icon={faLinkedin}></FontAwesomeIcon>
              </Card.Link>
              {/* <Card.Text>Software Engineer</Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="team-card">
            <Card.Img className="team-picture" src={ethan}></Card.Img>
            <Card.Body>
              <Card.Title>Ethan Chuang</Card.Title>
              <Card.Link
                className="contact-icon"
                href="https://github.com/EthanChuang16"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  className="contact-icon"
                  icon={faGithub}
                  width={'10px'}
                  height={'10px'}
                ></FontAwesomeIcon>
              </Card.Link>

              <Card.Link
                className="contact-icon"
                href="https://www.linkedin.com/in/ethan-chuang1/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="contact-icon" icon={faLinkedin}></FontAwesomeIcon>
              </Card.Link>
              {/* <Card.Text>Software Engineer</Card.Text> */}
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="team-card">
            <Card.Img className="team-picture" src={sandy} />
            <Card.Body>
              <Card.Title>Sandy Liu</Card.Title>
              <Card.Link
                className="contact-icon"
                href="https://github.com/sandyliu31"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  className="contact-icon"
                  icon={faGithub}
                  width={'10px'}
                  height={'10px'}
                ></FontAwesomeIcon>
              </Card.Link>

              <Card.Link
                className="contact-icon"
                href="https://www.linkedin.com/in/sandy-liu-1ba488160/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="contact-icon" icon={faLinkedin}></FontAwesomeIcon>
              </Card.Link>
              {/* <Card.Text>Software Engineer</Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default About;
