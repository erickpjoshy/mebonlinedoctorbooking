import SideBar from '../../../components/Sidebar';
import Pagecontainer from '../../../components/Pagecontainer';
import { getLogedId } from '../../../utilities/index.js';
import axios from '../../../utilities/customAxios.js';
import { useState, useEffect } from 'react';
import './home.css';

const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointment = async () => {
    const response = await axios.get(`/appointments/doctor/${getLogedId()}`);
    console.log(response.data);
    setAppointments(response.data);
  };
  useEffect(() => {
    getAppointment();
  }, []);

  console.log(appointments);
  return (
    <div className="dhome grid grid-cols-[80px,1fr] sm:grid-cols-[250px,1fr]">
      <div className="left-container">
        <SideBar doctorId={getLogedId()} />
      </div>
      <div className="right-container">
        <Pagecontainer heading="MY APPOINTMENTS">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 ">
            {appointments.map((data, index) => {
              return (
                // <div key={index} className="col-span-4">
                <div
                  key={index}
                  className="card flex justify-center flex-col	items-center"
                >
                  <div className="flex">
                    <div className="profile-img my-4">
                      <img
                        src={data.user.image}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col my-4 ml-4 justify-center">
                      <p className="text-left text-secondary">USER DETAILS</p>
                      <h2 className="text-primary">{data.user.name}</h2>
                      <p className="text-primary">{data.user.email}</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <span>
                      <p className="text-left text-secondary">APPOINTMENT</p>
                    </span>
                    <span className="pl-5">
                      <p>
                        {data.slot.startTime} - {data.slot.endTime}
                      </p>
                    </span>
                  </div>
                  <div className="flex gap-x-2">
                    <div
                      className={`statusbutton ${
                        data.slot.status === 'FREE'
                          ? 'bg-green'
                          : data.slot.status === 'BOOKED'
                          ? 'bg-orng'
                          : 'bg-red'
                      }`}
                    >
                      {data.slot.status}
                    </div>
                    <div className="deletebutton">
                      <i className="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Pagecontainer>
      </div>
    </div>
  );
};

export default DoctorHome;
