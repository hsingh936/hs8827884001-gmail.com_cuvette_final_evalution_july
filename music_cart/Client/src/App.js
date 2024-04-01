import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Components/LoginSignup/signup'; 
import Login from './Components/LoginSignup/login';
import NotLogged from './Components/Home/homenotLogged';
import Logged from './Components/Home/homeLogged';
import Details from './Components/Details/Details';
import DetailsNotLogged from './Components/Details/DetailsNotLogged';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/checkout';
import Invoice from './Components/Invoice/invoice';
import InvoiceDetails from './Components/InvoiceDetails/InvoiceDetails';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId')); 

  useEffect(() => {
    
    localStorage.setItem('userId', userId);
  }, [userId]);

  const isLoggedIn = () => {
    return !!userId; 
  };

  const PrivateRoute = ({ element, ...rest }) => {
    const handleUnauthorizedAccess = () => { 
      return <Navigate to="/login" />;
    };

    return isLoggedIn() ? element : handleUnauthorizedAccess();
  };

  return (
    <div className={styles.app}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/" element={<NotLogged />} />
          <Route path="/home" element={<PrivateRoute element={<Logged userId={userId} />} />} />
          <Route path="/details/:productId" element={<PrivateRoute element={<Details />} />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/invoice" element={<PrivateRoute element={<Invoice />} />} />
          <Route path="/checkout" element={<PrivateRoute element={<Checkout userId={userId} />} />} />
          <Route path="/detailsNotLogged/:productId" element={<DetailsNotLogged />} />
          <Route path="/invo/:checkoutId" element={<InvoiceDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
