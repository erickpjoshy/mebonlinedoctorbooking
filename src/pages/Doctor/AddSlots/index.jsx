import { useParams } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from '../../../components/Button/index.jsx';
import axios from '../../../utilities/customAxios.js';
import moment from 'moment';
import { useState, useEffect } from 'react';
import './addslots.css';
import NavBar from '../../../components/Navbar/index.jsx';
import SideBar from '../../../components/Sidebar/index.jsx';
const AddSlots = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState({
    doctor: id,
    date: '',
    startTime: '',
    endTime: '',
  });
  const getSlots = async () => {
    const result = await axios.get(`/slot/doctor/${id}`);
    console.log(result);
    setSlots(result.data);
  };
  useEffect(() => {
    getSlots();
  }, []);
  const onChange = (e, key) => {
    setSlot({ ...slot, [key]: e.target.value });
  };
  const onClick = async () => {
    await axios.post('/slot/doctor', slot);
    setSlot({ doctor: id, date: '', startTime: '', endTime: '' });
    getSlots();
  };
  console.log(slot);
  return (
    <div className="container mx-auto addslot">
      <div className="grid grid-cols-[80px,1fr] sm:grid-cols-[250px,1fr] gap-2">
        <SideBar />
        <div className="max-h-[620px] sm:max-h-[800px] overflow-scroll">
          <div className="border">
            <h1>ADD SLOTS</h1>
            <Input
              type="date"
              placeHolder="Enter the date"
              min={moment().format('YYYY-MM-DD')}
              onChange={e => onChange(e, 'date')}
              value={slot.date ? slot.date : ''}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="time"
                // timeFormat="hh:mm aa"
                onChange={e => onChange(e, 'startTime')}
                value={slot.startTime ? slot.startTime : ''}
              />
              <Input
                type="time"
                onChange={e => onChange(e, 'endTime')}
                value={slot.endTime ? slot.endTime : ''}
              />
            </div>
            <Button onClick={onClick}>ADD SLOT</Button>
          </div>
          <div className="border">
            <h1>ADDED SLOTS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {slots.map(item => {
                return (
                  <div key={item._id} className="card">
                    <h2>{moment(item.date).format('MMM Do YY')}</h2>
                    <p className="mt-4">
                      <span>
                        {moment(item.startTime, 'HH:mm:ss').format('h:mm A')}
                      </span>
                      -
                      <span>
                        {moment(item.endTime, 'HH:mm:ss').format('h:mm A')}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSlots;
