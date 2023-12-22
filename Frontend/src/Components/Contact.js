import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Contact() {
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setName(user.username);
  }, [])

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !wallet || !msg) {
      return notifyA("All Fields Are Required!!!");
    }
    try {
      const response = await fetch("http://localhost:8000/contact", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body:

          JSON.stringify({
            username: name,
            address: wallet,
            message: msg,
          }),
      });

      if (response.status === 200) {
        const ans = await response.json();
        notifyB("Message Sent Successfully !!!");
        setWallet('')
        setMsg('')
        navigate("/private/contact");
      } else {
        return notifyA("Server Error!!!");
      }
    }
    catch (error) {
      notifyA(error);
    }
  }

  return (
    <>
      <Navbar />
      <div class="contact-form">
        <div class="container">
          <div class="main">
            <div class="content">
              <h2 className='text-center'>Contact Us</h2>
              <form action="#" method="post">
                <input type="text" name="name" placeholder="Username..." value={name} />

                <input type="email" name="wallet" placeholder="Transaction Id..." value={wallet} onChange={(e) => { setWallet(e.target.value) }} />
                <textarea name="msg" placeholder="Your Message..." value={msg} onChange={(e) => { setMsg(e.target.value) }}></textarea>
                <button type="submit" class="btn bg-primary" onClick={submit}>Send <i class="fas fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        // *{
        //   margin: 0;
        //   padding: 0;
        //   box-sizing: border-box;
        //   font-family: 'Poppins', sans-serif;
        // }
        body{
          height:100%;
          overflow:hidden
        }
        .main{
          display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        
        .content{
            flex-basis: 50%;
            padding: 3em 3em;
            background: #fff;
            box-shadow: 2px 9px 49px -17px rgba(156, 39, 148, 0.1);
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            border: 2px solid black
        }

        .contact-form input,
        textarea{
            outline: none;
            margin-bottom: 15px;
            font-stretch: 16px;
            color: black;
            padding: 14px 20px;
            width: 100%;
            display: inline-block;
            box-sizing: border-box;
            border: none;
            background: #fcfcfc;
            transition: 0.3s ease;
        }
        .contact-form input:focus{
            background: transparent;
            border: 1px solid #69275c;
        }
        input,textarea{
          font-weight: bolder
        }
        .contact-form button{
            font-size: 18px;
            color: #fff;
            width: 100%;
            background: #69275c;
            font-weight: 600;
            transition: 0.3s ease;
            padding: 14px 15px;
            border: 1px solid #69275c;
        
        }
        @media(max-width:736px){
            .contact-form .main{
                flex-direction: column;
            }
            .contact-form form{
                margin-top: 30px;
                margin-bottom: 10px;
        
            }
            .form-img{
                border-radius: 0;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                order: 2;
            }
            .content{
                order: 1;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
        }
        `}
      </style>
    </>
  )
}

export default Contact
