import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const postData = async () => {
        try {
            fetch("http://localhost:8000/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error);
                    } else {
                        notifyB(data.message);
                        navigate('/admin')
                    }
                    console.log(data)
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="container">
            <div className="row d-flex">
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="left">
                        <img
                            src="images/login.png"
                            alt="login"
                            className="img-fluid"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-8 col-sm-12">
                    <div className="right" >
                        <div className="login-form">
                            <h3 className="header">LOGIN</h3>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                required=""
                                onChange={(e) => { setUserName(e.target.value) }}
                                value={username}
                            />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                required=""
                                onChange={(e) => { setPassword(e.target.value) }}
                                value={password}
                            />
                            <div className='btn-login-grp'>
                            <Button variant="contained" color="primary" onClick={postData}>
                                Log In
                                </Button>

                            <Link to="/register" className="reglink">
                                Sign Up
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;