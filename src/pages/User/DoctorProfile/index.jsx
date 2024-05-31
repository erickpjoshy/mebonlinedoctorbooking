import Pagecontainer from '../../../components/Pagecontainer';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLogedId } from '../../../utilities/index.js';
import axios from '../../../utilities/customAxios.js';
import { Button, Modal } from 'antd';
import NavBar from '../../../components/Navbar/index.jsx';
import './doctorprofile.css';
import Input from '../../../components/Input/index.jsx';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctorDetails, setDoctorDetails] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
    specialization: '',
    department: '',
  });
  const [slot, setSlotDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slotID, setSlotID] = useState('');
  const [datefix, setDate] = useState('');
  const getDoctorDetails = async () => {
    console.log(id);
    const response = await axios.get(`/doctor/${id}`);
    setDoctorDetails(response.data);
  };
  console.log(slot);
  const getSlotDetails = async e => {
    const date = e.target.value;
    setDate(date);
    console.log(date);
    const response = await axios.get(`/slot/doctor/${id}/${date}`);
    setSlotDetails(response.data);
  };
  useEffect(() => {
    getDoctorDetails();
  }, []);
  const bookSlot = async slotID => {
    setIsModalOpen(true);
    setSlotID(slotID);
  };
  const handleOk = async () => {
    const response = await axios.post('/appointments', {
      slot: slotID,
      doctor: id,
      user: getLogedId(),
    });
    setSlotDetails('');
    setDate('');
    setIsModalOpen(false);
    navigate('/myappointments');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <NavBar />
      <Modal
        title="Book Doctor"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure?</p>
      </Modal>
      <div className="container mx-auto mt-6">
        <div className="flex doctordetails doctor flex-wrap px-4 pb-4 pt-4">
          <div className="w-full sm:w-1/4">
            <div className="flex justify-center">
              <div className="img-cont">
                <img
                  alt={doctorDetails.name}
                  src={doctorDetails.image}
                  className="w-100 h-100 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-3/4 p-0 sm:p-4">
            <h2>{doctorDetails.name}</h2>
            <p>{doctorDetails.specialization}</p>
            <div className="flex items-center mt-6">
              <span className="icon">
                <i className="fa-solid fa-hospital"></i>
              </span>
              <span className="pl-5">
                <p>{doctorDetails.hospitalAddress}</p>
              </span>
            </div>
            <div className="flex items-center mt-4">
              <span className="icon">
                <i className="fa-solid fa-house-medical-circle-check"></i>
              </span>
              <span className="pl-5">
                <p>{doctorDetails.homeaddress}</p>
              </span>
            </div>
          </div>
        </div>

        <div className="doctordetails mt-4">
          <h1 className="text-secondary text-left">CHOOSE DATE AND TIME</h1>
          <Input
            type="date"
            value={datefix}
            min={moment().format('YYYY-MM-DD')}
            onChange={e => {
              getSlotDetails(e);
            }}
          />
          {slot.length ? (
            <div className="flex flex-wrap">
              {slot.map(item => {
                return (
                  <div
                    onClick={
                      item.status == 'FREE'
                        ? () => bookSlot(item._id)
                        : () => {}
                    }
                    key={item._id}
                    className={`item-width p-2 ${
                      item.status == 'BOOKED' ? 'booked' : ''
                    }`}
                  >
                    <div className="border">
                      <span>
                        {moment(item.startTime, 'HH:mm:ss').format('h:mm A')}
                      </span>
                      -
                      <span>
                        {moment(item.endTime, 'HH:mm:ss').format('h:mm A')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1 className="text-primary">
              Please choose the date / Slots are not available on this day
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
