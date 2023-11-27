import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/qrCode' element={<QrCode />} />
        <Route exact path='/' element={<Register />} />
        <Route exact path='/signin' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
