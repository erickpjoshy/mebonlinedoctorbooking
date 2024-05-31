import NavBar from '../../../components/Navbar';
import axios from '../../../utilities/customAxios.js';
import { getLogedId } from '../../../utilities';
import { useState, useEffect } from 'react';
import Input from '../../../components/Input';
import './userpofile.css';

function UserProfile() {
  const [user, setUser] = useState({});
  const getUserDetails = async () => {
    const response = await axios.get(`/user/profile/${getLogedId()}`);
    setUser(response.data);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  console.log(user);
  return (
    <>
      <NavBar />
      <div className="userprofile container mx-auto">
        <div className="bg-white p-2 overflow-hidden mt-10">
          <h1 className="text-primary pt-8">User Profile</h1>
          <div className="flex items-center flex-col">
            <div className="imgcontiner">
              <img src={user.image} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-secondary">{user.name}</h1>
            <h2 className="text-secondary">{user.email}</h2>
            <h1 className="text-primary">Change Password</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeHolder="Enter the old password"
                type="text"
                disabled="disabled"
              />
              <Input
                placeHolder="Enter the new password"
                type="text"
                disabled="disabled"
              />
            </div>
            <p className="text-red-600 mb-5">
              * password can't change in the test mode
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
