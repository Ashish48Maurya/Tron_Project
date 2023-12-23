import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <>
      <Navbar/>
          <section className="hero  d-flex container ">
            <div className="row">
            <div className='col-lg-6 col-md-6 col-12 my-auto '>
            <div className="heading m-3 text-primary">
              <h1 className='text-center'>About Us</h1>
            </div>
            <div className="container mx-auto m-3 className='text-center'">
              <div className="hero content"></div>
              <h2 className='text-center'>Welcome to Payonweb</h2>
              <p className='text-center'>Experience seamless and rapid digital exchanges through Payonweb, ensuring swift and efficient transactions that enhance your online interactions. Payonweb empowers you to navigate the digital realm effortlessly, providing a frictionless pathway to your desired transactions with ease and speed.</p>
             <div className='text-center'> <button className=" btn btn-outline-primary">Learn More</button></div>
            </div>
            </div>
            <div className=" container col-lg-6 col-md-6 col-12 my-auto">
            <img src='images/contact.svg'/>
            </div>
            </div>
          </section>
    <style>
        {`
        section{
          display: flex;
         justify-content: center;
         align-items:center; 
         min-height: 100vh;
         margin-block: auto
        }
        `}
      </style>
    </>
  )
}

export default About