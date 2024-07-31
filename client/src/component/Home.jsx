import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from './Footer';
import Navbar from './Navbar';
import Demo from '../video/Demo.mp4';
import HotelsList from './HotelsList';

const Home = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="home">
      <Navbar />
      <div className="video-section">
        <video width="600" controls>
          <source src={Demo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hotels-recommendations">
        <HotelsList  />
      </div>
      <Footer />
    </div>
  );
};

export default Home;