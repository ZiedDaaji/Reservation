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

const NavbarConnected = () => {
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
        let date1 = JSON.stringify(checkInDate);
        Cookies.set('dataIn', date1);
        
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
            Cookies.remove('dataLoc');
            navigate("/homePage");
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
                            <Link to={`/homePage`} className='site-title' ><span  >Reservation.com</span></Link>
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
                        <button className="btn btn-outline-light ml-3 login-btn custom-margin" onClick={logOut}>
                            LogOut
                            <img src={user} alt="Icon" width="20" className="ml-2" />
                        </button>
                        <div className="dropdown custom-margin">
                            <button className="btn btn-outline-light dropdown-toggle" onClick={toggleMenuDropdown}>
                                Plus
                            </button>
                            {menuDropdownVisible && (
                                <div className="dropdown-menu show">
                                    <a href="/homePage/Profile" className="dropdown-item">Profile</a>
                                    <a href="/dashbord" className="dropdown-item">My trips</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-10">
                        <div className="search-bar-container">
                            <div className="search-bar">
                                <div className="input-group">
                                    <select className="form-control" onChange={(e) => {setLocation(e.target.value)}}>
                                        <option value="" disabled selected>Destination</option>
                                        <option value="Tunis">Tunis</option>
                                        <option value="Hammamet">Hammamet</option>
                                        <option value="Sousse">Sousse</option>
                                        <option value="Monastir">Monastir</option>
                                        <option value="Mahdia">Mahdia</option>
                                        <option value="Djerba">Djerba</option>
                                        <option value="Tabarka">Tabarka</option>
                                    </select>
                                    <DatePicker
                                        selected={checkInDate}
                                        onChange={date => setCheckInDate(date)}
                                        className="form-control"
                                        placeholderText="Check In"
                                    />
                                    <DatePicker
                                        selected={checkOutDate}
                                        onChange={date => setCheckOutDate(date)}
                                        className="form-control"
                                        placeholderText="Check Out"
                                    />
                                    <div className="form-control" onClick={toggleWhoDropdown} style={{ cursor: 'pointer' }}>
                                        Who
                                    </div>
                                    {whoDropdownVisible && (
                                        <div className="dropdown-menu show">
                                            <div className="dropdown-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    Adults<br /><small>Age 13+</small>
                                                </div>
                                                <div>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => handleDecrement('adults')}>-</button>
                                                    <span className="mx-2">{counts.adults}</span>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => handleIncrement('adults')}>+</button>
                                                </div>
                                            </div>
                                            <div className="dropdown-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    Children<br /><small>Age 2-13</small>
                                                </div>
                                                <div>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => handleDecrement('children')}>-</button>
                                                    <span className="mx-2">{counts.children}</span>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => handleIncrement('children')}>+</button>
                                                </div>
                                            </div>
                                            <div className="dropdown-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    Infants<br /><small>Age 2 & under</small>
                                                </div>
                                                <div>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => handleDecrement('infants')}>-</button>
                                                    <span className="mx-2">{counts.infants}</span>
                                                    <button className="btn btn-sm btn-secondary" onClick={() => handleIncrement('infants')}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <img src={search} alt="Search"  onClick={() => cookieSet()} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavbarConnected;
