import { isTokenValid } from '../../utilities/index.js';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './navbar.css';
function NavBar() {
  // console.log(isTokenValid());
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="smallnav flex">{/* <h1>Contact Us</h1> */}</div>
      <div className="container mx-auto">
        <div className="header-container">
          <div className="logo d-flex">
            <Link className="link" to="/">
              <div className="flex">
                <h1 className="text-secondary">
                  <i className="fa-solid fa-stethoscope"></i>MeB
                </h1>
                <h1 className="text-primary">Doctor</h1>
              </div>
            </Link>
          </div>
          <div className="header-elements flex overflow-scroll">
            {isTokenValid() ? (
              <>
                <NavLink className="link" to="/user">
                  <div className="flex items-center comp h-full">
                    <span className="header-icon">
                      <i className="fa-solid fa-house"></i>
                    </span>
                    <span className="pl-2">
                      <h1>Home</h1>
                    </span>
                  </div>
                </NavLink>
                <NavLink className="link" to="/myappointments">
                  <div className="flex items-center comp h-full">
                    <span className="header-icon">
                      <i className="fa-regular fa-calendar-check"></i>
                    </span>
                    <span className="pl-2">
                      <h1>Appointment</h1>
                    </span>
                  </div>
                </NavLink>
                <NavLink className="link" to="/userprofile">
                  <div className="flex items-center comp h-full">
                    <span className="header-icon">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <span className="pl-2">
                      <h1>User</h1>
                    </span>
                  </div>
                </NavLink>
                <div
                  onClick={onClick}
                  className="flex items-center comp h-full comp-last"
                >
                  <span className="header-icon">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </span>
                  <span className="pl-2">
                    <h1>Logout</h1>
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
