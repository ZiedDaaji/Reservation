import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../App.css'




const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname:'',
        lastname:'',
        email:'',
        phonenumber:'',
        password:'',
        confirmPassword:''
    })

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value })
    }
    const [error, setError] = useState(null);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", user, {withCredentials:true})
            .then(res => {
                console.log(res.data);
                setUser("");
                navigate('/Login');
            })
            .catch(err => {
                const errorResponse = err.response?.data?.errors || {};
                const errorArr = Object.values(errorResponse).map(error => error.message);
                setError(errorArr);
            })
    };

    return (
        <div className="d-flex flex-column min-vh-100" >
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Register</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first-name">First Name:</label>
                                        <input type="text" className="form-control" id="first-name" name="firstname"  onChange={changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last-name">Last Name:</label>
                                        <input type="text" className="form-control" id="last-name" name="lastname" onChange={changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phonenumber">Phone Number:</label>
                                        <input type="number" className="form-control" name="phonenumber" value={user.phonenumber} onChange={changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm PW:</label>
                                        <input type="password" className="form-control" id="confirm-password" name="confirmPassword"  onChange={changeHandler} />
                                    </div>
                                    <button type="submit" className="btn btn-custom_sub btn-block w-100">Submit</button>
                                    <button type="button" className="btn btn-custom_g btn-block w-100 mt-2">
                                        <img src="/icons/google.png" alt="Icon" width="20" className="mr-2" />
                                        Register with Google
                                    </button>
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

export default Register;