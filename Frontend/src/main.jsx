import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Context from './context/Context.jsx';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Context>
                    <App />
                    <ToastContainer />
                </Context>
            </PersistGate>
        </Provider>
    </BrowserRouter>
);