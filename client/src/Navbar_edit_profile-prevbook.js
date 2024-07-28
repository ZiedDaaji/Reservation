import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className="custom-header py-2">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-center">
                        <img src="/icons/smile.jpg" alt="Logo" width="30" className="mr-2" />
                        <span className='site-title'>Reservation.com</span>
                    </div>
                    <span className="welcome-message">Welcome User!</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="mr-3">USD $</span>
                    <a href="#" className="nav-link custom-margin p-0">About Us</a>
                    <button className="btn btn-outline-light ml-3 login-btn custom-margin">
                        Logout
                        <img src="/icons/user-profile.jpg" alt="Icon" width="20" className="ml-2" />
                    </button>
                    <div className="dropdown custom-margin">
                        <button className="btn btn-outline-light dropdown-toggle" onClick={toggleDropdown}>
                            Plus
                        </button>
                        {dropdownVisible && (
                            <div className="dropdown-menu show">
                                <a href="/profile" className="dropdown-item">Profile</a>
                                <a href="/my-trips" className="dropdown-item">My trips</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
