import Input from '../../../components/Input/index.jsx';
import Button from '../../../components/Button/index.jsx';
import { useState } from 'react';
import axios from '../../../utilities/customAxios.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../../components/Navbar/index.jsx';
import './userlogin.css';
import Logo from '../../../components/Logo/index.jsx';
const Userlogin = () => {
  // ---------------------------START NAVIGATE TO SIGNUP----------------------------

  const navigate = useNavigate();
  const navigation = e => {
    e.preventDefault;
    navigate('/user/signup');
  };

  // ---------------------------STOP NAVIGATE TO SIGNUP----------------------------

  // ---------------------------START LOGIN DATA STORE----------------------------
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const onChange = (e, key) => {
    setUserDetails({ ...userDetails, [key]: e.target.value });
    // console.log(userDetails);
  };
  // ---------------------------STOP LOGIN DATA STORE----------------------------
  // ---------------------------START POST LOGIN DATA----------------------------

  const onclick = async () => {
    try {
      const response = await axios.post('/user/login', userDetails);
      console.log(response);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      toast.success('login successful', {
        autoClose: 1500,
        onClose: () => {
          navigate('/user');
        },
      });
    } catch (e) {
      toast.error('please try again');
    }
  };
  // ---------------------------STOP POST LOGIN DATA----------------------------

  return (
    <>
      <Logo />
      <div className="user container">
        <div className="login mt-8 sm:mt-16">
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
          {/* <p className="paragraph text-center text-secondary">
            Forgot password
          </p> */}
          <div className="login-details flex justify-center">
            <div className="grid sm:grid-rows-2 gap-1">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <h2 className="text-primary">User gmail for testing :</h2>
                </div>
                <div>
                  <h2 className="text-secondary">usertest@gmail.com</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full ">
                <div>
                  <h2 className="text-primary text-pwd"> password :</h2>
                </div>
                <div>
                  <h2 className="text-secondary">Qwert@123</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-center">
            <Button onClick={onclick}>Login</Button>
          </div>
          <p className="paragraph text-center">
            <span className="text-primary">Don't have an account</span>

            <span
              className="text-secondary ml-5 paragraph"
              onClick={navigation}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Userlogin;
