import axios from '../../../utilities/customAxios.js';
import Input from '../../../components/Input/index.jsx';
import Button from '../../../components/Button/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from '../../../components/helpers/uploadImages.js';
import Logo from '../../../components/Logo/index.jsx';
import './usersignup.css';

const UserSignUp = () => {
  // ---------------------------START NAVIGATE TO LOGIN----------------------------

  const navigate = useNavigate();
  const navigation = () => {
    navigate('/user/login');
  };
  // ---------------------------STOP NAVIGATE TO LOGIN----------------------------

  // ---------------------------START SIGNUP DATA STORE----------------------------

  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  const onChange = (e, key) => {
    // console.log(e.target.value);
    setSignUp({ ...signUp, [key]: e.target.value });
    // console.log(signUp);
  };

  // ---------------------------STOP SIGNUP DATA STORE----------------------------

  // ---------------------------START IMAGE UPLOAD----------------------------
  const onUpload = async e => {
    // if (signUp.image) {
    //   const name = signUp.image.split('4444/')[1];
    //   const response = await axios.post('/upload/delete', { image: name });
    // }
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setSignUp({ ...signUp, image: uploadImageCloudinary.url });
    // if (file) {
    //   const formData = new FormData();
    //   formData.append('file', file);
    //   try {
    //     const response = await axios.post('/upload/image', formData);
    //     setSignUp({ ...signUp, image: response.data.url });
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  };
  // ---------------------------STOP IMAGE UPLOAD----------------------------

  // ---------------------------START POST SIGNUP DATA----------------------------

  const onclick = async () => {
    try {
      await axios.post('/user/signup', signUp);
      toast.success('user signup successful,please login', {
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
  // ---------------------------STOP POST SIGNUP DATA----------------------------

  return (
    <div className="">
      <Logo />
      <div className="signup mt-8 sm:mt-16">
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
          <Input placeHolder="Image" type="file" onChange={onUpload} />
        </form>
        <p className="paragraph text-center text-secondary">Forgot password</p>
        <div className="d-flex justify-center">
          <Button onClick={onclick}>Sign Up</Button>
        </div>
        <p className="paragraph text-center">
          <span className="text-primary">Have an account</span>
          <span className="text-secondary ml-5 paragraph" onClick={navigation}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
