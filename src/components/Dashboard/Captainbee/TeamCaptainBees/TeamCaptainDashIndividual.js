import React, { useState, useEffect } from 'react';
import frame from '../../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../../assets/hive-dashboard/sidebar/location.png';
import man from '../../../../assets/hive-dashboard/sidebar/man.png';
import house from '../../../../assets/hive-dashboard/sidebar/home.png';
import clock from '../../../../assets/hive-dashboard/sidebar/clock.png';
import email from '../../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone from '../../../../assets/hive-dashboard/sidebar/phone icon 1.svg';

import pin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/location.png';
import man_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/man.png';
import house_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/home.png';
import clock_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/clock.png';
import email_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/email white.svg';
import phone_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/phone white.svg';
import loadingGif from '../../../../assets/beeloade.gif';

import twitter from '../../../../assets/hive-dashboard/sidebar/twitter.png';
import insta from '../../../../assets/hive-dashboard/sidebar/instagram.png';
import linkedin from '../../../../assets/hive-dashboard/sidebar/linkedin.png';
import discord from '../../../../assets/hive-dashboard/sidebar/discord.png';

import twitter_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/twitter.png';
import insta_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/instagram.png';
import linkedin_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/linkedin.png';
import discord_dark from '../../../../assets/hive-dashboard/sidebar/dark-icons/discord.png';

import arrow from '../../../../assets/hive-dashboard/Arrow 1.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Rating } from '@mui/material';

// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import '../../Captainbee/CaptainDash.css';
import { Box, Grid, Button } from '@mui/material';
import HoneyBeeComingSoon from '../../../../components/ComingSoon/HoneyBeeComingSoon';
import {
  baseCEXURL,
  baseHiveURL,
  getCaptainBeeStatics,
  getHoneyUserDetails,
  getReferredUserDetails,
} from '../../../../services/api';
import SubHeader from '../SubHeader/SubHeader';
import TeamCaptainTabs from './TeamCaptainTabs';
import { PackData } from '../../../PowerPack/PackData';
import OpenNotification from '../../../OpenNotification/OpenNotification';
import { useParams } from 'react-router-dom';
import { RankData } from '../../RankData';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import HiveDashboardIconicHeader from '../SubHeader/HiveDashboardIconicHeader';

