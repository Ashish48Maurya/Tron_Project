import React, { Component, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate , Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = async () => {

        if (!emailRegex.test(email)) {
            notifyA("Invalid Email");
            return;
        }

        try {
            fetch("http://localhost:8000/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
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
        <>
            <div className="box">
                <div className="login-form">
                    <h3 className="header">LOGIN</h3>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        required=""
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        required=""
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                    <button type="submit" id="login-btn" onClick={() => { postData() }} value="Sign In">
                        Login
                    </button>
                    <Link to="/register" className="reglink">
                        New User ? Register Here
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Login;