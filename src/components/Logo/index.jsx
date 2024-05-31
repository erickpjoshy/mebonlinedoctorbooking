import React from 'react';
import { Link } from 'react-router-dom';
import './logo.css';
const Logo = () => {
  return (
    <div className="bg-white">
      <div className="smallnav flex">{/* <h1>Contact Us</h1> */}</div>
      <div className="container mx-auto">
        <div className="header-container">
          <div className="logo d-flex">
            <Link className="link" to="/">
              <div className="flex">
                <h1 className="text-secondary">
                  <i className="fa-solid fa-stethoscope"></i>MeB
                </h1>
                <h1 className="text-primary">Doctor</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
