import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <ToastContainer/>
        </BrowserRouter>
    </React.StrictMode>
);