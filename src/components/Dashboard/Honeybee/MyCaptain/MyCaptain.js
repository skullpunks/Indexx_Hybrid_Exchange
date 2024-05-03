import React, { useEffect, useState } from 'react';
import frame from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/location.png';
import man from '../../../../assets/hive-dashboard/sidebar/man.png';
import house from '../../../../assets/hive-dashboard/sidebar/home.png';
import clock from '../../../../assets/hive-dashboard/sidebar/clock.png';

import pin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/location.png';
import man_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/man.png';
import house_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/home.png';
import clock_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/clock.png';

import twitter from '../../../../assets/hive-dashboard/sidebar/twitter.png';
import insta from '../../../../assets/hive-dashboard/sidebar/instagram.png';
import linkedin from '../../../../assets/hive-dashboard/sidebar/linkedin.png';
import discord from '../../../../assets/hive-dashboard/sidebar/discord.png';

import twitter_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/twitter.png';
import insta_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/instagram.png';
import linkedin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/linkedin.png';
import discord_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/discord.png';

import loadingGif from '../../../../assets/beeloade.gif';

import '../../Captainbee/CaptainDash.css';
import MyCaptainTabs from './MyCaptainTabs';
import BeeHeader from '../BeeHeader/BeeHeader';
import { Button, Rating } from '@mui/material';
import { getReferredUserDetails } from '../../../../services/api';
import RemoveCaptain from '../../../BuySell/Notification/RemoveCaptain';
import ChangeCaptain from '../../../BuySell/Notification/ChangeCaptain';
import { RankData } from '../../RankData';

const MyCaptain = () => {
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [email, setEmail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpench, setIsModalOpenCh] = useState(false);
  const [rankPhoto, setRankPhoto] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const email =
        localStorage.getItem('user') !== undefined
          ? String(localStorage.getItem('user'))
          : undefined;
      setEmail(email);

      try {
        const data = await getReferredUserDetails(email);
        setRefferedUserData(data.data.refferedUserAffilateData);
        setCaptainbeeCreateDate(data.data.accountCreationDate);
        setCaptainbeeOrders(data.data.totalOrder);
        setCaptainbeeUsers(data.data.honeyBeesCount);

        if (data?.data?.refferedUserAffilateData?.rank) {
          const getRank = RankData.find(
            (x) => x.name === data?.data?.refferedUserAffilateData?.rank
          );
          setRankPhoto(getRank?.photo);
        } else {
          const getRank = RankData.find((x) => x.name === 'Bronze');
          setRankPhoto(getRank?.photo);
        }
        setIsLoading(false);
      } catch (error) {
        // Handle error
        console.error('Error loading referred user details:', error);
      }
    };

    loadData();
  }, []);

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
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

  return (
    <>
      <BeeHeader />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 995,
            pointerEvents: 'none',
          }}
        >
          <img src={loadingGif} alt="Loading" />
          <p
            style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}
          >
            Please wait while your Captain Bee's Hive Dashboard is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}
      <div style={{ paddingTop: '220px' }}>
        <div
          className="d-flex justify-content-center"
          style={{ marginLeft: '268px' }}
        >
          <div
            className="font_20x fw-bold justify-content-center d-flex"
            style={{ width: '1200px' }}
          >
            <div style={{ width: '85%' }}>Your Captain Bee’s Dashboard</div>
            <div
              className="d-flex justify-content-between"
              style={{ width: '29.5%' }}
            >
              <Button
                variant="outlined"
                disableTouchRipple
                onClick={() => setIsModalOpenCh(true)}
                sx={{
                  borderColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  height: '40px',
                  width: '149px',
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
                Change Captain Bee
              </Button>
              <Button
                variant="outlined"
                disableTouchRipple
                onClick={() => setIsModalOpen(true)}
                sx={{
                  borderColor: '#FFB300',
                  borderRadius: '2px',
                  color: '#282828',
                  width: '149px',
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
                Remove Captain Bee
              </Button>
            </div>
          </div>
        </div>

        <div className="hive-container">
          <div
            className="d-flex justify-content-center"
            // style={{ width: '76%', maxWidth: '1140px' }}
          >
            <div
              className="d-flex flex-direction-column mt-1"
              style={{ width: '240px' }}
            >
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
                      src={
                        captainBeeData?.photoIdFileurl === undefined
                          ? dummy
                          : captainBeeData?.photoIdFileurl
                      }
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
              <div className="font_20x align-items-start fw-bold mt-4 mb-3 lh_32x">
                Captain Bee {captainBeeData?.Username}
              </div>
              <div className="align-items-start lh_32x">
                <div className="font_13x d-flex align-items-center ">
                  <img
                    alt="man"
                    src={theme === 'dark' ? man_dark : man}
                    className="me-2"
                  />
                  @{captainBeeData?.accname}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img
                    alt="man"
                    src={theme === 'dark' ? pin_dark : pin}
                    className="me-2"
                  />
                  {captainBeeData?.country}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img
                    alt="man"
                    src={theme === 'dark' ? house_dark : house}
                    className="me-2"
                  />
                  {captainBeeData?.city}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img
                    alt="man"
                    src={theme === 'dark' ? clock_dark : clock}
                    className="me-2"
                  />
                  {captainbeeCreateDate}
                </div>
              </div>

              <div className="align-items-start lh_32x mt-4">
                <a
                  href={
                    captainBeeData?.socialMediaLink?.discord
                      ? captainBeeData?.socialMediaLink?.discord
                      : '#'
                  }
                  target={
                    captainBeeData?.socialMediaLink?.discord
                      ? '_blank'
                      : '_self'
                  }
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Discord"
                    src={theme === 'dark' ? discord_dark : discord}
                    className="me-3"
                  />
                </a>
                <a
                  href={
                    captainBeeData?.socialMediaLink?.instagram
                      ? captainBeeData?.socialMediaLink?.instagram
                      : '#'
                  }
                  target={
                    captainBeeData?.socialMediaLink?.instagram
                      ? '_blank'
                      : '_self'
                  }
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Instagram"
                    src={theme === 'dark' ? insta_dark : insta}
                    className="me-3"
                  />
                </a>
                <a
                  href={
                    captainBeeData?.socialMediaLink?.linkedin
                      ? captainBeeData?.socialMediaLink?.linkedin
                      : '#'
                  }
                  target={
                    captainBeeData?.socialMediaLink?.linkedin
                      ? '_blank'
                      : '_self'
                  }
                  rel="noopener noreferrer"
                >
                  <img
                    alt="LinkedIn"
                    src={theme === 'dark' ? linkedin_dark : linkedin}
                    className="me-3"
                  />
                </a>
                <a
                  href={
                    captainBeeData?.socialMediaLink?.twitter
                      ? captainBeeData?.socialMediaLink?.twitter
                      : '#'
                  }
                  target={
                    captainBeeData?.socialMediaLink?.twitter
                      ? '_blank'
                      : '_self'
                  }
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Twitter"
                    src={theme === 'dark' ? twitter_dark : twitter}
                  />
                </a>
              </div>
              <div className="d-flex  flex-direction-column align-items-start mt-5">
                <div className="font_13x ">Your Rating</div>
                <div className="mt-4">
                  <Rating name="read-only" value={4} readOnly size="large" />
                </div>
                <div className="font_40x mt-3">95%</div>
              </div>
            </div>
            <div className="side-container">
              <MyCaptainTabs />
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

export default MyCaptain;
