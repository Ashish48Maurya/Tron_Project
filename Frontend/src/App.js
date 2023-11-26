import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Admin />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/qrCode' element={<QrCode />} />
      </Routes>
    </>
  );
}

export default App;
