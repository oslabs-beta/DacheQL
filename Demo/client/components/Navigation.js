import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Row } from 'react-bootstrap';
import './styles/compStyles.css';
import homeIcon from './assets/nav-icons/home-icon.svg';
const Navigation = () => {
  return (
    <div>
      <Navbar className='navbar fw-bold' expand="lg">
        <Row>
          <Navbar.Brand class='nav-logo'href="/"><img src={'logo'} width={30} height={30}></img>DacheQL</Navbar.Brand>
        </Row>
        <Row>
          
       
          <Nav
            className="nav-items navbar-nav mx-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='nav-item' as={Link} to='/homepage' ><homeIcon></homeIcon>Home</Nav.Link>
            <Nav.Link className='nav-item' as={Link} to='/demo'>Demo</Nav.Link>
            <Nav.Link className='nav-item' as={Link} to='/about'>About Us</Nav.Link>
            <Nav.Link className='nav-item' href='https://github.com/oslabs-beta/DacheQL' target="_blank" rel="noreferrer">GitHub</Nav.Link>

          </Nav>
        </Row>
      </Navbar>
    </div>
     
  );
};
export default Navigation;
