import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>  
      {/* <Link to='/'></Link> */}
      <Link to='/homepage'>DacheQL</Link>
      <Link to='/demo'>Demo</Link>
      <Link >GitHub</Link>
      <Link to='/about'>About Us</Link>
    </div>
  );
};

export default Homepage;