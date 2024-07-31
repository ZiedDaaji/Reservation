import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from './Footer';
import Navbar from './Navbar';
import Demo from '../video/Demo.mp4';
import HotelsList from './HotelsList';
import Cookies from 'js-cookie';

const Home = () => {
  Cookies.set('dataLoc', (""), {expiresIn: '2h'});
  return (
    <div className="home">
      <Navbar />
      <div className="video-section">
        <video width="900" controls>
          <source src={Demo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hotels-recommendations">
        <HotelsList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;