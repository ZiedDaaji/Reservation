import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarConnected from './NavbarConnected';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import '../App.css'




const EditProfile = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    
  
    useEffect(() =>{
            axios.get('http://localhost:8000/api/AllUsers', {withCredentials: true})
            .then((res) => {
                setAllUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/LogIn');
            })
        }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/users", { firstname, lastname, email, phonenumber, password, confirmPassword })
            .then(res => {
                console.log(res.data);
                setFirstname('');
                setLastname('');
                setEmail('');
                setPhonenumber('');
                setPassword('');
                setConfirmPassword('');
                navigate('/HomePage');
            })
            .catch(err => {
                const errorResponse = err.response?.data?.errors || {};
                const errorArr = Object.values(errorResponse).map(error => error.message);
                setError(errorArr);
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarConnected />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Register</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first-name">First Name:</label>
                                        <input type="text" className="form-control" id="first-name" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last-name">Last Name:</label>
                                        <input type="text" className="form-control" id="last-name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone-number">Phone Number:</label>
                                        <input type="number" className="form-control" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm-password">Confirm PW:</label>
                                        <input type="password" className="form-control" id="confirm-password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-custom_sub btn-block w-100">Save Changes</button>
                                    <Link to={`/homePage`} className="btn btn-custom_g btn-block w-100 mt-2">Cancel</Link>
                                </form>
                                {error && <div className="alert alert-danger mt-3">{error.join(', ')}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfile;