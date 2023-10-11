import React, { useEffect, useState } from 'react';
import frame from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';
import email_icon from '../../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone from '../../../../assets/hive-dashboard/sidebar/phone icon 1.svg';

import pin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/pin.svg';
import man_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/man.svg';
import house_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/house.svg';
import clock_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/clock 1 1.svg';
import email_dark from '../../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone_dark from '../../../../assets/hive-dashboard/sidebar/phone icon 1.svg';

import twitter from '../../../../assets/hive-dashboard/sidebar/twitter logo- 1.svg';
import insta from '../../../../assets/hive-dashboard/sidebar/insta icon 2.svg';
import linkedin from '../../../../assets/hive-dashboard/sidebar/in icon.svg';
import discord from '../../../../assets/hive-dashboard/sidebar/discord.svg';

import copper from "../../../../assets/powerpack/copper hat.svg";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { notification } from 'antd';
// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../../Captainbee/CaptainDash.css';
import LeaderCaptainTabs from './LeaderCaptainTabs';
import { Button, Rating } from '@mui/material';
import { getReferredUserDetails } from '../../../../services/api';
import RemoveCaptain from '../../../BuySell/Notification/RemoveCaptain';
import ChangeCaptain from '../../../BuySell/Notification/ChangeCaptain';
import SubHeader from '../SubHeader/SubHeader';


const LeaderCaptain = () => {
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [email, setEmail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpench, setIsModalOpenCh] = useState(false);

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

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || "light"
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log(event);
      setTheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const openNotificationWithIcon = (
    type,
    message
  ) => {
    const Icon =
      type === 'error' ? (
        <CloseCircleFilled />
      ) : (
        <CheckCircleFilled className="hive_link" />
      );
    notification[type]({
      message: message,
      description: '',
      icon: Icon,
      style: {
        border: '1px solid #FFB300',
        boxShadow: 'none',
        borderRadius: 5,
        top: 100,
      },
    });
  };

  const copyClick = (code) => {
    navigator.clipboard.writeText(code);
    openNotificationWithIcon('success', 'Copied Successfully!');
  };


  return (
    <>
      <SubHeader />
      <div style={{paddingTop:"220px"}}>
      <div className='d-flex justify-content-center' style={{marginLeft:"295px"}}>

        <div className='font_20x fw-bold justify-content-center d-flex' style={{width:"1150px"}}>
        <div style={{width:"74%"}}>
        Leader Captain Bee’s  Dashboard
        </div>
          <div className='d-flex justify-content-between' style={{width:"29.5%"}}>

          <Button
              variant="outlined"
              disableTouchRipple
              onClick={() => setIsModalOpenCh(true)}
              sx={{
                borderColor: '#FFB300',
                borderRadius: '2px',
                color: '#282828',
                height: '40px',
                width:"159px",
                px: 1,
                textTransform: 'none',
                fontSize: '10px',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#FFB300',
                  boxShadow: 'none',
                },
              }}
            >
              Change Leader Captain Bee
            </Button>
            <Button
              variant="outlined"
              disableTouchRipple
              onClick={() => setIsModalOpen(true)}
              sx={{
                borderColor: '#FFB300',
                borderRadius: '2px',
                color: '#282828',
                width:"159px",
                height: '40px',
                px: 1,
                textTransform: 'none',
                fontSize: '10px',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#FFB300',
                  boxShadow: 'none',
                },
              }}
            >
              Remove Leader Captain Bee
            </Button>
            </div>

        </div>  
      </div>

      <div className="hive-container">
        <div
          className="d-flex justify-content-between"
          // style={{ width: '76%', maxWidth: '1140px' }}
        >
        <div className="d-flex flex-direction-column mt-1" style={{width:"16%"}}>
        <div className="d-flex  flex-direction-row align-items-center">

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
              <div
                  style={{
                    minWidth: '104px',
                    minHeight: '107px',
                    backgroundImage: `url(${frame})`,
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
              <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
                Leader Captain Bee Jack
                </div>
                <div className="font_10x mb-3 lh_32x align-items-start">
                Leader Captain Bee of Captain Willie’s Team
                </div>
                <div className="justify-content-center d-flex">
              <img src={copper} alt='pack' width={"80%"} />
                  </div>
              <div className="align-items-start lh_32x">
                <div className="font_13x d-flex align-items-center mt-4">
                {theme === "dark" ?
              <img alt="man" src={man_dark} className="me-1" />
              :
                  <img alt="man" src={man} className="me-1" />
                }
                  @{captainBeeData?.accname}
                </div>
                <div className="font_13x d-flex align-items-center">
                {theme === "dark" ?
              <img alt="man" src={pin_dark} className="me-2" />
              :
                  <img alt="man" src={pin} className="me-2" />
                }
                  {captainBeeData?.country}
                </div>
                <div className="font_13x d-flex align-items-center">
                {theme === "dark" ?
              <img alt="man" src={house_dark} className="me-1" />
              :
                  <img alt="man" src={house} className="me-1" />
                }
                  {captainBeeData?.city}
                </div>
                <div className="font_13x d-flex align-items-center">
                {theme === "dark" ?
              <img alt="man" src={clock_dark} className="me-1" />
              :
                  <img alt="man" src={clock} className="me-1" />
                }
                  {captainbeeCreateDate}
                </div>
                <div className="font_13x d-flex align-items-center">
                  {theme === 'dark' ? (
                    <img alt="man" src={phone_dark} className="me-2" />
                  ) : (
                    <img alt="man" src={phone} className="me-2" />
                  )}
                  +123 456 7890
                </div>
                <div className="font_13x d-flex align-items-center">
                  {theme === 'dark' ? (
                    <img alt="man" src={email_dark} className="me-2" />
                  ) : (
                    <img alt="man" src={email_icon} className="me-2" />
                  )}
                  abcd@gmail.com
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

                <div className="d-flex flex-direction-column align-items-start lh_32x mt-5">
                <div>
                  Invite Honey Bee : 123456
                  <ContentCopyIcon
                    fontSize="13px"
                    onClick={() => copyClick(123456)}
                    style={{ cursor: 'pointer', marginBottom:"4px", marginLeft:"5px" }}
                  />
                </div>
                <div>
                  Invite Captain Bee : skfFSj7
                  <ContentCopyIcon
                    fontSize="13px"
                    onClick={() => copyClick(123456)}
                    style={{ cursor: 'pointer', marginBottom:"4px", marginLeft:"5px" }}
                  />
                </div>
              </div>

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
          <div className="side-container" style={{marginLeft:0, width:"1150px"}}>
            <LeaderCaptainTabs/>
          </div>
        </div>
      </div>
      </div>
      <div>
          <RemoveCaptain
            isVisible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
        <div>
          <ChangeCaptain
            isVisible={isModalOpench}
            onClose={() => setIsModalOpenCh(false)}
          />
        </div>
    </>
  );
};

export default LeaderCaptain;
