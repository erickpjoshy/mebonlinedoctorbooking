import Logo from '../../../components/Logo/index.jsx';
import Login from '../../../components/Login/index.jsx';
import axios from '../../../utilities/customAxios.js';
import NavBar from '../../../components/Navbar/index.jsx';
import { Link } from 'react-router-dom';
import React from 'react';

const DoctorLogin = () => {
  return (
    <div className="">
      <Logo />
      <div className="pt-8">
        <Login />
      </div>
    </div>
  );
};

export default DoctorLogin;
