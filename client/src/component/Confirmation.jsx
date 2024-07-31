import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarConfirm from './NavbarConfirm';
import Footer from './Footer';

const Confirmation = () => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem('reservationId');

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
  axios.get("http://localhost:8000/api/Reservations")
  .then((res) => {
      console.log(res.data);
      console.log("ok")
      setBookings(res.data);
  })
  .catch((err) => {
      console.log(err)
      console.log('nok')
  })
}, [])



  useEffect(() => {
    axios.get("http://localhost:8000/api/Reservations/" + id)
    .then((res) => {
        console.log(res.data);
        console.log("ok")
        setBooking(res.data);
    })
    .catch((err) => {
        console.log(err)
    })
}, [])

const deleteReservation = () => {
  axios.delete(`http://localhost:8000/api/Reservations/${id}`)
      .then((response) => {
          const newBookingsList = bookings.filter(
              (booking, index) => booking._id !== id
          );
          setBookings(newBookingsList);
          navigate('/homePage');
      })
      .catch((err) => {
          console.log(err);
      })
  };

  return (
    <div className="home">
      <NavbarConfirm /> 
      <div className="confirmation-container">
        <div className="confirmation-message">
          <h2>Paid Successfully!</h2>
          <p>Thank you for using our website</p>
          <button className="cancel-btn" onClick={ () => deleteReservation(id)}>Cancel Reservation</button>
        </div>
        
        <div className="summary-container">
        <img src={booking.img} alt="Hotel" className="hotel-image" />
        <div className="hotel-details">
          <div className="hotel-header">
            <span className="hotel-name">{booking.hotelName}</span>
          </div>
          <div className="hotel-location">{booking.location}</div>
          <div className="check-in-out">
            <div>
              <strong>Check in</strong>
              <p>{booking.checkIn}</p>
            </div>
            <div>
              <strong>Check out</strong>
              <p>{booking.checkOut}</p>
            </div>
          </div>
          <div className="stay-details">
            <p>{booking.nights} Nights | {booking.badroom} Bedroom</p>
            <p>{booking.children} kKds | {booking.adults} Adults</p>
          </div>
          <div className="total">
            <strong>Total</strong>
            <span>{booking.total} Dt</span>
          </div>
        </div>
      </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
