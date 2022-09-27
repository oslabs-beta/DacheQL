import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Demo from './Demo.js';
import Homepage from './Homepage.js';
import About from './About.js';
import LandingPage from './LandingPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';






const App = () => {
  document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        document.getElementById('navbar').classList.add('fixed-top');
        // add padding top to show content behind navbar
        const navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        document.getElementById('navbar').classList.remove('fixed-top');
        // remove padding top from body
        document.body.style.paddingTop = '0';
      } 
    });
  }); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<LandingPage />}></Route>
        <Route path='/homepage' element = {<Homepage />}></Route>
        <Route path='/demo' element = {<Demo />}></Route>
        <Route path='/about' element = {<About />}></Route>
      </Routes>
    </BrowserRouter>
    
    
  // <BrowserRouter>
  //   
  // </BrowserRouter>
		
  );
  
};

export default App;
