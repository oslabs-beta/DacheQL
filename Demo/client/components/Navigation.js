import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import './styles/compStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLaptopCode, faAddressCard} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from './assets/logo.png';

const Navigation = () => {
  
  return (
    <div>
      <Navbar className='navbar fw-bold' expand="lg">
        
        <Col>
          <Navbar.Brand className='navbar navbar-logo'href="/"><img src={logo} width={100} height={100}></img><a id='brand-name'>DacheQL</a></Navbar.Brand>
        </Col>
        <Col>
          <Navbar.Toggle aria-controls='navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id='navbar-nav'>
            <Nav
              className="nav-items navbar-nav mx-auto"
              style={{ maxHeight: '150px' }}
              navbarScroll
            >
              <Nav.Link className='nav-item' as={Link} to='/homepage' ><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>&nbsp;&nbsp;Home</Nav.Link>
              <Nav.Link className='nav-item' as={Link} to='/demo'><FontAwesomeIcon icon={faLaptopCode} />&nbsp;&nbsp;Demo</Nav.Link>
              <Nav.Link className='nav-item' as={Link} to='/about'><FontAwesomeIcon icon={faAddressCard} />&nbsp;&nbsp;About Us</Nav.Link>
              <Nav.Link className='nav-item' href='https://github.com/oslabs-beta/DacheQL' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} />&nbsp;&nbsp;GitHub</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Col>
        
      </Navbar>
    </div>
     
  );
};
export default Navigation;
