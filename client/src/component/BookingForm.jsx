import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarConnected from './NavbarConnected';

const BookingForm = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { nights, adults, kids } = location.state;
  const [hotel, setHotel] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Mr',
    phone: '',
    email: '',
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/hotels/" + hotelId)
    .then((res) => {
        console.log(res.data);
        console.log("ok")
        setHotel(res.data);
    })
    .catch((err) => {
        console.log(err)
        console.log('nok')
    })
}, [hotelId])

  /*useEffect(() => {
    fetchHotelDetails();
  }, [hotelId]);

  const fetchHotelDetails = () => {
    fetch(`http://localhost:8000/api/Hotels/${hotelId}`)
      .then(response => response.json())
      .then(data => setHotel(data))
      .catch(error => console.error('Error fetching hotel details:', error));
  };*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateTotalPrice = () => {
    return (
      nights * (300 + adults * 24 + kids * 15)
    );
  };

  const handleConfirm = () => {
    const booking = {
      hotel,
      nights,
      adults,
      kids,
      totalPrice: calculateTotalPrice(),
      formData,
    };
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    storedBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(storedBookings));

    navigate('/confirmation', { state: { hotel, nights, adults, kids } });
  };

  const handleEdit = () => {
    navigate(`/editBooking/${hotelId}`, { state: { nights, adults, kids } });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="home">
      <NavbarConnected />
      <div className="booking-container">
        <div className="form-container">
          <form>
            <div className="form-group">
              <label>Name*</label>
              <input type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Family Name*</label>
              <input type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Civility*</label>
              <div className="radio-group">
                <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                >
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
              value={formData.phone}
              onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>E-mail*</label>
              <input ype="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required />
            </div>
            <button type="submit" className="confirm-btn" onClick={handleConfirm}>Confirm</button>
            <button type="submit" className="confirm-btn" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
        <div className="summary-container">
          <img src= {hotel.photo} alt="Hotel" className="hotel-image" />
          <div className="hotel-details">
            <div className="hotel-header">
              <span className="hotel-name">{hotel.name}</span>
              <span className="hotel-rating">{hotel.rate}</span>
              <a onClick={handleEdit} className="edit-link">Edit</a>
            </div>
            <div className="hotel-location">{hotel.location}</div>
            <div className="check-in-out">
              <div>
                <strong>Check in</strong>
                <p>Mon. 22 Jul</p>
              </div>
              <div>
                <strong>Check out</strong>
                <p>Wed. 24 Jul</p>
              </div>
            </div>
            <div className="stay-details">
              <p>{nights} Nights | {adults} Adults</p>
              <p> {adults} Adults | Kids: {kids} Kids</p>
            </div>
            <div className="total">
              <strong>Total</strong>
              <span>{calculateTotalPrice()} Dt</span>
            </div>
            <div className="payment-details">
              <p>Online Payment: 114 Dt</p>
              <p>Hotel Payment: {calculateTotalPrice()} Dt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;