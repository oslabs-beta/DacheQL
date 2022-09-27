import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Demo from './Demo.js';
import Homepage from './Homepage.js';
import About from './About.js';
import LandingPage from './LandingPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Team from './Team.js';






const App = () => {
  // const logo = document.querySelectorAll('#logo path');
  // console.log(logo);
  window.onscroll = function() {myFunction();};

  var navbar = document.getElementsByClassName('navbar');
  var sticky = navbar.offsetTop;
  document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        document.getElementById('navbar_top').classList.add('fixed-top');
        // add padding top to show content behind navbar
        const navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        document.getElementById('navbar_top').classList.remove('fixed-top');
        // remove padding top from body
        document.body.style.paddingTop = '0';
      } 
    });
  }); 
  function myFunction() {
    console.log('scrolling');
    console.log('sticky', window.pageYOffset);
    // if (window.pageYOffset >= sticky) {
    //   navbar.classList.add('sticky');
    // } else {
    //   navbar.classList.remove('sticky');
    // }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<LandingPage />}></Route>
        <Route path='/homepage' element = {<Homepage />}></Route>
        <Route path='/demo' element = {<Demo />}></Route>
        <Route path='/about' element = {<Team />}></Route>
      </Routes>
    </BrowserRouter>
    
    
  // <BrowserRouter>
  //   
  // </BrowserRouter>
		
  );
  
};

export default App;
