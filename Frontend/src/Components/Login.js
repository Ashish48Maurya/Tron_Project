import React, { Component } from 'react';

const Login = () => {
    return (
        <>
            <div className="box">
                <div className="styling">
                    <div className="design one"></div>
                    <div className="design two"></div>
                    <div className="design three"></div>
                    <div className="design four"></div>
                    <div className="design five"></div>
                    <div className="design six"></div>
                    <div className="design seven"></div>
                    <div className="design eight"></div>
                    <div className="design nine"></div>
                </div>
                <form className="login-form">
                    <h3 className="header">LOGIN</h3>
                    <input
                        className="username"
                        type="text"
                        placeholder="Enter your username"
                        required=""
                    />
                    <input
                        className="password"
                        type="password"
                        placeholder="Enter your password"
                        required=""
                    />
                    <div className="opts">
                        <div className="Remember">
                            <input type="checkbox" name="Remember" id="" />
                            <label htmlFor="Remember">Remember me</label>
                        </div>
                        <a href="#" id="myInput" className="passreset">
                            Forgot Password ?
                        </a>
                    </div>
                    <button id="submit" href="#">
                        Login
                    </button>
                    <a href="register.html" className="reglink">
                        New User ? Register Here
                    </a>
                </form>
            </div>

        </>
    )
}

export default Login;