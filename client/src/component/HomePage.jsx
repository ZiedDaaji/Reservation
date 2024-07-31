import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from './Footer';
import HotelsList from './HotelsList';
import Demo from '../video/Demo.mp4';
import NavbarConnected from './NavbarConnected';
import Cookies from 'js-cookie';

const HomePage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const nav = useNavigate();



useEffect(() =>{
        axios.get('http://localhost:8000/api/AllUsers', {withCredentials: true})
        .then((res) => {
            setAllUsers(res.data);
            Cookies.set('dataLoc', (""), {expiresIn: '2h'});
        })
        .catch((err) => {
            console.log(err);
            nav('/');
        })
    }, []);


  const calculateNights = () => {
    if (startDate && endDate) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const nights = calculateNights();

  return (
    <div className="home">
      <NavbarConnected />
      <div className="video-section">
        <video width="900" controls>
          <source src={Demo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="hotels-recommendations">
        <HotelsList nights={nights} adults={adults} kids={kids} />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;