import React from 'react';
import About from './About';

const Team = () => {
    // members info 
    const members = [
      {
        name: 'Sandy Liu',
        pfp: '',
        linkedin: '',
        github: 'https://github.com/sandyliu31',
        bio: 'https://www.linkedin.com/in/sandy-liu-1ba488160/'
      },
      {
        name: 'Ethan Chuang',
        pfp: '',
        linkedin: 'https://www.linkedin.com/in/ethan-chuang1/',
        github: 'https://github.com/EthanChuang16',
        bio: ''
      },
      {
        name: 'Andrew Moy',
        pfp: '',
        linkedin: 'https://www.linkedin.com/in/andrewmoy/',
        github: 'https://github.com/Andrew-Moy',
        bio: 'software engineer'
      },
      {
        name: 'ChunHao Zheng',
        pfp: '',
        linkedin: 'https://www.linkedin.com/mwlite/in/chunhao-zheng-950a2718b',
        github: 'https://github.com/chunhz',
        bio: ''
      },
    ];

    const memberElements = []; 
    members.forEach(member => {
        memberElements.push(
        <About 
        name={member.name}
        pfp={member.pfp}
        linkedin={member.linkedin}
        github={member.github}
        bio={member.bio}
        />)
    });
   
    return (
      <div className='team'>
        {memberElements}
      </div>
    );
  };
  
  export default Team;