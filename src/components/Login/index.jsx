import React from 'react';
import Input from '../Input';
import Button from '../Button';
import { useState } from 'react';
import axios from '../../utilities/customAxios.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
const Login = () => {
  const [doctorDetails, setdoctorDetails] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const onChange = (e, key) => {
    setdoctorDetails({ ...doctorDetails, [key]: e.target.value });
    console.log(doctorDetails);
  };
  const onclick = async () => {
    try {
      const response = await axios.post('/doctor/login', doctorDetails);
      console.log(response);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      toast.success('login successful', {
        autoClose: 1500,
        onClose: () => {
          navigate('/doctor');
        },
      });
    } catch (e) {
      toast.error('please try again');
    }
  };
  const navigation = e => {
    e.preventDefault;
    navigate('/doctor/signup');
  };
  return (
    <div className="login">
      <div>
        <h1 className="text-primary">LOGIN</h1>
      </div>
      <form>
        <ToastContainer position="top-center" />
        <Input placeHolder="Email" onChange={e => onChange(e, 'email')} />
        <Input
          placeHolder="Password"
          type="password"
          onChange={e => onChange(e, 'password')}
        />
      </form>
      <p className="paragraph text-center text-secondary">Forgot password</p>
      <div className="d-flex justify-center">
        <Button onClick={onclick}>Login</Button>
      </div>
      <p className="paragraph text-center">
        <span className="text-primary">Don't have an account</span>

        <span className="text-secondary ml-5 paragraph" onClick={navigation}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
