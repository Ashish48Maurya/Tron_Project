import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {generate,count} from "random-words"

const Register = () => {
 

  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const passRege = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

<<<<<<< HEAD
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
                    username: username,
                    password: password
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error);
                    } else {
                        notifyB(data.message);
                        navigate('/')
                    }
                    console.log(data)
                })
        } catch (error) {
            console.log(error);
        }
=======
  const postData = async () => {
    if (!username || !password || !phrase) {
      return notifyA("All Fields Are Required!!!");
    }
    else if (!passRege.test(password)) {
      notifyA("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?!");
      return;
>>>>>>> 67670751a6684114660f5a4b0b15721ad0216c4e
    }

    try {
      fetch("http://localhost:8000/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          phrase: phrase
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB(data.message);
            navigate('/')
          }
          console.log(data)
        })
    } catch (error) {
      console.log(error);
    }
  }

  const setUsername=async()=>{
    const response = await fetch("http://localhost:8000/username", {
      method: "GET",
      headers: {
          Accept: "application/json",
      },
  });

  if (response.status === 200) {
      const data = await response.json();
      setUserName(data.username);
  } else {
      window.alert("Server Busy, Try Again Later");
  } 
  }

  const setPrase=async()=>{
    const phrase = generate({ exactly: 8, join: " ", maxLength: 6 });
    setPhrase(phrase);
  }

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phrase, setPhrase] = useState("");

  return (


    <div className="container">
      <div className="row d-flex">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="left">
            <img
              src="images/signup.png"
              alt="signup"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="right w-60">

            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label htmlFor="name">
              <b>Username</b>
            </label>
            <div><input
              type="text"
              placeholder="✍️ username ✍️"
              name="name"
              required=""
              onChange={(e) => { setUserName(e.target.value) }}
              value={username}
            />
              <Button variant="contained" color="primary" onClick={setUsername}>
                Generate Username
              </Button></div>
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <div>
              <input
                className='w-90'
                type="password"
                placeholder="✍️ password ✍️"
                name="password"
                required=""
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
              />

            </div>
            <label htmlFor="name">
              <b>Secret Phrase</b>
            </label>
            <div>
              <input
                type="text"
                contentEditable="false"
                name="phrase"
                required=""
                value={phrase}
              />
              <Button variant="contained" color="primary" onClick={setPrase}>
              Generate Phrase
              </Button>
            </div>
            <Button variant="contained" color="success" style={{ "paddingInline": "20px" }} onClick={postData}>
              Success
            </Button>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;