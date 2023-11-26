import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Payment/>} />
        <Route path="/qrcode" element={<QrCode/>} />
      </Routes>
    </>
  );
}

export default App;
