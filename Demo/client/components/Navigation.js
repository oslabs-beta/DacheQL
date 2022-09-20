import React from 'react';
import { BrowserRouter, Routes, Route, Link, Switch } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Demo from './Demo';
import Homepage from './Homepage';
const Navigation = () => {
  return (
    <div>
      <Navbar bg = 'dark' variant={'dark'} expand="lg">
        <Navbar.Brand href="/">DacheQL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  to='/homepage' >Home</Nav.Link>
            <Nav.Link  to='/demo'>Demo</Nav.Link>
            <Nav.Link  to='#github'>GitHub</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
     
  );
};
export default Navigation;
