import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App';
import Header from './header/Header';
import Footer from './footer/Footer';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <App />
    <Footer />
    </BrowserRouter>
  </React.StrictMode>
);