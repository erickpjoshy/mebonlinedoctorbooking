import { useState, useEffect } from 'react';
import './pageinfobanner.css';
import axios from '../../utilities/customAxios.js';
import { Spin } from 'antd';
const UserpageInfoBanner = ({ states }) => {
  //   const [count, setCount] = useState({ districts: 0, departments: 0 });
  const [dis, setDis] = useState(0);
  const [dep, setDep] = useState(0);
  const [doc, setDoc] = useState(0);
  const [user, setUser] = useState(0);
  const [loading, setLoding] = useState(true);
  const getCount = async () => {
    // ------------------------------DISTRICT COUNT--------------------------------------------

    const disresult = await axios(`/location/district`);
    console.log(disresult.data.length);
    // setCount({ ...count, districts: disresult.data.length });
    setDis(disresult.data.length);
    // ------------------------------DISTRICT COUNT--------------------------------------------

    // ------------------------------DEPARTMENT COUNT--------------------------------------------
    const depresult = await axios.get('/department');
    // setCount({ ...count, departments: depresult.data.length });
    setDep(depresult.data.length);
    // ------------------------------DEPARTMENT COUNT--------------------------------------------

    // ------------------------------DOCTOR COUNT--------------------------------------------
    const docresult = await axios.get('/doctor');
    setDoc(docresult.data.length);
    // ------------------------------DOCTOR COUNT--------------------------------------------
    // ------------------------------USER COUNT--------------------------------------------
    const userresult = await axios.get('/user');
    setUser(userresult.data.length);
    // ------------------------------USER COUNT--------------------------------------------
    setLoding(false);
  };

  useEffect(() => {
    getCount();
  }, []);
  const contentStyle = {
    padding: 50,
  };
  const content = <div style={contentStyle} />;
  return (
    <div className="infobanner-container container mx-auto py-10">
      <div className="infobanner-head grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <h1 className="text-left pl-2 text-primary">
            We’ll Treat You Well ...
          </h1>
        </div>
        <div className="view-more flex justify-end items-center">
          <h1>KNOW MORE</h1>
          <i className="fa fa-arrow-right pl-2" aria-hidden="true"></i>
        </div>
      </div>
      <div className="imgcontainer">
        <img
          src="https://raw.githubusercontent.com/erickpjoshy/doctorBookingAppBackEnd/main/uploads/W04ws0DlxIzBZVfGkHWHt-infobanner-container.jpg"
          className="w-full h-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5">
        <div className="box">
          {loading ? (
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          ) : (
            <h1>{states}</h1>
          )}
          <h2>States</h2>
          <p>High-quality care closer to you</p>
        </div>
        <div className="box">
          {loading ? (
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          ) : (
            <h1>{dis - 1}+</h1>
          )}
          <h2>Districts</h2>
          <p>Providing world-class healthcare</p>
        </div>
        <div className="box">
          {loading ? (
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          ) : (
            <h1>{doc - 1}+</h1>
          )}
          <h2>Doctors</h2>
          <p>Working together to give best medical care</p>
        </div>
        <div className="box">
          {loading ? (
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          ) : (
            <h1>{dep - 1}+</h1>
          )}
          <h2>Speciality</h2>
          <p>To help you live better</p>
        </div>
        <div className="box lastbox">
          {loading ? (
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          ) : (
            <h1>{user}</h1>
          )}
          <h2>Patients</h2>
          <p>Treated every year </p>
        </div>
      </div>
    </div>
  );
};

export default UserpageInfoBanner;
