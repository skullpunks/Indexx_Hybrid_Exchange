import React, { useState, useEffect } from 'react';
import frame from '../../../../assets/hive-dashboard/beeframe-2.svg';
import framecapt from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import waggle from '../../../../assets/hive-dashboard/waggle dance icon.svg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';


// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../../Captainbee/CaptainDash.css';
import BeeTabs from './BeeTabs';
import BeeHeader from '../BeeHeader/BeeHeader';
import { getCaptainBeeStatics, getHoneyUserDetails, getReferredUserDetails } from '../../../../services/api';

const BeeDash2 = () => {
  const [userType, setUserType] = useState("");
  const [staticsData, setStaticsData] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
    const user = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;

    setUserType(userType);
    if (userType === "CaptainBee") {
      if (username) {
        getCaptainBeeStatics(username).then((data) => {
          setStaticsData(data.data);
        });
      }
    } else {

      getHoneyUserDetails(user).then((data) => {

        setHoneybeeCreateDate(data.data.accountCreationDate);
        setHoneyBeeData(data?.data?._doc);
      })

      getReferredUserDetails(user).then((data) => {
        setRefferedUserData(data.data)
        setCaptainbeeCreateDate(data.data.accountCreationDate);
        setCaptainbeeOrders(data.data.totalOrder);
        setCaptainbeeUsers(data.data.honeyBeesCount);
      })
    }
  }, [])

  return (
    <>
      <BeeHeader />
      <div style={{ paddingTop: "220px" }}>
        <div className='font_20x fw-bold justify-content-center d-flex' style={{ marginLeft: "-562px" }}>
          <img src={waggle} alt="" width={"46px"} />&nbsp;&nbsp;&nbsp;
          Waggle Dance / My Dashboard
        </div>
        <div className="hive-container">
          <div
            className="d-flex justify-content-between"
          // style={{ width: '76%', maxWidth: '1140px' }}
          >
            <div className="d-flex flex-direction-column align-items-center mt-1" style={{ width: "280px" }}>
              <div className="d-flex  flex-direction-row align-items-center">
                <div
                  style={{
                    width: '193px',
                    height: '193px',
                    backgroundImage: `url(${frame})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    // border:"none"
                  }}
                >
                  <div className="hexagon"
                    style={{ marginBottom: '16px' }}
                  >
                    <img
                      alt=""
                      src={honeyBeeData?.profilePic === undefined ? dummy : honeyBeeData?.profilePic}
                      width={'63px'}
                      height={'66px'}
                      ml={'-6px'}
                      border={'none'}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: '104px',
                    height: '107px',
                    backgroundImage: `url(${framecapt})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'end',
                    // border:"none"
                    marginBottom: "8px"
                  }}
                >
                  <div className="side-hexagon">
                    <img
                      alt=""
                      src={captainBeeData?.refferedUserAffilateData?.photoIdFileurl !== undefined ? captainBeeData?.refferedUserAffilateData?.photoIdFileurl : dummy}
                      width={'63px'}
                      height={'66px'}
                      ml={'-6px'}
                      border={'none'}
                    />
                  </div>
                </div>
              </div>
              <div className="align-items-start lh_32x">
                <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
                  Honey Bee {honeyBeeData?.username}
                </div>
                <div className="font_10x mb-3 lh_32x align-items-start">
                  Honey Bee of Captain {captainBeeData?.refferedUserAffilateData?.Username} Team
                </div>
                <div className="align-items-start lh_32x">
                  <div className="font_13x d-flex align-items-center ">
                    <img alt="man" src={man} className="me-2" />
                    {honeyBeeData?.accname ? `@${honeyBeeData?.accname}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img alt="man" src={pin} className="me-2" />
                    {honeyBeeData?.country ? honeyBeeData?.country : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img alt="man" src={house} className="me-2" />
                    {honeyBeeData?.city ? `@${honeyBeeData?.city}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    <img alt="man" src={clock} className="me-2" />
                    {honeybeeCreateDate}
                  </div>
                </div>
              </div>
            </div>
            <div className="honeybee-container">
              <BeeTabs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeeDash2;
