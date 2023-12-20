import React from 'react'
import Navbar from './Navbar'

function Contact() {
  return (
    <>
    <div className="paymentPage">
    <Navbar/>
      <div className="paymentPageChild" />
      <div className="paymentPageItem" />
      <div className="paymentPageInner" />
      <div className="rectangleParent">
        <div className="frameChild" />
        <div className="groupParent">
          <div className="usernameParent">
            <div className="username">Username:</div>
            
  
              
                <input className="enterYourUsername rectangleGroup groupChild text-center" type="text" placeholder='Enter Username...'/>
              

          </div>
          <div className="walletAddressParent">
            <div className="walletAddress">Wallet address:</div>
            
             
              <input className="enterWalletAddress groupChild rectangleContainer text-center" type="text" placeholder='Wallet Address...'/>

   
        
          </div>
        </div>
        <div className="contactUs">Contact us</div>
        <div className="manUsingEthereumBlockchainWrapper">
          <img
            className="manUsingEthereumBlockchain"
            alt="ContactUs"
            src="images/man.png"
          />
        </div>
       
        <div className="groupContainer">
              <textarea className='enterWalletAddress1 groupDiv groupInner text-center' placeholder='Message Here...'></textarea>
            <button className='btn btn-primary frameItem frameDiv fw-bolder submit'>Submit Query</button>
        </div>
      </div>
      <div className="ellipseDiv" />
      <div className="paymentPageChild1" />
    </div>
    <style>
        {`
        body{
            overflow:hidden;
            height:100%
        }
.paymentPageChild,
.paymentPageInner,
.paymentPageItem {
  position: absolute;
  border-radius: 50%;
  transform: rotate(25.71deg);
  transform-origin: 0 0;
}
.paymentPageItem {
  top: 371px;
  left: 274.2px;
  background: radial-gradient(
    50% 50%at 50% 50%,
    #edfc43,
    rgba(217, 217, 217, 0)
  );
  width: 683px;
  height: 683px;
}
.paymentPageInner {
  top: -103px;
  left: -8px;
  background: radial-gradient(
    50% 50%at 50% 50%,
    #ff69f0,
    rgba(217, 217, 217, 0)
  );
  width: 390px;
  height: 390px;
}
.frameChild {
  position: absolute;
  top: -228px;
  left: -68px;
  border-radius: 30px;
  background: linear-gradient(102.57deg, #b3e0f9, rgba(243, 251, 255, 0));
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25), 5px 5px 7.4px #f3fbff inset;
  width: 1222px;
  height: 577px;
}
.groupChild,
.username {
  position: absolute;
  left: 0;
}
.username {
  top: 11px;
  font-weight: 500;
  display: inline-block;
  width: 128px;
  height: 29px;
}
.groupChild {
  top: 0;
  border-radius: var(--br-xl);
  background-color: var(--color-aliceblue-100);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: 370px;
  height: 40px;
}
.enterYourUsername {
  position: absolute;
  top: 9px;
  left: 22.82px;
  font-weight: 500;
  display: inline-block;
  width: 257.18px;
  height: 29px;
}
.rectangleGroup {
  position: absolute;
  top: 0;
  left: 200px;
  width: 370px;
  height: 40px;
  font-size: var(--font-size-xl);
  color: var(--color-midnightblue-200);
}
.usernameParent {
  position: absolute;
  top: -8px;
  left: 0;
  width: 570px;
  height: 40px;
}
.enterWalletAddress,
.walletAddress {
  position: absolute;
  top: 11px;
  left: 0;
  font-weight: 500;
  display: inline-block;
  width: 180px;
  height: 29px;
}
.enterWalletAddress {
  top: 7px;
  left: 22px;
  width: 375px;
}
.rectangleContainer {
  position: absolute;
  top: 0;
  left: 200px;
  width: 397px;
  height: 40px;
  font-size: var(--font-size-xl);
  color: var(--color-midnightblue-200);
}
.walletAddressParent {
  position: absolute;
  top: 61px;
  left: 0;
  width: 597px;
  height: 40px;
}
.contactUs,
.groupParent {
  position: absolute;
  top: 0;
  left: 73px;
  width: 748px;
  height: 109px;
}
.contactUs {
  top: -173px;
  left: 144px;
  font-size: 70px;
  font-weight: 500;
  display: inline-block;
  width: 374px;
  height: 73px;
}
.manUsingEthereumBlockchain {
  position: absolute;
  top: 0;
  left: 0;
  width: 375.16px;
  height: 372.25px;
  object-fit: cover;
}
.manUsingEthereumBlockchainWrapper {
  position: absolute;
  top: -147px;
  left: 747px;
  width: 375.16px;
  height: 372.25px;
}

.groupInner {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: var(--br-xl);
  background-color: var(--color-aliceblue-100);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: 570px;
  height: 113px;
}
.enterWalletAddress1 {
  position: absolute;
  top: 19.78px;
  left: 38.63px;
  font-weight: 500;
  display: inline-block;
  width: 658.38px;
  height: 81.93px;
}
.frameItem,
.groupDiv {
  position: absolute;
  top: 0;
  left: 0;
  width: 697px;
  height: 113px;
}
.frameItem {
  border-radius: 16.55px;
  background-color: #59b7f0;
  box-shadow: 0 2.068965435028076px 1.66px rgba(0, 0, 0, 0.25);
  height: 40px;
}
.submit {
  position: absolute;
  top: 11px;
  font-weight: 600;
  font-size: 1.5rem;
}

.frameDiv {
  position: absolute;
  top: 146px;
  text-align: center; /* Center the text */
  font-size: 1rem; /* Adjust font size */
  color: #495057; /* Use a more neutral color */
}
.groupContainer {
  position: absolute;
  top: 145px;
  left: 73px;
  width: 697px;
  height: 182px;
  font-size: var(--font-size-xl);
  color: var(--color-midnightblue-200);
}
.rectangleParent {
  position: absolute;
  top: 356px;
  left: 212px;
  width: 661px;
  height: 109px;
}
.ellipseDiv,
.paymentPageChild1 {
  position: absolute;
  border-radius: 50%;
  transform: rotate(25.71deg);
  transform-origin: 0 0;
}
.ellipseDiv {
  top: 525px;
  left: 1411px;
  background: radial-gradient(
    50% 50%at 50% 50%,
    #ff69f0,
    rgba(217, 217, 217, 0)
  );
  width: 461.92px;
  height: 456.37px;
}
.paymentPageChild1 {
  top: -614px;
  left: 781px;
  background: radial-gradient(
    50% 50%at 50% 50%,
    #edfc43,
    rgba(217, 217, 217, 0)
  );
  width: 683px;
  height: 683px;
}
.paymentPage {
  position: relative;
  background-color: #e3f5ff;
  width: 100%;
  height: 821px;
  overflow: hidden;
  text-align: left;
  font-size: var(--font-size-5xl);
  color: var(--color-midnightblue-100);
  font-family: var(--font-inter);
}
`}
    </style>
    </>
  )
}

export default Contact
