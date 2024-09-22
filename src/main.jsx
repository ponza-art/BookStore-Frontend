import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserContextProvider } from './hooks/UserContext.jsx';
import { CartProvider } from './context/cartContext.jsx';

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserContextProvider>
);
