import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarConnected from './NavbarConnected';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const email = Cookies.get('email'); 



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

  

  const handleDelete = (props) => {
    axios.delete(`http://localhost:8000/api/Reservations/${props}`)
        .then((response) => {
            const newBookingsList = bookings.filter(
                (booking, index) => booking._id !== props
            );
            setBookings(newBookingsList);

        })
        .catch((err) => {
            console.log(err);
        })
    };

  return (
    <div className="home">
      <NavbarConnected />
      <div className="dashboard">
        <h1>Previous Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-card">
            {bookings.map((booking, index) => {
        for (let index = 0; index < bookings.length; index++) {
          if (email === booking.email) {
            return (
              <div className="hotel-card" key={booking._id}>
                
              <div className="hotel-info">
                <div className="hotel-name-rating">
                  <span className="hotel-name">{booking.hotelName}</span>
                  <span className="hotel-rating">{booking.hotelLocation}</span>
                </div>
                <div className="hotel-location">Nights: {booking.nights}</div>
                <div className="hotel-location">Adults: {booking.adults}</div>
                <div className="hotel-location">Kids: {booking.children}</div>
                <div className="hotel-location">Total Price: {booking.total} DT</div>
                <button className="check-price-btn" onClick={() => handleDelete(booking._id)}>Delete</button>
              </div>
              </div>
      )}
      

    }
})}


            
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;