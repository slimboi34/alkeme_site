// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LandingPage from './LandingPage';
import Navbar from './Navbar';
import Home from './Home';
import Dashboard from './Dashboard';
import ChangePercent24Hr from './ChangePercent24Hr';
import SupplyInfo from './SupplyInfo';
import PriceInfo from './PriceInfo';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Show the landing page initially for 3 seconds, then hide it
    const timer = setTimeout(() => setShowLanding(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showLanding ? (
        <LandingPage />
      ) : (
        <Router>
          <Navbar />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
        </Router>
      )}
    </div>
  );
}

function AnimatedRoutes() {
  const [showLandingTransition, setShowLandingTransition] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show LandingPage briefly on each route change
    setShowLandingTransition(true);
    const timer = setTimeout(() => setShowLandingTransition(false), 1000); // Adjust for smoother transition timing
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <TransitionGroup>
      {showLandingTransition ? (
        // Display LandingPage briefly on each route change with smoother transition timing
        <CSSTransition key="landing" classNames="route-transition" timeout={1000}>
          <LandingPage />
        </CSSTransition>
      ) : (
        <CSSTransition key={location.key} classNames="route-transition" timeout={1000}>
          <Routes location={location}>
            {/* Initial route redirects to Home after LandingPage */}
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market-performance-visualisation" element={<ChangePercent24Hr />} />
            <Route path="/supply-info" element={<SupplyInfo />} />
            <Route path="/price-info" element={<PriceInfo />} />
          </Routes>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}

export default App;