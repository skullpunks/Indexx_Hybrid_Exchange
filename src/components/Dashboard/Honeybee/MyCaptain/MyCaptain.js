import React, { useEffect, useState } from 'react';
import frame from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';

import twitter from '../../../../assets/hive-dashboard/sidebar/twitter logo- 1.svg';
import insta from '../../../../assets/hive-dashboard/sidebar/insta icon 2.svg';
import linkedin from '../../../../assets/hive-dashboard/sidebar/in icon.svg';
import discord from '../../../../assets/hive-dashboard/sidebar/discord.svg';

// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../../Captainbee/CaptainDash.css';
import MyCaptainTabs from './MyCaptainTabs';
import BeeHeader from '../BeeHeader/BeeHeader';
import { Rating } from '@mui/material';
import { getReferredUserDetails } from '../../../../services/api';


const MyCaptain = () => {
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const email = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;
    setEmail(email);
    getReferredUserDetails(email).then((data) => {
      setRefferedUserData(data.data.refferedUserAffilateData)
      setCaptainbeeCreateDate(data.data.accountCreationDate);
      setCaptainbeeOrders(data.data.totalOrder);
      setCaptainbeeUsers(data.data.honeyBeesCount);
    })

  }, []);

  return (
    <>
      <BeeHeader />
      <div className="hive-container">
        <div
          className="d-flex justify-content-between"
          style={{ width: '76%', maxWidth: '1140px' }}
        >
        <div className="d-flex flex-direction-column mt-1">
              <div className="d-flex  flex-direction-column align-items-center">
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
                  <div className="hexagon">
                    <img
                      alt=""
                      src={captainBeeData?.photoIdFileurl === undefined ? dummy : captainBeeData?.photoIdFileurl}
                      width={'63px'}
                      height={'66px'}
                      ml={'-6px'}
                      border={'none'}
                    />
                  </div>
                </div>
              </div>
                <div className="font_20x align-items-start fw-bold mt-4 mb-3 lh_32x">
                  Captain Bee {captainBeeData?.Username}
                </div>
              <div className="align-items-start lh_32x">
                <div className="font_13x d-flex align-items-center ">
                  <img alt="man" src={man} className="me-2" />
                  @{captainBeeData?.accname}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={pin} className="me-2" />
                  {captainBeeData?.country}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={house} className="me-2" />
                  {captainBeeData?.city}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={clock} className="me-2" />
                  {captainbeeCreateDate}
                </div>
            </div>

              <div className="align-items-start lh_32x mt-4">
                <a href={captainBeeData?.socialMediaLink?.discord ? captainBeeData?.socialMediaLink?.discord : "#"} target={captainBeeData?.socialMediaLink?.discord ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="Discord" src={discord} className="me-3" />
                </a>
                <a href={captainBeeData?.socialMediaLink?.instagram ? captainBeeData?.socialMediaLink?.instagram : "#"} target={captainBeeData?.socialMediaLink?.instagram ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="Instagram" src={insta} className="me-3" />
                </a>
                <a href={captainBeeData?.socialMediaLink?.linkedin ? captainBeeData?.socialMediaLink?.linkedin : "#"} target={captainBeeData?.socialMediaLink?.linkedin ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="LinkedIn" src={linkedin} className="me-3" />
                </a>
                <a href={captainBeeData?.socialMediaLink?.twitter ? captainBeeData?.socialMediaLink?.twitter : "#"} target={captainBeeData?.socialMediaLink?.twitter ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="Twitter" src={twitter} />
                </a>

              </div>
              <div className="d-flex  flex-direction-column align-items-start mt-5">
                <div className="font_13x ">
                  Your Rating
                </div>
                <div className='mt-4'>
                  <Rating name="read-only" value={4} readOnly size='large' />
                </div>
                <div className="font_40x mt-3">
                  95%
                </div>
              </div>
            </div>
          <div className="side-container">
            <MyCaptainTabs/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCaptain;
