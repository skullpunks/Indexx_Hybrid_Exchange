import React, { useEffect, useState } from 'react';
import framecapt from '../../../../assets/hive-dashboard/frame.svg';
import frame from '../../../../assets/hive-dashboard/beeframe-2.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/location.png';
import man from '../../../../assets/hive-dashboard/sidebar/man.png';
import house from '../../../../assets/hive-dashboard/sidebar/home.png';
import clock from '../../../../assets/hive-dashboard/sidebar/clock.png';

import pin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/location.png';
import man_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/man.png';
import house_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/home.png';
import clock_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/clock.png';

// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import SubHeader from '../SubHeader/SubHeader';
import '../CaptainDash.css';
import BeeTabs from './BeeTabs';
import {
  getCaptainBeeStatics,
  getHoneyBeeDataByUsername,
} from '../../../../services/api';
import { useParams } from 'react-router-dom';
import TeamCaptainDashIndividual from '../TeamCaptainBees/TeamCaptainDashIndividual';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import loadingGif from '../../../../assets/beeloade.gif';
import HiveDashboardIconicHeader from '../SubHeader/HiveDashboardIconicHeader';

const BeeDash = () => {
  const { id, userType } = useParams();

  const [honeyBeeData, setHoneyBeeData] = useState();
  const [captainBeeData, setCaptainBeeData] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState('');
  const [staticsData, setStaticsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHoneyBeeDataByUsername(id);

        console.log('Data.', data?.data);
        setHoneyBeeData(data.data);
        setHoneyBeeEmail(data?.data?.userFullData?.email);
        setCaptainBeeData(data?.data?.referredUserData?.data2);
        if (id) {
          const captdata = await getCaptainBeeStatics(id);
          setStaticsData(captdata.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
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

  const [selectedTab, setSelectedTab] = useState('My Hive Members');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      {/* <SubHeader /> */}
      {/* <HiveDashboardIconicHeader /> */}

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
            Please wait while your Hive Member's Hive Dashboard is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}
      {userType === 'HoneyBee' ? (
        <>
          <HiveDashboardIconicHeader
            selectedTab={selectedTab}
            onChange={handleTabChange}
          />
          <div
            className="hive-container"
            style={{
              padding: '20px',
              maxWidth: '1440px',
              width: '100%',
              margin: 'auto',
              marginTop: '50px',
            }}
          >
            <div
              className="d-flex  gap-5"
              style={{ flexDirection: `${isMobile ? 'column' : 'row'}` }}
            >
              <div
                className="d-flex flex-direction-column"
                style={{ width: !isMobile ? '300px' : '100%' }}
              >
                <div className="d-flex  flex-direction-row align-items-center">
                  <div
                    style={{
                      width: '193px',
                      height: '193px',
                      // backgroundImage: `url(${framecapt})`,
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
                      marginTop: '-15px',
                    }}
                  >
                    <div
                      style={{
                        width: '193px',
                        height: '193px',
                        position: 'absolute',
                        zIndex: '1',
                      }}
                    >
                      <img
                        src={frame}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <div className="hexagon">
                      <img
                        alt=""
                        src={
                          captainBeeData?.photoIdFileurl !== undefined
                            ? captainBeeData?.photoIdFileurl
                            : dummy
                        }
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
                      backgroundImage: `url(${
                        userType === 'CaptainBee' ? framecapt : frame
                      })`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      position: 'relative',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'end',
                      // border:"none",
                      marginBottom: '-4.5px',
                    }}
                  >
                    <div
                      className="side-hexagon"
                      style={{ marginBottom: '8px' }}
                    >
                      <img
                        alt=""
                        src={
                          honeyBeeData?.userFullData?.profilePic !== undefined
                            ? honeyBeeData?.userFullData?.profilePic
                            : staticsData?.affiliateUserProfile
                                ?.photoIdFileurl !== undefined
                            ? staticsData?.affiliateUserProfile?.photoIdFileurl
                            : dummy
                        }
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
                    {userType === 'CaptainBee' ? 'Hive Captain' : 'Hive Member'}{' '}
                    {id}
                  </div>
                  <div className="font_10x mb-3 lh_32x align-items-start">
                    {userType === 'CaptainBee'
                      ? 'Hive Captain of Captain'
                      : 'Hive Member of Captain'}{' '}
                    {honeyBeeData?.referredUserData?.data2?.Username} Team
                  </div>
                  <div className="font_13x d-flex align-items-center ">
                    {theme === 'dark' ? (
                      <img alt="man" src={man_dark} className="me-2" />
                    ) : (
                      <img alt="man" src={man} className="me-2" />
                    )}
                    @{id}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === 'dark' ? (
                      <img alt="man" src={pin_dark} className="me-2" />
                    ) : (
                      <img alt="man" src={pin} className="me-2" />
                    )}
                    {honeyBeeData?.userFullData?.country === undefined
                      ? 'NA'
                      : honeyBeeData?.userFullData?.country}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === 'dark' ? (
                      <img alt="man" src={house_dark} className="me-2" />
                    ) : (
                      <img alt="man" src={house} className="me-2" />
                    )}
                    {honeyBeeData?.userFullData?.city === undefined
                      ? 'NA'
                      : honeyBeeData?.userFullData?.city}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === 'dark' ? (
                      <img alt="man" src={clock_dark} className="me-2" />
                    ) : (
                      <img alt="man" src={clock} className="me-2" />
                    )}
                    {honeyBeeData?.formatedAccountCreationDate}
                  </div>
                </div>
              </div>
              <div style={{ width: !isMobile ? 'calc(100% - 300px)' : '100%' }}>
                <div className="font_20x fw-bold d-flex gap-3 mb-3">
                  {userType === 'CaptainBee'
                    ? 'Hive Captain’s  Hive Dashboard / Hive Captain’s  Dashboard'
                    : 'Hive Member’s  Hive Dashboard / Hive Member’s  Dashboard'}
                </div>
                <div
                  className="side-container"
                  style={{
                    background: theme === 'dark' ? '#2B3139' : '#efefef',
                  }}
                >
                  <BeeTabs honeyBeeEmail={honeyBeeEmail} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <TeamCaptainDashIndividual />
      )}
    </>
  );
};

export default BeeDash;
