import NavBar from '../../../components/Navbar';
import axios from '../../../utilities/customAxios';
import { useState, useEffect } from 'react';
import { getLogedId } from '../../../utilities/index';
import moment from 'moment';
import './userappointments.css';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    const response = await axios.get(`/appointments/user/${getLogedId()}`);
    console.log(response);
    setAppointments(response.data);
  };
  useEffect(() => {
    getAppointments();
  }, []);
  const onClick = async slotid => {
    await axios.patch(`slot/${slotid}`, { status: 'FREE' });
    getAppointments();
  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto appointments">
        <h1 className="text-primary">My Appointments</h1>

        {appointments.length ? (
          <>
            {appointments.map(item => {
              return (
                <div
                  className={`bg-white m-5 ${
                    item.slot.status !== 'BOOKED' ? 'cancel' : ''
                  }`}
                >
                  <div className="flex justify-end text-red-600">
                    {item.slot.status === 'BOOKED' ? (
                      <i
                        className="fa-solid fa-xmark mr-4 mt-3 text-xl"
                        onClick={() => onClick(item.slot._id)}
                      ></i>
                    ) : (
                      <p className="mr-4 mt-3">Cancelled</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 pb-10">
                    <div className="imagecontainer flex  flex-wrap">
                      <div className="userimage">
                        <img
                          src={item.user.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="transfericon flex items-center text-secondary">
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                      </div>
                      <div className="doctorimage">
                        <img
                          src={item.doctor.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-5">
                      <h2 className="m-top">
                        <span className="text-primary">Doctor Name : </span>
                        <span className="text-secondary">
                          {item.doctor.name}
                        </span>
                      </h2>
                      <h2>
                        <span className="text-primary">
                          Appointment Status :{' '}
                        </span>
                        <span className="text-secondary">
                          {item.slot.status}
                        </span>
                      </h2>
                      <h2>
                        <span className="text-primary">
                          Appointment Date :{' '}
                        </span>
                        <span className="text-secondary">
                          {moment(item.slot.date).format('MMM Do YY')}
                        </span>
                      </h2>
                      <h2>
                        <span className="text-primary">
                          Appointment Time :{' '}
                        </span>
                        <span className="text-secondary">
                          {moment(item.slot.startTime, 'HH:mm:ss').format(
                            'h:mm A'
                          )}{' '}
                          -{' '}
                          {moment(item.slot.endTime, 'HH:mm:ss').format(
                            'h:mm A'
                          )}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="no-app">
            <h1 className="text-secondary">No Appointments Added Yet</h1>
          </div>
        )}
        {/* </div> */}
      </div>
    </>
  );
};

export default UserAppointments;
