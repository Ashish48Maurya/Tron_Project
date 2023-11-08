import Payment from "./Components/Payment";
import QrCode from "./Components/QrCode";
import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      
      <Routes>
        <Route path='/qrCode' element={<QrCode />} />
        <Route path='/' element={<Payment />} />
      </Routes>
      {/* <ToastContainer
        position="bottom-center"
      /> */}
    </>
  );
}
export default App;
