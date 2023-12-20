import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthProvider>
  <React.StrictMode>
    <BrowserRouter>
    <App />
      </BrowserRouter>
   </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
