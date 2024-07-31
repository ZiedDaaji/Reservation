import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelsList = ({ nights, adults, kids }) => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
        .get("http://localhost:8000/api/Hotels/")
            .then((response) => {
                console.log(response);
                setHotels(response.data);
                })
            .catch((err) => console.log(err.response));
}, []);

  const handleCheckPrice = (props) => {
    navigate(`${props}/Reservation`, { state: { nights, adults, kids } });
  };

  return (
    <div className="hotels-list">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="hotel-card">
          <div className='photo'>
            <img src = {hotel.photo} className='img' />
            <img src = {hotel.photo2} className='img'/>
            <img src = {hotel.photo3} className='img' />
          </div>
          <h2>{hotel.name}</h2>
          <p>Rating: {hotel.rate}</p>
          <p>Location: {hotel.location}</p>
          <button onClick={() => handleCheckPrice(hotel._id)}>Check Price</button>
        </div>
      ))}
    </div>
  );
};

export default HotelsList;