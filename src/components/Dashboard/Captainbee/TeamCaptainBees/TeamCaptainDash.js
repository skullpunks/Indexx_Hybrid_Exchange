import React, { useState, useEffect } from 'react';
import frame from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';
import waggle from '../../../../assets/hive-dashboard/waggle dance icon.svg';

import pin from '../../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../../assets/hive-dashboard/sidebar/clock 1.svg';
import email from '../../../../assets/hive-dashboard/sidebar/email icon 1.svg';
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

import twitter_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/twitter logo.svg';
import insta_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/insta.svg';
import linkedin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/LinkeIn.svg';
import discord_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/discord.svg';


import arrow from '../../../../assets/hive-dashboard/Arrow 1.svg';
import copper from "../../../../assets/powerpack/copper hat.svg";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { notification } from 'antd';
import { Rating } from '@mui/material';

// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../../Captainbee/CaptainDash.css';
import { getCaptainBeeStatics, getHoneyUserDetails, getReferredUserDetails } from '../../../../services/api';
import SubHeader from '../SubHeader/SubHeader';
import TeamCaptainTabs from './TeamCaptainTabs';

const TeamCaptainDash = () => {
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
      getCaptainBeeStatics(username).then((data) => {

        setStaticsData(data.data);
      });
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
      <div style={{ paddingTop: "220px" }}>
        <div className='font_20x fw-bold justify-content-center d-flex' style={{ marginLeft: "-630px" }}>
          {/* <img src={waggle} alt="" width={"46px"}/>&nbsp;&nbsp;&nbsp;
        Waggle Dance / My Dashboard */}
        Team Captain Bee JACK's Dashboard
        </div>
        <div className="hive-container">
          <div
            className="d-flex justify-content-between"
          // style={{ width: '76%', maxWidth: '1140px' }}
          >
            <div className="d-flex flex-direction-column align-items-center mt-1">
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
                      src={honeyBeeData?.profilePic === undefined ? dummy : honeyBeeData?.profilePic}
                      width={'63px'}
                      height={'66px'}
                      ml={'-6px'}
                      border={'none'}
                    />
                  </div>
              </div>
              <div className="align-items-start lh_32x">
                <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
                Team Captain Bee {honeyBeeData?.username}
                </div>
                <div className="font_10x mb-3 lh_32x align-items-start">
                  Captain Bee of Captain {captainBeeData?.refferedUserAffilateData?.Username} Team
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
                    {honeyBeeData?.accname ? `@${honeyBeeData?.accname}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                  {theme === "dark" ?
              <img alt="man" src={pin_dark} className="me-2" />
              :
                  <img alt="man" src={pin} className="me-2" />
                }
                    {honeyBeeData?.country ? honeyBeeData?.country : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                  {theme === "dark" ?
              <img alt="man" src={house_dark} className="me-1" />
              :
                  <img alt="man" src={house} className="me-1" />
                }
                    {honeyBeeData?.city ? `@${honeyBeeData?.city}` : "NA"}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                  {theme === "dark" ?
              <img alt="man" src={clock_dark} className="me-1" />
              :
                  <img alt="man" src={clock} className="me-1" />
                }
                    {honeybeeCreateDate}
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
                    <img alt="man" src={email} className="me-2" />
                  )}
                  abcd@gmail.com
                </div>
                </div>

                <div className="align-items-start lh_32x mt-4">
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.discord ? staticsData?.affiliateUserProfile?.socialMediaLink?.discord : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.discord ? "_blank" : "_self"} rel="noopener noreferrer">
                {theme === "dark" ?
              <img alt="man" src={discord_dark} className="me-3" />
              :
                  <img alt="Discord" src={discord} className="me-3" />
                }
                </a>
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.instagram ? staticsData?.affiliateUserProfile?.socialMediaLink?.instagram : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.instagram ? "_blank" : "_self"} rel="noopener noreferrer">
                {theme === "dark" ?
              <img alt="man" src={insta_dark} className="me-3" />
              :
              <img alt="Instagram" src={insta} className="me-3" />
                }
                </a>
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin ? staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin ? "_blank" : "_self"} rel="noopener noreferrer">
                {theme === "dark" ?
              <img alt="man" src={linkedin_dark} className="me-3" />
              :
              <img alt="LinkedIn" src={linkedin} className="me-3" />
                }
                </a>
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.twitter ? staticsData?.affiliateUserProfile?.socialMediaLink?.twitter : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.twitter ? "_blank" : "_self"} rel="noopener noreferrer">
                {theme === "dark" ?
              <img alt="man" src={twitter_dark}/>
              :
                  <img alt="Twitter" src={twitter} />
                }
                </a>

              </div>

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
            </div>
            <div className="side-container">
              <TeamCaptainTabs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCaptainDash;
