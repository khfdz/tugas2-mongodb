import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BukuContextProvider } from './context/BukuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BukuContextProvider>
      <App />
    </BukuContextProvider>
  </React.StrictMode>
);