import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './styles/compStyles.css';
const Navigation = () => {
  return (
    <div>
      <Navbar className='navbar' expand="lg">
        <Navbar.Brand href="/"><img src = {'logo'} width= {30} height={30}></img>DacheQL</Navbar.Brand>
        <Nav
          className="nav-items"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link className='nav-item' as={Link} to='/homepage' >Home</Nav.Link>
          <Nav.Link className='nav-item' as={Link} to='/demo'>Demo</Nav.Link>
          <Nav.Link className='nav-item' as={Link} to='/about'>About Us</Nav.Link>
          <Nav.Link className='nav-item' href='https://github.com/oslabs-beta/DacheQL'>GitHub</Nav.Link>

        </Nav>
      </Navbar>
    </div>
     
  );
};
export default Navigation;
