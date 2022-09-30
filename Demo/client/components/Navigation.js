import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import './styles/navbarStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLaptopCode, faAddressCard, faDownload} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import templogo from './assets/templogo.png';

const Navigation = () => {
  
  return (
    <Navbar fixed='top' style={{
      position: 'sticky',
      paddingLeft: '40px',
      paddingRight: '100px',
      minWidth: '300px'
    }} className='navbar shadow-sm p-3 mb-5 bg-white rounded' variant='light' id='navbar' collapseOnSelect expand="lg" >
      <Navbar.Brand className='navbar-logo'href="/"><a id='brand-name'>DacheQL</a></Navbar.Brand>
      {/* <Navbar.Brand href="/">DacheQL</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id='navbar-nav'>
        <Nav className="nav-items" navbarScroll style={{ justifyContent: 'center', right: '5vw',  position:'absolute'  }}>
          <Nav.Link className='nav-item' as={Link} to='/homepage' ><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon >&nbsp;Home</Nav.Link>
          <Nav.Link className='nav-item' as={Link} to='/demo'><FontAwesomeIcon icon={faLaptopCode} />&nbsp;Demo</Nav.Link>
          <Nav.Link className='nav-item' as={Link} to='/about'><FontAwesomeIcon icon={faAddressCard} />&nbsp;About Us</Nav.Link>
          <Nav.Link className='nav-item' href='https://github.com/oslabs-beta/DacheQL' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} />&nbsp;GitHub</Nav.Link>
          <Nav.Link className='nav-item' as={Link} href="https://www.npmjs.com/package/dacheql" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDownload}/>&nbsp;Install</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
     
  );
};
export default Navigation;
