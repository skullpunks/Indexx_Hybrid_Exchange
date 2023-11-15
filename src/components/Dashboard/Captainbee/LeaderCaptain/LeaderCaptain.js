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
import hat from "../../../../assets/hive-dashboard/subheader/new_hat.svg";

import copper from "../../../../assets/powerpack/copper hat.svg";
// import bronze from "../../../../assets/Rank Badges/1 bronze.svg";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
import { getCaptainBeeStatics, getReferredUserDetails, baseCEXURL, baseHiveURL } from '../../../../services/api';
import RemoveCaptain from '../../../BuySell/Notification/RemoveCaptain';
import ChangeCaptain from '../../../BuySell/Notification/ChangeCaptain';
import SubHeader from '../SubHeader/SubHeader';
import { PackData } from '../../../PowerPack/PackData';
import OpenNotification from '../../../OpenNotification/OpenNotification';
import { RankData } from '../../RankData';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material'

const LeaderCaptain = () => {
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainBeeFullData, setRefferedFullData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [rankPhoto, setRankPhoto] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [email, setEmail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpench, setIsModalOpenCh] = useState(false);
  const [staticsData, setStaticsData] = useState();

  useEffect(() => {
    const email = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;

    setEmail(email);
    if (username) {
      getCaptainBeeStatics(username).then((data) => {
        setStaticsData(data.data);
      });
    }
    getReferredUserDetails(email).then((data) => {
      console.log(data?.data)
      console.log(data?.data?.powerPackData)
      console.log(data?.data?.refferedUserAffilateData)
      if (data?.data) {
        setRefferedUserData(data.data.refferedUserAffilateData);
        console.log(data.data.refferedUserAffilateData)
        setRefferedFullData(data.data.referredUserData);
        setCaptainbeeCreateDate(data.data.accountCreationDate);
        setCaptainbeeOrders(data.data.totalOrder);
        setCaptainbeeUsers(data.data.honeyBeesCount);
      }
      if (data?.data?.powerPackData) {
        const getPowerPack = PackData.find(x => x.name === data?.data?.powerPackData?.type)
        setPowerPackPhoto(getPowerPack?.photo);
      } else {
        setPowerPackPhoto(undefined);
      }
      if (data?.data?.affiliateUserProfile?.rank) {
        const getRank = RankData.find(x => x.name === data?.data?.affiliateUserProfile?.rank)
        setRankPhoto(getRank?.photo);
      } else {
        const getRank = RankData.find(x => x.name === "Bronze")
        setRankPhoto(getRank?.photo);
      }
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

  const copyClick = (code) => {
    navigator.clipboard.writeText(code);
    OpenNotification('success', 'Copied Successfully!');
  };

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <>
      <SubHeader />
      {!captainBeeData ?
        (<>
          <div style={{ paddingTop: `${isMobile ? "250px" : '220px'}` }}>
            <div className='font_20x  justify-content-center text-align-center d-flex mb-2' >
              <div style={{ width: `${isMobile ? "80%" : "30%"}`, textAlign: "center" }}>
                There are no Leader Captain Bee for you
              </div>
            </div>
          </div>
        </>) :
        (<>
          <div style={{ paddingTop: `${isMobile ? "250px" : '220px'}` }}>
            <div className='d-flex justify-content-center' style={{ marginLeft: `${isMobile ? "0" : "295px"}`, textAlign: `${isMobile ? "center" : ""}` }}>

              <div className='font_20x fw-bold justify-content-center align-items-center d-flex'
                style={{
                  width: `${isMobile ? "100%" : "1150px"}`,
                  flexDirection: `${isMobile ? "column" : "row"}`
                }}>
                <div style={{ width: `${isMobile ? "100%" : "74%"}` }}>
                  <img src={hat} alt="hat" style={{ marginRight: "10px" }} />
                  Leader Captain Bee’s  Dashboard
                </div>
                <div className='d-flex justify-content-between' style={{ width: `${isMobile ? "83%" : "29.5%"}`, marginTop: `${isMobile ? "20px" : "0"}` }}>

                  <Button
                    variant="outlined"
                    disableTouchRipple
                    onClick={() => setIsModalOpenCh(true)}
                    sx={{
                      borderColor: '#FFB300',
                      borderRadius: '2px',
                      color: '#282828',
                      height: '40px',
                      width: "159px",
                      px: 1,
                      textTransform: 'none',
                      fontSize: '10px',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: '#FFD000',
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
                      width: "159px",
                      height: '40px',
                      px: 1,
                      textTransform: 'none',
                      fontSize: '10px',
                      boxShadow: 'none',
                      '&:hover': {
                        borderColor: '#FFD000',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Remove Leader Captain Bee
                  </Button>
                </div>

              </div>
            </div>

            <div className="hive-container justify-content-center">
              <div
                className="d-flex justify-content-between"
                style={{ flexDirection: `${isMobile ? "column" : "row"}` }}
              // style={{ width: '76%', maxWidth: '1140px' }}
              >
                <div className="d-flex flex-direction-column mt-1 " style={{ width: `${isMobile ? "100%" : "16%"}` }}>
                  <div className="d-flex  flex-direction-row align-items-center" style={{ marginLeft: `${isMobile ? "35px" : "0px"}` }}>

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

                        <img
                          alt=""
                          src={rankPhoto}
                          style={{
                            position: 'absolute',
                            bottom: '-25px',
                            right: '17px',
                            width: '79px',
                            height: '81px',
                          }}
                        />
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
                          // src={captainBeeData?.refferedUserAffilateData?.photoIdFileurl !== undefined ? captainBeeData?.refferedUserAffilateData?.photoIdFileurl : dummy}
                          src={(staticsData?.affiliateUserProfile?.photoIdFileurl !== undefined) ? staticsData?.affiliateUserProfile?.photoIdFileurl : dummy}
                          width={'63px'}
                          height={'66px'}
                          ml={'-6px'}
                          border={'none'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font_20x fw-bold align-items-start mt-4 lh_32x" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
                    Leader Captain {captainBeeData?.Username}
                  </div>
                  <div className="font_10x mb-3 lh_32x align-items-start" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
                    Leader Captain Bee of Captain Willie’s Team
                  </div>
                  {(powerPackPhoto !== undefined && powerPackPhoto !== "") ?
                    (<div className="justify-content-center d-flex">
                      <img src={powerPackPhoto} alt='pack' width={isMobile ? "45%" : "80%"} />
                    </div>) : (
                      <div className="justify-content-start d-flex">
                        Leader has not purchased any powerpack.
                      </div>
                    )
                  }
                  <div className="align-items-start lh_32x" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
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
                    {captainBeeData?.isPhonePublic &&
                      <div className="font_13x d-flex align-items-center">
                        {theme === 'dark' ? (
                          <img alt="man" src={phone_dark} className="me-2" />
                        ) : (
                          <img alt="man" src={phone} className="me-2" />
                        )}
                        {String(`(${captainBeeData?.Phone.slice(0, 3)}) ${captainBeeData?.Phone.slice(3, 6)}-${captainBeeData?.Phone.slice(6)}`)}
                      </div>
                    }
                    {captainBeeData?.isEmailPublic &&
                      <div className="font_13x d-flex align-items-center">
                        {theme === 'dark' ? (
                          <img alt="man" src={email_dark} className="me-2" />
                        ) : (
                          <img alt="man" src={email_icon} className="me-2" />
                        )}
                        {captainBeeData?.Email}
                      </div>
                    }
                  </div>

                  <div className="align-items-start lh_32x mt-4" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
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

                    <div className="d-flex flex-direction-column align-items-start mt-5">
                      <div>
                        <span className='fw-bold'>
                          Invite Honey Bee :
                        </span>
                        <br />
                        {captainBeeFullData?.referralCode}
                        <ContentCopyIcon
                          fontSize="13px"
                          onClick={() => copyClick(baseCEXURL +
                            "/indexx-exchange/buy-sell/get-started-honeybee?referral=" +
                            captainBeeFullData?.referralCode)}
                          style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
                        />
                      </div>
                      <br />
                      <div>
                        <span className='fw-bold'>
                          Invite Captain Bee :
                        </span>
                        <br />
                        {captainBeeFullData?.referralCode}
                        <ContentCopyIcon
                          fontSize="13px"
                          onClick={() => copyClick(baseHiveURL +
                            "/sign-up?referral=" +
                            captainBeeFullData?.referralCode)}
                          style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
                        />
                      </div>
                    </div>

                  </div>
                  <div className="d-flex  flex-direction-column align-items-start mt-5" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
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
                <div className="side-container" style={{ marginLeft: 0, width: `${isMobile ? "auto" : "1150px"}`, marginTop: `${isMobile ? "65px" : "0px"}` }}>
                  <LeaderCaptainTabs leaderEmail={captainBeeData?.Email} />
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
        </>)
      }
    </>
  );
};

export default LeaderCaptain;
