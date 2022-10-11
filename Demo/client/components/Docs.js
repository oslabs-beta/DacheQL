import React from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.scss';
import Sidebar from './Sidebar';

const Docs = (props) => {
  return (
    <div>
      <Navigation id="navbar"></Navigation>
      <Sidebar />
    </div>
  );
};

export default Docs;
