import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './index.css';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


reportWebVitals();
