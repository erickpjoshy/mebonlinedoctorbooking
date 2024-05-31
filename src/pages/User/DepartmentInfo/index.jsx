import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../utilities/customAxios.js';
import NavBar from '../../../components/Navbar/index.jsx';
import { useNavigate } from 'react-router-dom';
import './depinfo.css';
const DepartmentInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [departments, setDepartments] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const getDepartments = async () => {
    const result = await axios.get(`/department/spdepartment/${id}`);
    // console.log(result);
    setDepartments(result.data);
  };
  const getDoctors = async () => {
    const result = await axios.get(`/doctor/department/${id}`);
    setDoctors(result.data);
  };
  const getSlots = doctorid => {
    navigate(`/doctor/profile/${doctorid}`);
  };
  useEffect(() => {
    getDepartments();
    getDoctors();
  }, []);
  //   console.log(departments);

  //   console.log(id);
  return (
    <div className="deptinfo">
      <NavBar />
      <div className="img-container h-64 h-98 relative">
        <img src={departments.image} className="w-full h-full object-cover" />
        <div className="absolute content flex items-center justify-center">
          <h1>{departments.name}</h1>
        </div>
      </div>
      <div className="container mx-auto">
        <h1>{departments.name} ...</h1>
        <p>{departments.description}</p>
        <div className="">
          <h1>Our Doctors ...</h1>
          {doctors.map((item, index) => {
            return (
              <div key={index} className="flex doctor flex-wrap px-4 pb-4 pt-4">
                <div className="w-full sm:w-1/4">
                  <div className="flex justify-center">
                    <div className="img-cont">
                      <img
                        alt={item.name}
                        src={item.image}
                        className="w-100 h-100 object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-3/4 p-0 sm:p-4">
                  <h2>{item.name}</h2>
                  <p>{item.specialization}</p>
                  <div className="flex items-center mt-6">
                    <span className="icon">
                      <i className="fa-solid fa-hospital"></i>
                    </span>
                    <span className="pl-5">
                      <p>{item.hospitalAddress}</p>
                    </span>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className="icon">
                      <i className="fa-solid fa-house-medical-circle-check"></i>
                    </span>
                    <span className="pl-5">
                      <p>{item.homeaddress}</p>
                    </span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button onClick={() => getSlots(item._id)}>
                      Book an Appointment
                      <i className="fa-solid fa-arrow-right pl-4"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DepartmentInfo;
