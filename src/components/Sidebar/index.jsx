import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
const SideBar = ({ doctorId }) => {
  const navigate = useNavigate();
  // console.log(doctorId);
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
      <div className="sidebar sidebar-desktop">
        <Link className="link" to="/">
          <div className="flex">
            <h1 className="text-secondary">
              <i className="fa-solid fa-stethoscope"></i>MeB
            </h1>
            <h1 className="text-primary">Doctor</h1>
          </div>
        </Link>
        <p>DASHBOARD</p>
        <NavLink to="/doctor">
          <div className="d-flex  py-8 button">
            <span className="d-flex items-center ml-5">
              <i className="fa-solid fa-house"></i>
            </span>
            <span className="ml-10">
              <h2>Overview</h2>
            </span>
          </div>
        </NavLink>
        <p>APPOINTMENTS</p>
        <NavLink>
          <div className="d-flex  py-8 button">
            <span className="d-flex items-center ml-5">
              <i className="fa-solid fa-calendar-check"></i>
            </span>
            <span className="ml-10">
              <h2>Appointments</h2>
            </span>
          </div>
        </NavLink>
        <NavLink>
          <div className="d-flex  py-8 button">
            <span className="d-flex items-center ml-5">
              <i className="fa-solid fa-house-chimney-medical"></i>
            </span>
            <span className="ml-10">
              <h2>Add Appointments</h2>
            </span>
          </div>
        </NavLink>
        <p>SLOTS</p>
        <NavLink to={`/doctor/addslot/${doctorId}`}>
          <div className="d-flex  py-8 button">
            <span className="d-flex items-center ml-5">
              <i className="fa-solid fa-clock"></i>
            </span>
            <span className="ml-10">
              <h2>Add Slots</h2>
            </span>
          </div>
        </NavLink>
        <p>MEDICINES</p>
        <NavLink>
          <div className="d-flex  py-8 button">
            <span className="d-flex items-center ml-5">
              <i className="fa-solid fa-capsules"></i>
            </span>
            <span className="ml-10">
              <h2>Medicines</h2>
            </span>
          </div>
        </NavLink>
        <NavLink>
          <div className="d-flex  py-8 button">
            <span className="d-flex items-center ml-5">
              <i className="fa-solid fa-prescription-bottle-medical"></i>
            </span>
            <span className="ml-10">
              <h2>Add Medicines</h2>
            </span>
          </div>
        </NavLink>
        <div className="d-flex  py-8 button last" onClick={logOut}>
          <span className="d-flex items-center ml-5">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </span>
          <span className="ml-10">
            <h2>Log Out</h2>
          </span>
        </div>
      </div>
      <div className="sidebar sidebar-mob">
        <Link className="link" to="/">
          <div className="flex justify-center">
            <h1 className="text-secondary">
              <i className="fa-solid fa-stethoscope"></i>
            </h1>
          </div>
        </Link>
        <p className="text-center">DASHBOARD</p>
        <NavLink to="/doctor">
          <div className="d-flex  justify-center button">
            <span className="d-flex items-center">
              <i className="fa-solid fa-house"></i>
            </span>
          </div>
        </NavLink>
        <p className="text-center">APPOINTMENTS</p>
        <NavLink>
          <div className="d-flex justify-center button">
            <span className="d-flex items-center">
              <i className="fa-solid fa-calendar-check"></i>
            </span>
          </div>
        </NavLink>
        <NavLink>
          <div className="d-flex  justify-center button">
            <span className="d-flex items-center">
              <i className="fa-solid fa-house-chimney-medical"></i>
            </span>
          </div>
        </NavLink>
        <p className="text-center">SLOTS</p>
        <NavLink to={`/doctor/addslot/${doctorId}`}>
          <div className="d-flex  justify-center button">
            <span className="d-flex items-center">
              <i className="fa-solid fa-clock"></i>
            </span>
          </div>
        </NavLink>
        <p className="text-center"> MEDICINES</p>
        <NavLink>
          <div className="d-flex  justify-center button">
            <span className="d-flex items-center">
              <i className="fa-solid fa-capsules"></i>
            </span>
          </div>
        </NavLink>
        <NavLink>
          <div className="d-flex justify-center button">
            <span className="d-flex items-center">
              <i className="fa-solid fa-prescription-bottle-medical"></i>
            </span>
          </div>
        </NavLink>
        <div className="d-flex justify-center button last" onClick={logOut}>
          <span className="d-flex items-center">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </span>
        </div>
      </div>
    </>
  );
};

export default SideBar;
