import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from "./Components/Forgotpassword";
import NewPassword from "./Components/NewPassword";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import Pay from "./Components/Pay";


function App() {

  const [add, setAdd] = useState('TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd')
  return (
    <>
      <Routes>
        <Route exact path='/admin' element={<Admin setAdd={setAdd} />} />
        <Route exact path='/payment' element={<Payment/>} />
        <Route exact path='/qrCode' element={<QrCode Add={add}/>} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/' element={<Login />} />
        <Route exact path='/forgotpassword' element={<Forgotpassword />} />
        <Route exact path='/newPass' element={<NewPassword />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/pay' element={<Pay />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
