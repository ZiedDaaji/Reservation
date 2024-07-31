import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Cookies from 'js-cookie';
import '../App.css'




const Login = () => {
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:''
    })

    const changeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]:e.target.value }) 
    }
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login/", userLogin, {withCredentials:true})
            .then(res => {
                console.log(res.data);
                console.log(res.data.user)
                Cookies.set('FN', (res.data.user.firstname), {expiresIn: '2h'});
                Cookies.set('LN', (res.data.user.lastname), {expiresIn: '2h'});
                Cookies.set('id', (res.data.user._id), {expiresIn: '2h'});
                Cookies.set('email', (res.data.user.email), {expiresIn: '2h'});
                navigate('/HomePage');
            })
            .catch(err => {
                const errorResponse = err.response?.data?.errors || {};
                const errorArr = Object.values(errorResponse).map(error => error.message);
                setError(errorArr);
                console.log(errorArr)
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" id="email" name="email" value={userLogin.email} onChange={changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" className="form-control" id="password" name="password" value={userLogin.password} onChange={changeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <Link to={`/Register`}>
                                            <p>You Don't Have an Account ?</p>
                                        </Link>
                                    </div>
                                    <button type="submit" className="btn btn-custom_sub btn-block w-100">Submit</button>
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

export default Login;