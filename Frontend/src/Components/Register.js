import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    //Toast functions
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRege = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    const postData = async () => {

        if (!emailRegex.test(email)) {
            notifyA("Invalid Email");
            return;
        }
        else if (!passRege.test(password)) {
            notifyA("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?!");
            return;
        }

        try {
            fetch("http://localhost:8000/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    username: username,
                    password: password
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error);
                    } else {
                        notifyB(data.message);
                        navigate('/signin')
                    }
                    console.log(data)
                })
        } catch (error) {
            console.log(error);
        }
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div style={{ border: "1px solid #ccc" }}>
                <div className="container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <label htmlFor="name">
                        <b>Name</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        required=""
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                    />
                    <label htmlFor="username">
                        <b>Username</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter UserName"
                        name="username"
                        required=""
                        onChange={(e) => { setUserName(e.target.value) }}
                        value={username}
                    />
                    <label htmlFor="email">
                        <b>Email</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        required=""
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                    />
                    <label htmlFor="password">
                        <b>Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        required=""
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                    <div className="clearfix">
                        <button type="submit" className="signupbtn" onClick={() => { postData() }}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register;