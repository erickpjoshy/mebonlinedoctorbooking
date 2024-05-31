import './startpage.css';
import Button from '../../components/Button';
import { Navigate, useNavigate } from 'react-router-dom';
const StartPage = () => {
  const navigate = useNavigate();
  const onClick = key => {
    if (key === 'user') {
      navigate('/user/login');
    } else {
      navigate('/doctor/login');
    }
  };
  return (
    <div className="starting container mx-auto mt-12">
      <div className="border">
        <div className="imagecontainer">
          <img
            src="https://raw.githubusercontent.com/erickpjoshy/doctorBookingAppBackEnd/main/uploads/hOsDtJVPcDJfhQWAQwHeo-startingbanner.jpg"
            className="w-full h-full object-contain"
          />
          <div className="textcontainer">
            <h1>ONLINE DOCTOR APPOINTMENT SCHEDULING PLATFORM</h1>
          </div>
        </div>

        <h1>CHOOSE ACCOUNT TYPE</h1>
        <div className="grid sm:grid-cols-2 gap-2">
          <Button
            onClick={() => onClick('user')}
            className="startingbutton user"
          >
            USER
          </Button>
          <Button
            onClick={() => onClick('doctor')}
            className="startingbutton doctor"
          >
            DOCTOR{' '}
          </Button>
        </div>
        <div className="login-details flex justify-end">
          <div className="grid sm:grid-rows-2 gap-1">
            <div className="grid grid-cols-2 gap-4 w-full sm:w-half">
              <div>
                <h2 className="text-primary">User gmail for testing :</h2>
              </div>
              <div>
                <h2 className="text-secondary">usertest@gmail.com</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full sm:w-half">
              <div>
                <h2 className="text-primary text-pwd"> Password :</h2>
              </div>
              <div>
                <h2 className="text-secondary">Qwert@123</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
