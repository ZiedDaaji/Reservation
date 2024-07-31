import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const HotelsList = ({ nights, adults, kids }) => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const Loc = Cookies.get('dataLoc')
  console.log(Loc)

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
    navigate(`/homePage/${props}/Reservation`, { state: { nights, adults, kids } });
  };

  return (
    <div className="hotels-list">
      
      {hotels.map((hotel) => {
        for (let index = 0; index < hotels.length; index++) {
          if (Loc === "All") {
            return (
            <div className="hotel-card" key={hotel.id}>
            <img src={hotel.photo}  className="hotel-image" />
            <div className="hotel-info">
              <div className="hotel-name-rating">
                <span className="hotel-name">{hotel.name}</span>
                <span className="hotel-rating">{hotel.rate}</span>
              </div>
              <div className="hotel-location">{hotel.location}</div>
              <button className="check-price-btn" onClick={() => handleCheckPrice(hotel._id)}>Check Price</button>
            </div>
          </div>
      )}else {
        if (Loc === hotel.location) {
          return (
          <div className="hotel-card" key={hotel.id}>
          <img src={hotel.photo}  className="hotel-image" />
          <div className="hotel-info">
            <div className="hotel-name-rating">
              <span className="hotel-name">{hotel.name}</span>
              <span className="hotel-rating">{hotel.rate}</span>
            </div>
            <div className="hotel-location">{hotel.location}</div>
            <button className="check-price-btn" onClick={() => handleCheckPrice(hotel._id)}>Check Price</button>
          </div>
        </div>
        )}else{
          if (Loc === "") {
            return (
            <div className="hotel-card" key={hotel.id}>
            <img src={hotel.photo}  className="hotel-image" />
            <div className="hotel-info">
              <div className="hotel-name-rating">
                <span className="hotel-name">{hotel.name}</span>
                <span className="hotel-rating">{hotel.rate}</span>
              </div>
              <div className="hotel-location">{hotel.location}</div>
              <button className="check-price-btn" onClick={() => handleCheckPrice(hotel._id)}>Check Price</button>
            </div>
          </div>
          )}
        }
      }
      

    }
})},
      
    </div>
  );
};

export default HotelsList;