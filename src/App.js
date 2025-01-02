import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/routes';
import React from 'react';
import { AuthProvider } from './contexts/userAuth';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
