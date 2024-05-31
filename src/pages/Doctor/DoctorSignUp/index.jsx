import Login from '../../../components/Login/index.jsx';
import axios from '../../../utilities/customAxios.js';
import Input from '../../../components/Input/index.jsx';
import Button from '../../../components/Button/index.jsx';
import Select from '../../../components/Select/index.jsx';
import Logo from '../../../components/Logo/index.jsx';
import { useNavigate } from 'react-router-dom';
import uploadImage from '../../../components/helpers/uploadImages.js';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './docsign.css';
const DoctorSignUp = () => {
  const navigate = useNavigate();
  const navigation = () => {
    navigate('/doctor/login');
  };
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
    specialization: '',
    hospitalAddress: '',
    homeaddress: '',
    department: '',
    state: '',
    district: '',
  });
  const [departments, setDepartments] = useState();
  const [states, setStates] = useState();
  const [districts, setDistricts] = useState();

  const getdepartment = async () => {
    const getDepartments = await axios.get('/department/getdepartmentnofilter');
    console.log(getDepartments.data);
    setDepartments(getDepartments.data);
  };
  const getStates = async () => {
    const getDepartments = await axios.get('/location/state');
    // console.log(getDepartments.data);
    setStates(getDepartments.data);
  };
  useEffect(() => {
    getdepartment();
    getStates();
  }, []);

  const statefunction = async (e, key) => {
    setSignUp({ ...signUp, district: '', [key]: e.target.value });
    const result = await axios.get(`/location/district/${e.target.value}`);
    setDistricts(result.data);
  };

  const onUpload = async e => {
    // if (signUp.image) {
    //   const name = signUp.image.split('4444/')[1];
    //   const response = await axios.post('/upload/delete');
    // }
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setSignUp({ ...signUp, image: uploadImageCloudinary.url });
  };
  const onChange = (e, key) => {
    // console.log(e.target.value);
    setSignUp({ ...signUp, [key]: e.target.value });
    // console.log(signUp);
  };
  const onclick = async () => {
    try {
      await axios.post('/doctor/signup', signUp);
      toast.success('signup successful,please login', {
        autoClose: 1500,
        onClose: () => {
          navigation();
        },
      });
      // navigate('/doctor/login');
    } catch (e) {
      console.log(e);
    }
  };
  console.log(signUp);
  return (
    <div className="">
      <Logo />
      <div className="pt-8">
        <div className="signup">
          <h1 className="text-primary">Sign Up</h1>
          <ToastContainer />
          <form>
            <Input placeHolder="Name" onChange={e => onChange(e, 'name')} />
            <Input placeHolder="Email" onChange={e => onChange(e, 'email')} />
            <Input
              placeHolder="Password"
              type="password"
              onChange={e => onChange(e, 'password')}
            />
            <Input
              placeHolder="Confirm Password"
              type="password"
              onChange={e => onChange(e, 'confirmPassword')}
            />
            <Input
              placeHolder="Image"
              type="file"
              onChange={e => onUpload(e)}
            />
            <Input
              placeHolder="Specialization"
              onChange={e => onChange(e, 'specialization')}
            />

            <Input
              placeHolder="Hospital address"
              onChange={e => onChange(e, 'hospitalAddress')}
            />

            <Input
              placeHolder="Home address"
              onChange={e => onChange(e, 'homeaddress')}
            />
            <Select
              options={departments}
              placeHolder="select department"
              onChange={e => onChange(e, 'department')}
              value={signUp.department}
            />

            <Select
              options={states}
              placeHolder="select state"
              onChange={e => statefunction(e, 'state')}
              value={signUp.state}
            />
            <Select
              options={districts}
              placeHolder="select district"
              onChange={e => onChange(e, 'district')}
              value={signUp.district}
            />
          </form>
          <p className="paragraph text-center text-secondary">
            Forgot password
          </p>
          <div className="d-flex justify-center">
            <Button onClick={onclick}>Sign Up</Button>
          </div>
          <p className="paragraph text-center">
            <span className="text-primary">Have an account</span>
            <span
              className="text-secondary ml-5 paragraph"
              onClick={navigation}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;
