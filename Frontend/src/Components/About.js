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
          
        `}
      </style>
    </>
  )
}

export default About