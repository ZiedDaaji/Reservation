import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavbarBooking from './NavbarBooking';

const BookingForm = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [hotel, setHotel] = useState([]);


  const [hotelLocation, setHotelLocation] = useState([]);//ok
  const [hotelName, setHotelName] = useState([]);//ok
  const [firstName, setFirstName] = useState([]);//ok
  const [lastName, setLastName] = useState([]);//ok
  const [civility, setCivility] = useState([]);//ok
  const [phone, setPhone] = useState([]);//ok
  const [email, setEmail] = useState([]);//ok
  const [nights, setNights] = useState([]);//ok

  const adults = Cookies.get('dataAdultd');//ok
  const children = Cookies.get('dataChildren');//ok
  const enfant = Cookies.get('dataInfant');//ok
  const [checkIn, setCheckIn] = useState([]);
  const [checkOut, setCheckOut] = useState([]);

  const [dateIn, setDateIn] = useState([]);
  const [dateOut, setDateOut] = useState([]);
  const [hotelPrice, setHotelPrice] = useState([]);
  const priceTot =  ((hotelPrice * adults) + (( hotelPrice / 2) * children))*nights
  const badroom = 1 + (adults % 2)
  const total = priceTot;

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
    axios.get("http://localhost:8000/api/hotels/" + hotelId)
    .then((res) => {
        console.log(res.data);
        console.log("ok")
        setHotel(res.data);
        setHotelName(res.data.name);
        setHotelPrice(res.data.price)
        setHotelLocation(res.data.location);
    })
    .catch((err) => {
        console.log(err)
        console.log('nok')
    })
}, [hotelId])

  const handleCancel = () => {
    navigate(-1);
  };


  const submitHandler = (e) => {
    e.preventDefault();   
    axios.post("http://localhost:8000/api/Reservations", {
      hotelName,
      hotelLocation,
      firstName,
      lastName,
      civility,
      phone,
      email,
      nights,
      badroom,
      adults,
      children,
      enfant,
      total
    })
    .then((res) => {
        console.log(res.data)
        setHotelName("");
        setHotelLocation("")
        setFirstName("");
        setLastName("");
        setCivility("");
        setPhone("");
        setEmail("");
        setNights("");
        setCheckIn("");
        setCheckOut("");


        navigate("/reservation/confirmation/done");
    })
    .catch(err=>{
      console.log(err.response.data.errors)
    })
  }
  return (
    <div className="home">
      <NavbarBooking />
      <div className="booking-container">
        <div className="form-container">
          <form>
            <div className="form-group">
              <label>Name*</label>
              <input type="text"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => {setFirstName(e.target.value)}} value={firstName} />
            </div>
            <div className="form-group">
              <label>Family Name*</label>
              <input type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => {setLastName(e.target.value)}} value={lastName} />
            </div>
            <div className="form-group">
              <label>Civility*</label>
              <div className="radio-group">
                <select
                name="gender"
                onChange={(e) => {setCivility(e.target.value)}} value={civility}
                >
                <option value="Mr">-</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </select>
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number*</label>
              <div className="phone-input">
                <span>+216</span>
                <input type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={(e) => {setPhone(e.target.value)}} value={phone} />
              </div>
            </div>
            <div className="form-group">
              <label>E-mail*</label>
              <input ype="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {setEmail(e.target.value)}} value={email}
              required />
            </div>
            <button type="submit" className="confirm-btn" onClick={submitHandler}>Confirm</button>
            <button type="submit" className="confirm-btn" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
        <div className="summary-container">
          <img src= {hotel.photo} alt="Hotel" className="hotel-image" />
          <div className="hotel-details">
            <div className="hotel-header">
              <span className="hotel-name">{hotel.name}</span>
              <span className="hotel-rating">{hotel.rate}</span>
              <a  className="edit-link">Edit</a>
            </div>
            <div className="hotel-location">{hotel.location}</div>
            <div className="check-in-out">
              <div>
                <strong>Check in</strong>
                <p>{checkIn}</p>
              </div>
              <div>
                <strong>Check out</strong>
                <p>{checkOut}</p>
              </div>
            </div>
            <div className="stay-details">
              <p><input ype="email"
              name="nights"
              onChange={(e) => {setNights(e.target.value)}} value={nights}
              required /> Nights | {badroom} Badroom</p>
              
              <p> {adults} Adults | Kids:  {children}</p>
            </div>
            <div className="total">
              <strong>Total</strong>
              <span>{priceTot} Dt</span>
            </div>
            <div className="payment-details">
              <p>Online Payment: 114 Dt</p>
              <p>Hotel Payment:  {hotel.price} Dt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;