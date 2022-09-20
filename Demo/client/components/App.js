import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Demo from './Demo.js';
import Homepage from './Homepage.js';
import About from './About.js';
import LandingPage from './LandingPage.js';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<LandingPage />}></Route>
        <Route path='/homepage' element = {<Homepage />}></Route>
        <Route path='/demo' element = {<Demo />}></Route>
        <Route path='/about' element = {<About />}></Route>
      </Routes>
    </BrowserRouter>   
  );
};


export default App; 