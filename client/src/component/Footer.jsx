import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import facebook from '../icons/facebook.png';
import instagram from '../icons/instagram.png';
import twitter from '../icons/twitter.png';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 footer_cl">
                        <div className="footer_clr">
                            <p className="mb-0">&copy; 2024 Reservation</p>
                            <a href="#">Terms</a>
                            <a href="#">Privacy</a>
                            <a href="/aboutUs">About Us</a>
                        </div>
                        <div className="float-right">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" width="20" className="mx-2" /></a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" width="20" className="mx-2" /></a>
                            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" width="35" className="mx-2" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;