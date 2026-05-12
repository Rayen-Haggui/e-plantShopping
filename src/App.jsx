import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function LandingPage() {
  const [showShopping, setShowShopping] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowShopping(true);
    navigate('/plants');
  };

  return (
    <div className="landing-page background-image">
      <div className="landing-overlay">
        <h1 className="company-name">Paradise Nursery</h1>
        <AboutUs />
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;
