import React, { useState } from 'react';
import { useAuth } from '../store/auth';
import Navbar from './Navbar';

const Contact = () => {

    const [userData, setUserData] = useState(false);
    const [contact, setContact] = useState({});

    const { user } = useAuth();

    if (userData && user) {
        setContact({
            username: user.userData.username,
            email: "",
            message: "",
        })
    }
    return (
        <>
            <Navbar/>
            <div className="container">
                <h3>Contact Form</h3>
                <form>
                    <label htmlFor="fname">Username</label>
                    <input
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your username.."
                    />
                    <label htmlFor="lname">Email ID</label>
                    <input
                        type="text"
                        id="lname"
                        name="lastname"
                        placeholder="Your email id.."
                    />
                    <label htmlFor="subject">Subject</label>
                    <textarea
                        id="subject"
                        name="subject"
                        placeholder="Write something.."
                        style={{ height: 200 }}
                        defaultValue={""}
                    />
                    <input type="submit" defaultValue="Submit" />
                </form>
            </div>
            <style>
                {`

                .container{
                    margin-top:100px;
                }

                input[type=text],
                select,
                textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                margin-top: 6px;
                margin-bottom: 16px;
                resize: vertical;
                }

                input[type=submit] {
                background-color: #04AA6D;
                color: white;
                padding: 12px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                }

                input[type=submit]:hover {
                background-color: #45a049;
                }

                .container {
                border-radius: 5px;
                background-color: #f2f2f2;
                padding: 20px;
                }
              `}
            </style>
        </>
    )
}

export default Contact