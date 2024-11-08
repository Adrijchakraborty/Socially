import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Context from './context/Context.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Context>
            <App />
            <ToastContainer />
        </Context>
    </BrowserRouter>
);