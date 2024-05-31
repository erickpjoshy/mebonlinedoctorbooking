import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorLogin from './pages/Doctor/DoctorLogin';
import DoctorSignUp from './pages/Doctor/DoctorSignUp';
import DoctorHome from './pages/Doctor/DoctorHome';
import UserHome from './pages/User/UserHome';
import DoctorProfile from './pages/User/DoctorProfile';
import StartPage from './pages/StartPage';
import UserLogin from './pages/User/Userlogin';
import UserSignUp from './pages/User/UserSignup';
import DepartmentInfo from './pages/User/DepartmentInfo';
import AddSlots from './pages/Doctor/AddSlots';
import UserAppointments from './pages/User/UserAppointments';
import UserProfile from './pages/User/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignUp />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route element={<PrivateRoute role="DOCTOR" path="/doctor/login" />}>
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/doctorsList/:id" element={<DoctorHome />} />
          <Route path="/doctor/profile/:id" element={<DoctorProfile />} />
          <Route path="/doctor/addslot/:id" element={<AddSlots />} />
        </Route>
        <Route element={<PrivateRoute role="USER" path="/user/login" />}>
          <Route path="/user" element={<UserHome />} />
          <Route path="/departmentinfo/:id" element={<DepartmentInfo />} />
          <Route path="/myappointments" element={<UserAppointments />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
