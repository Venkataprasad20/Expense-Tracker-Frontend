import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserProvider from './context/userContext'; // ✅ import your provider
import { BrowserRouter } from 'react-router-dom'; // ✅ if using routing

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
  </StrictMode>
);
