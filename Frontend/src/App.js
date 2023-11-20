import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Payment/>} />
        <Route path='/qrCode' element={<QrCode />} />
      </Routes>
    </>
  );
}

export default App;
