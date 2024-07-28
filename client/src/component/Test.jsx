import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Test = () => {


    const nav = useNavigate();
        const [hotelsList, setHotelsList] = useState([]);
        const [errors, setErrors] = useState([]);
        const [allUsers, setAllUsers] = useState([]);
        let today = new Date();
        let currentDay = today.getDate();
        let currentMonth = today.getMonth()+1;
        let currentYear = today.getFullYear();
        let currentDate = currentDay + '/' + currentMonth + '/' +  currentYear;



    useEffect(() => {
        axios
            .get("http://localhost:8000/api/Hotels/")
                .then((response) => {
                    console.log(response);
                    setHotelsList(response.data);
                    })
                .catch((err) => console.log(err.response));
    }, []);




  return (
    <div>Test
        <div>
            {hotelsList.map((hotel, index) => {
                return (
                        <div key={hotel._id} className='hoteltest'>
                            <div>{hotel.name}</div>
                            <div>{hotel.rate}</div>
                            <div>{hotel.location}</div>
                            <div>{hotel.rooms}</div>
                            <div>{hotel.price}</div>
                            <div className='photo'><img src = {hotel.photo} className='img' />
                            <img src = {hotel.photo2} className='img'/>
                            <img src = {hotel.photo3} className='img' /></div>
                            <div>{hotel.res}</div>
                        </div>
                    );
                })}
        </div>
                                    
        
    </div>
  )
}

export default Test