const TeamCaptainDashIndividual = () => {
  const { id } = useParams();
  const [userType, setUserType] = useState('');
  const [staticsData, setStaticsData] = useState();
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [rankPhoto, setRankPhoto] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesUsers, setCaptainbeeUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userType =
          localStorage.getItem('userType') !== undefined
            ? String(localStorage.getItem('userType'))
            : undefined;
        const user =
          localStorage.getItem('user') !== undefined
            ? String(localStorage.getItem('user'))
            : undefined;

        setUserType(userType);
        if (userType === 'CaptainBee') {
          if (id) {
            const data = await getCaptainBeeStatics(id);
            setStaticsData(data.data);
            if (data?.data?.powerPackData) {
              const getPowerPack = PackData.find(
                (x) => x.name === data?.data?.powerPackData?.type
              );
              setPowerPackPhoto(getPowerPack?.photo);
            } else {
              setPowerPackPhoto(undefined);
            }
            if (data?.data?.affiliateUserProfile?.rank) {
              const getRank = RankData.find(
                (x) => x.name === data?.data?.affiliateUserProfile?.rank
              );
              setRankPhoto(getRank?.photo);
            } else {
              const getRank = RankData.find((x) => x.name === 'Bronze');
              setRankPhoto(getRank?.photo);
            }
          }
          console.log('I am if');
        } else {
          console.log('I am else');

          const honeyUserData = await getHoneyUserDetails(user);
          setHoneybeeCreateDate(honeyUserData.data.accountCreationDate);
          setHoneyBeeData(honeyUserData?.data?._doc);

          const referredUserData = await getReferredUserDetails(user);
          setRefferedUserData(referredUserData.data);
          setCaptainbeeCreateDate(referredUserData?.data?.accountCreationDate);
          setCaptainbeeOrders(referredUserData.data.totalOrder);
          setCaptainbeeUsers(referredUserData.data.honeyBeesCount);
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
  }, []);

  console.log(isLoading, 'load');
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

  const copyClick = (code) => {
    navigator.clipboard.writeText(code);
    OpenNotification('success', 'Copied Successfully!');
  };

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('lg'));

  return (
    <>
      {/* <SubHeader /> */}
      <HiveDashboardIconicHeader />

      {isLoading ? (
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
            Please wait while your Team Hive Captain's Hive Dashboard is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      ) : (
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
              <div
                style={{
                  width: '193px',
                  height: '193px',
                  // backgroundImage: `url(${frame})`,
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
                <div
                  style={{
                    width: '193px',
                    height: '193px',
                    position: 'absolute',
                    zIndex: '1',
                  }}
                >
                  <img src={frame} style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="hexagon">
                  <img
                    alt=""
                    src={
                      staticsData?.affiliateUserProfile?.photoIdFileurl !==
                      undefined
                        ? staticsData?.affiliateUserProfile?.photoIdFileurl
                        : dummy
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
                    zIndex: '2',
                  }}
                />
              </div>
              <div className="align-items-start lh_32x">
                <div className="font_20x fw-bold align-items-start mt-4 lh_32x">
                  Team Hive Captain{' '}
                  {staticsData?.affiliateUserProfile?.Username}
                </div>
                <div className="font_10x mb-3 lh_32x align-items-start">
                  Hive Captain of Captain{' '}
                  {captainBeeData?.refferedUserAffilateData?.Username} Team
                </div>
                {powerPackPhoto !== undefined && powerPackPhoto !== '' ? (
                  <div className="justify-content-center d-flex">
                    <img src={powerPackPhoto} alt="pack" width={'80%'} />
                  </div>
                ) : (
                  <div>
                    Please purchase the powerpack from the below URL: <br />
                    <a href={`${baseCEXURL}/indexx-exchange/power-pack`}>
                      Power Pack Purchase
                    </a>
                  </div>
                )}
                <div className="align-items-start lh_32x">
                  <div className="font_13x d-flex align-items-center mt-4">
                    {theme === 'dark' ? (
                      <img alt="man" src={man_dark} className="me-1" />
                    ) : (
                      <img alt="man" src={man} className="me-1" />
                    )}
                    {staticsData?.affiliateUserProfile?.Username
                      ? `@${staticsData?.affiliateUserProfile?.Username}`
                      : 'NA'}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === 'dark' ? (
                      <img alt="man" src={pin_dark} className="me-2" />
                    ) : (
                      <img alt="man" src={pin} className="me-2" />
                    )}
                    {staticsData?.affiliateUserProfile?.country
                      ? staticsData?.affiliateUserProfile?.country
                      : ' NA'}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === 'dark' ? (
                      <img alt="man" src={house_dark} className="me-1" />
                    ) : (
                      <img alt="man" src={house} className="me-1" />
                    )}
                    {staticsData?.affiliateUserProfile?.city
                      ? `@${staticsData?.affiliateUserProfile?.city}`
                      : 'NA'}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === 'dark' ? (
                      <img alt="man" src={clock_dark} className="me-1" />
                    ) : (
                      <img alt="man" src={clock} className="me-1" />
                    )}
                    {staticsData?.formatedAccountCreationDate}
                  </div>
                  {staticsData?.affiliateUserProfile?.isPhonePublic && (
                    <div className="font_13x d-flex align-items-center">
                      {theme === 'dark' ? (
                        <img alt="man" src={phone_dark} className="me-2" />
                      ) : (
                        <img alt="man" src={phone} className="me-2" />
                      )}
                      {staticsData?.affiliateUserProfile?.Phone}
                    </div>
                  )}
                  {staticsData?.affiliateUserProfile?.isEmailPublic && (
                    <div className="font_13x d-flex align-items-center">
                      {theme === 'dark' ? (
                        <img alt="man" src={email_dark} className="me-2" />
                      ) : (
                        <img alt="man" src={email} className="me-2" />
                      )}
                      {staticsData?.affiliateUserProfile?.Email}
                    </div>
                  )}
                </div>

                <div className="align-items-start lh_32x mt-4">
                  <a
                    href={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.discord
                        ? staticsData?.affiliateUserProfile?.socialMediaLink
                            ?.discord
                        : '#'
                    }
                    target={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.discord
                        ? '_blank'
                        : '_self'
                    }
                    rel="noopener noreferrer"
                  >
                    {theme === 'dark' ? (
                      <img alt="man" src={discord_dark} className="me-3" />
                    ) : (
                      <img alt="Discord" src={discord} className="me-3" />
                    )}
                  </a>
                  <a
                    href={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.instagram
                        ? staticsData?.affiliateUserProfile?.socialMediaLink
                            ?.instagram
                        : '#'
                    }
                    target={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.instagram
                        ? '_blank'
                        : '_self'
                    }
                    rel="noopener noreferrer"
                  >
                    {theme === 'dark' ? (
                      <img alt="man" src={insta_dark} className="me-3" />
                    ) : (
                      <img alt="Instagram" src={insta} className="me-3" />
                    )}
                  </a>
                  <a
                    href={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.linkedin
                        ? staticsData?.affiliateUserProfile?.socialMediaLink
                            ?.linkedin
                        : '#'
                    }
                    target={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.linkedin
                        ? '_blank'
                        : '_self'
                    }
                    rel="noopener noreferrer"
                  >
                    {theme === 'dark' ? (
                      <img alt="man" src={linkedin_dark} className="me-3" />
                    ) : (
                      <img alt="LinkedIn" src={linkedin} className="me-3" />
                    )}
                  </a>
                  <a
                    href={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.twitter
                        ? staticsData?.affiliateUserProfile?.socialMediaLink
                            ?.twitter
                        : '#'
                    }
                    target={
                      staticsData?.affiliateUserProfile?.socialMediaLink
                        ?.twitter
                        ? '_blank'
                        : '_self'
                    }
                    rel="noopener noreferrer"
                  >
                    {theme === 'dark' ? (
                      <img alt="man" src={twitter_dark} />
                    ) : (
                      <img alt="Twitter" src={twitter} />
                    )}
                  </a>
                </div>

                <div className="d-flex flex-direction-column align-items-start mt-5">
                  <div>
                    <span className="fw-bold">Invite Hive Member :</span>
                    <br />
                    {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() =>
                        copyClick(
                          baseCEXURL +
                            '/indexx-exchange/buy-sell/get-started-honeybee?referral=' +
                            staticsData?.userFullData?.referralCode
                        )
                      }
                      style={{
                        cursor: 'pointer',
                        marginBottom: '4px',
                        marginLeft: '5px',
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <span className="fw-bold">Invite Hive Captain :</span>
                    <br />
                    {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() =>
                        copyClick(
                          baseHiveURL +
                            '/sign-up?referral=' +
                            staticsData?.userFullData?.referralCode
                        )
                      }
                      style={{
                        cursor: 'pointer',
                        marginBottom: '4px',
                        marginLeft: '5px',
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex  flex-direction-column align-items-start mt-5">
                  <div className="font_13x ">Your Rating</div>
                  <div className="mt-4">
                    <Rating name="read-only" value={4} readOnly size="large" />
                  </div>
                  <div className="font_40x mt-3">95%</div>
                </div>
              </div>
            </div>
            <div style={{ width: !isMobile ? 'calc(100% - 300px)' : '100%' }}>
              <div className="font_20x fw-bold d-flex gap-3 mb-3">
                Team Hive Captain's Hive Dashboard / Dashboard
              </div>
              <div
                className="side-container"
                style={{ background: theme === 'dark' ? '#2B3139' : '#efefef' }}
              >
                <TeamCaptainTabs email={staticsData?.userFullData?.email} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamCaptainDashIndividual;
