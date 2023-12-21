import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <>
      <div>
          <Navbar/>
          <section class="hero">
            <div class="heading">
              <h1>About Us</h1>
            </div>
            <div class="container">
              <div class="hero content"></div>
              <h2>Welcome to Payonweb</h2>
              <p>Experience seamless and rapid digital exchanges through Payonweb, ensuring swift and efficient transactions that enhance your online interactions. Payonweb empowers you to navigate the digital realm effortlessly, providing a frictionless pathway to your desired transactions with ease and speed.</p>
              <button class="cta-button">Learn More</button>
            </div>
            <div class="hero-image">
              <img src="Frontend/public/images/20547381_6280661.jpg"/>
            </div>
          </section>
    </div>
    <style>
        {`
        *{
          margin:0px;
          padding:0px;
          box-sizing: border-box;
          font-family:"Arial",san-serif; 
        }
        .hero{
          background-color:f8f8f8;
          overflow: hidden;
        }
        .heading h1{
          color:#ff6347;
          font-size:55px;
          text-align:center;
          margin-top:35px;
        }
        .container{
         display: flex;
         justify-content: center;
         align-items:center; 
        }
         .hero-content{
          flex:1;
          width:600px;
          margin: 0px 25px
         }
         .hero-content h2{
            font-size:38px;
            margin-bottom: 20px;
            color:#333;
         } 
         .hero-content p{
            font-size: 24px;
            line-height: 1.5;
            margin-bottom: 40px;
            color:#666;
          
         }
         .hero-content button{
          display: inline-block;
          background-colour:#ff4500;
          color:#fff;
          padding: 12px 24px;
          border-radius: 5px;
          font-size:20px;
          border: none;
          cursor: pointer;
          transition: 0.3s ease;
         }
         .hero-content button:hover{
            background-color:#ff6347;
            transform: scale(1.1);
         }
         .hero-image{
           flex:1;
           width:600px;
           margin: auto;

         }
         img{
          width:100%;
          height:auto;
          border-radius: 10px;
         }
         @media screen and (max-width: 768px){
          .heading h1{
            font-size: 45px;
            margin-top: 30px;
          }
          .hero{
            margin: 0px;
          }
          .container{
            width:100%;
            flex-direction: column;
            margin:0px;
            padding:0px 40px;
          }
          .hero-content{
            width:100%;
            margin:35px 0px;
          }
          .hero-content h2{
            font-size:30px;         
          }
          .hero-content p{
            font-size:18px;
            margin-bottom: 20px;
          }
         }
        `}
      </style>
    </>
  )
}

export default About