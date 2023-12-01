import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
        <Routes>
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/payment' element={<Payment />} />
          <Route exact path='/qrCode' element={<QrCode />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/' element={<Login />} />
        </Routes>
        <ToastContainer />
    </>
  );
}

export default App;
