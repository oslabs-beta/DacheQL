import React from 'react';
import Navigation from './Navigation';

const About = (props) => {
  const { name, pfp, linkedin, github, bio } = props;

  return (
    <div className='member'>
      
      <p className='member-name'>{name}</p>
      {/* <img className='member-image'>{pfp}</img>
      <div className='member-socials'>
        <a href=''>
          <img></img>
        </a>
        <a href=''>
          <img></img>
        </a>
      </div> */}
      <p className='member-bio'>{bio}</p>
    </div>
  );
};

export default About;