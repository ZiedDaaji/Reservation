import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarConfirm from './NavbarConfirm';
import Footer from './Footer';

const Confirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    axios.get('http://localhost:8000/api/AllUsers', {withCredentials: true})
    .then((res) => {
        setAllUsers(res.data);

    })
    .catch((err) => {
        console.log(err);
        navigate('/Login');
    })
}, []);



  useEffect(() => {
    axios.get("http://localhost:8000/api/Reservations/" + id)
    .then((res) => {
        console.log(res.data);
        console.log("ok")
        setBooking(res.data);
    })
    .catch((err) => {
        console.log(err)
        console.log('nok')
    })
}, [])

  return (
    <div className="home">
      <NavbarConfirm /> 
      <div className="confirmation-container">
        <div className="confirmation-message">
          <h2>Paid Successfully!</h2>
          <p>Thank you for using our website</p>
          <button className="cancel-btn">Cancel Reservation</button>
        </div>
      
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
