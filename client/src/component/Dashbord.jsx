import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarConnected from './NavbarConnected';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
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

  const handleDelete = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="home">
      <NavbarConnected />
      <div className="dashboard">
        <h1>Previous Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking, index) => (
              <div className="hotel-card" key={index}>
                
                <div className="hotel-info">
                  <div className="hotel-name-rating">
                    <span className="hotel-name">{booking.hotelName}</span>
                    <span className="hotel-rating">{booking.hotelLocation}</span>
                  </div>
                  <div className="hotel-location">Nights: {booking.nights}</div>
                  <div className="hotel-location">Adults: {booking.adults}</div>
                  <div className="hotel-location">Kids: {booking.children}</div>
                  <div className="hotel-location">Total Price: {booking.total} DT</div>
                  <button className="check-price-btn" onClick={() => handleDelete(index)}>Delete</button>
                </div>
                </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;