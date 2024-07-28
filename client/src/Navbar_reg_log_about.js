import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Navbar = () => {
    return (
        <header className="custom-header py-2">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src="/icons/smile.jpg" alt="Logo" width="30" className="mr-2" />
                    <span className='site-title'>Reservation.com</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="mr-3">USD $</span>
                    <a href="#" className="nav-link custom-margin p-0">About Us</a>
                    
                </div>
            </div>
        </header>
    );
}

export default Navbar;
