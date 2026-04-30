import React from 'react'
import ReactDOM from 'react-dom/client'
// @ts-ignore   👈 就是這行！這代表「糾察隊請閉嘴，不要檢查下一行」
import App from './App.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
