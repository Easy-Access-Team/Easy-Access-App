import "./assets/css/reset.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { register } from "../public/serviceWorker.js";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
register();