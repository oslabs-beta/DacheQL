import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import './styles/navbarStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faLaptopCode,
  faAddressCard,
  faDownload,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from './assets/logo.png';

const Navigation = () => {
  return (
    <Navbar
      fixed="top"
      style={{
        position: 'sticky',
        paddingLeft: '40px',
        paddingRight: '100px',
        minWidth: '300px',
      }}
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      variant="light"
      id="navbar"
      collapseOnSelect
      expand="lg"
    >
      <Navbar.Brand className="navbar-logo" href="/">
        <Image src={logo} width={50} height={40} />
        <p id="brandname">DacheQL</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav
          className="nav-items"
          navbarScroll
          style={{ justifyContent: 'center', right: '5vw', position: 'absolute' }}
        >
          <Nav.Link className="nav-item" as={Link} to="/homepage">
            {/* imported icons from FontAwesomeIcon */}
            <FontAwesomeIcon icon={faHouse} />
            {/* &nbsp; is adding white space */}
            &nbsp;Home
          </Nav.Link>
          <Nav.Link className="nav-item" as={Link} to="/docs">
            <FontAwesomeIcon icon={faFolderOpen} />
            &nbsp;Docs
          </Nav.Link>
          <Nav.Link className="nav-item" as={Link} to="/demo">
            <FontAwesomeIcon icon={faLaptopCode} />
            &nbsp;Demo
          </Nav.Link>
          <Nav.Link className="nav-item" as={Link} to="/about">
            <FontAwesomeIcon icon={faAddressCard} />
            &nbsp;About Us
          </Nav.Link>
          <Nav.Link
            className="nav-item"
            href="https://github.com/oslabs-beta/DacheQL"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
            &nbsp;GitHub
          </Nav.Link>
          <Nav.Link
            className="nav-item"
            href="https://www.npmjs.com/package/dacheql"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faDownload} />
            &nbsp;Install
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navigation;
