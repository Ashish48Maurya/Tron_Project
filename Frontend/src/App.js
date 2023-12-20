import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from "./Components/Forgotpassword";
import NewPassword from "./Components/NewPassword";
import Userdashboard from "./Components/Userdashboard";
import PrivateRoute from "./user-routes/PrivateRoute";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import About from "./Components/About";
import History from "./Components/History";
import Home from "./Components/Home";


function App() {

  const [add, setAdd] = useState('TM38MG7N9rs9i6CM8DTFQJ6TypG6ECeFGd')
  return (
    <>
      <Routes>
        
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />

        <Route exact path='logout' element={<Logout />} />
        <Route exact path='/forgotpassword' element={<Forgotpassword />} />
        <Route exact path='/newPass' element={<NewPassword />} />
          
        <Route exact path="/private" element={<PrivateRoute />} >
        <Route exact path='about' element={<About />} />
          <Route exact path="user" element={<Userdashboard />} />
          <Route exact path='admin' element={<Admin setAdd={setAdd} />} />
          <Route exact path='payment' element={<Payment />} />
          <Route exact path='history' element={<History />} />
          <Route exact path='qrCode' element={<QrCode Add={add} />} />
          <Route exact path='contact' element={<Contact />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
