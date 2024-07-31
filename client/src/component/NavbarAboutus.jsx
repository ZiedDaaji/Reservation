import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user from '../icons/user.jpg';
import smile from '../icons/smile.jpg';
import search from '../icons/search.png';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavbarAboutus = () => {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();
    const [whoDropdownVisible, setWhoDropdownVisible] = useState(false);
    const [menuDropdownVisible, setMenuDropdownVisible] = useState(false);
    const [counts, setCounts] = useState({
        adults: 0,
        children: 0,
        infants: 0,
    });
    const userFN = Cookies.get('FN');
    const userLN = Cookies.get('LN');
    const userId = `${userFN + " " + userLN}`


    const toggleWhoDropdown = () => {
        setWhoDropdownVisible(!whoDropdownVisible);
    };

    const toggleMenuDropdown = () => {
        setMenuDropdownVisible(!menuDropdownVisible);
    };

    const handleIncrement = (type) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [type]: prevCounts[type] + 1,
        }));
    };

    const handleDecrement = (type) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [type]: Math.max(0, prevCounts[type] - 1),
        }));
    };

    const cookieSet = () => {
        Cookies.set('dataIn', (checkInDate), {expiresIn: '2h'});
        Cookies.set('dataOut', (checkOutDate), {expiresIn: '2h'});
        Cookies.set('dataLoc', (location), {expiresIn: '2h'});
        Cookies.set('dataAdultd', (counts.adults), {expiresIn: '2h'});
        Cookies.set('dataChildren', (counts.children), {expiresIn: '2h'});
        Cookies.set('dataInfant', (counts.infants), {expiresIn: '2h'});
    };


    const logOut = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .then((res) => {
            console.log(res);
            Cookies.remove('FN');
            Cookies.remove('LN');
            Cookies.remove('dataIn');
            Cookies.remove('dataOut');
            Cookies.remove('dataAdultd');
            Cookies.remove('dataChildren');
            Cookies.remove('dataInfant');
            navigate("/");
        })
        .catch((err) => {
            console.log(err); 
        })
    }

    return (
        <header className="custom-header py-2">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start">
                        <div className="d-flex align-items-center">
                            <img src={smile} alt="Logo" width="30" className="mr-2" />
                            <Link to={`/homePage`} className='site-title' ><span >Reservation.com</span></Link>
                        </div>
                        <span className="welcome-message">Welcome {userId}!</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="mr-3">
                            <select className="form-control">
                                <option value="" disabled selected>💵 Devise</option>
                                <option value="Tunis">TND</option>
                                <option value="Hammamet">USD $</option>
                                <option value="Sousse">EUR €</option>
                            </select>
                        </span>
                        <a href="/aboutUs" className="nav-link custom-margin p-0">About Us</a>
                        
                        <div className="dropdown custom-margin">
                            <button className="btn btn-outline-light dropdown-toggle" onClick={toggleMenuDropdown}>
                                Plus
                            </button>
                            {menuDropdownVisible && (
                                <div className="dropdown-menu show">
                                    <a href="/homePage/Profile" className="dropdown-item">Profile</a>
                                    <a href="/my-trips" className="dropdown-item">My trips</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavbarAboutus;
