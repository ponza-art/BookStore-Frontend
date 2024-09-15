import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserContextProvider } from './hooks/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  </StrictMode>
);