import axios from '../../../utilities/customAxios.js';
import Slider from '../../../components/Slider';
import Navbar from '../../../components/Navbar/index.jsx';
import Select from '../../../components/Select/index.jsx';
import UserpageInfoBanner from '../../../components/UserpageInfoBanner';
import Footer from '../../../components/Footer/Index.jsx';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Spin } from 'antd';
import './userhome.css';
const UserHome = () => {
  // --------------------------- NAVIGATE----------------------------
  const navigate = useNavigate();
  // --------------------------- NAVIGATE----------------------------

  // ---------------------------START HOME PAGE DEPARTMENT----------------------------

  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [loading, setLoding] = useState(true);

  const getDepartments = async () => {
    const result = await axios.get(`/department/getDepartment?page=${page}`);
    // console.log(result.data);
    setDepartments(result.data);
    setLoding(false);
  };
  useEffect(() => {
    getDepartments();
  }, [page]);

  const handleNextPage = () => {
    if (currentIndex < 5) {
      setPage(page + 1);
      // console.log(page);
      setCurrentIndex(3 + 4);
    }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrentIndex(currentIndex - 4);
    }
  };
  // ---------------------------END HOME PAGE DEPARTMENT----------------------------

  // ---------slider-------------
  const [slider, setSlider] = useState([]);

  const getSlider = async () => {
    const response = await axios.get('/slider');
    setSlider(response.data);
  };
  // ---------slider end -------------

  //-------------------------START GET STATE,DISTRICT,DEPARTMENT-------------------------

  const [inputselector, setInputSelector] = useState({
    state: '',
    district: '',
  });
  const [getDoctor, setGetDoctor] = useState({
    states: [],
    districts: [],
    departments: [],
  });
  const [stateId, setStateId] = useState('');

  const [districtId, setDistrictId] = useState('');
  // -----------------------------------------------------------------------------------------------
  //-----------set state --------------
  // -----------------------------------------------------------------------------------------------

  const getState = async () => {
    const response = await axios.get('/location/state');
    // setStates(response.data);
    // console.log(response);
    setGetDoctor({ ...getDoctor, states: response.data });
  };

  useEffect(() => {
    getSlider();
    getState();
  }, []);
  // console.log(getDoctor.states.length);
  // -----------------------------------------------------------------------------------------------
  //----------- end set state --------------
  // -----------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------
  //-----------start get district details with respect to selected state input--------------
  // -----------------------------------------------------------------------------------------------

  const getDistrict = async () => {
    const response = await axios(`/location/district/${stateId}`);
    console.log(response.data);
    setGetDoctor(prevState => ({ ...prevState, districts: response.data }));
  };
  // -----------------------------------------------------------------------------------------------
  //-----------end get district details--------------
  // -----------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------
  //-----------start get department details with respect to selected district input--------------
  // -----------------------------------------------------------------------------------------------
  const getDepartment = async () => {
    if (districtId === '') {
      setGetDoctor({ ...getDoctor, departments: [] });
    } else {
      const response = await axios(
        `/department/location/district/${districtId}`
      );
      setGetDoctor({ ...getDoctor, departments: response.data });
    }
  };
  // -----------------------------------------------------------------------------------------------
  //-----------end get department details--------------
  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    getDistrict();
  }, [stateId]);

  useEffect(() => {
    getDepartment();
  }, [districtId]);

  // -----------------------------------------------------------------------------------------------
  // ---------start store input selected data of state and dis to  variable 'inputselector' and if department go to navigate -------------
  // -----------------------------------------------------------------------------------------------
  // const [stateId, setStateId] = useState('');
  const selectDoctorWithState = (e, key) => {
    setStateId(e.target.value);
    setDistrictId('');
    setInputSelector({ [key]: e.target.value });
  };

  const selectDoctorWithDistrict = (e, key) => {
    // console.log(e.target.value);
    setDistrictId(e.target.value);
    setInputSelector({ ...inputselector, [key]: e.target.value });
  };

  const selectDoctorWithDepartment = (e, key) => {
    navigate(`/departmentinfo/${e.target.value}`);
    // /departmentinfo/${data._id}
  };
  const goNavigate = depid => {
    navigate(`/doctor/${depid}`);
  };
  // -----------------------------------------------------------------------------------------------
  // ---------end store data of state and dis to doctor variable and if department go to navigate -------------
  // -----------------------------------------------------------------------------------------------
  //-------------------------END GET STATE,DISTRICT,DEPARTMENT-------------------------

  const contentStyle = {
    padding: 50,
  };
  const content = <div style={contentStyle} />;
  return (
    <>
      <Navbar />
      {/* ----------------------START SLIDER--------------------------- */}
      <div className="slider">
        <Slider images={slider} />
        <div className="content absolute w-full  p-5">
          <div className="container mx-auto content-details">
            <h1>BOOK N MEET A DOCTOR!</h1>
            <h2>India's best online appointment scheduling platform</h2>
            {/* ----------------------START INPUT--------------------------- */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <Select
                  options={getDoctor.states}
                  placeHolder="State"
                  onChange={e => selectDoctorWithState(e, 'state')}
                  value={inputselector.state}
                />
              </div>
              <div>
                <Select
                  options={getDoctor.districts}
                  placeHolder="District"
                  onChange={e => selectDoctorWithDistrict(e, 'district')}
                  value={inputselector.district}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Select
                  options={getDoctor.departments}
                  placeHolder="Specialization"
                  onChange={e => selectDoctorWithDepartment(e, 'department')}
                />
              </div>
            </div>
            {/* ----------------------END SLIDER--------------------------- */}
          </div>
        </div>
      </div>
      {/* ----------------------END SLIDER--------------------------- */}

      {/* ----------------------START DEPARTMENT--------------------------- */}
      <div className="dep-container container mx-auto py-10">
        <div className="dep-head grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <h1 className="text-left pl-2 text-primary">
              Centers of Excellence...
            </h1>
          </div>
          <div className="view-more flex justify-end items-center">
            <h1>VIEW ALL</h1>
            <i className="fa fa-arrow-right pl-2" aria-hidden="true"></i>
          </div>
        </div>
        {loading ? (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        ) : (
          <div className="fieldcontainer">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 departments">
              {departments.map((data, index) => {
                if (index <= currentIndex) {
                  return (
                    <Link key={index} to={`/departmentinfo/${data._id}`}>
                      <div className="card">
                        {/* <div className="overlay">
                        <div className="flex h-full justify-center items-center">
                          <h1>{data.name}</h1>
                        </div>
                      </div> */}
                        <div className="img-continer">
                          <img
                            src={data.icon}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h1>{data.name}</h1>
                        <p>{data.description}</p>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
            <div className="flex gap-x-4 justify-end mr-8 mb-8">
              <button onClick={handlePrevPage} disabled={page === 1}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button onClick={handleNextPage}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* ----------------------END DEPARTMENT--------------------------- */}
      <UserpageInfoBanner states={getDoctor.states.length} />
      <Footer />
    </>
  );
};

export default UserHome;
