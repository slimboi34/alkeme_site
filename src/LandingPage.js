import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="icon-container">
        <img src={`${process.env.PUBLIC_URL}/Icon.svg`} alt="Logo" className="animated-icon" />
      </div>
    </div>
  );
};

export default LandingPage;