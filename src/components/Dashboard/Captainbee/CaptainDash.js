import React, { useState, useEffect } from 'react';
import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';
import waggle from '../../../assets/hive-dashboard/Waggle_LM.png';
import waggle_dark from '../../../assets/hive-dashboard/waggle_DM.png';

import pin from '../../../assets/hive-dashboard/sidebar/location.png';
import man from '../../../assets/hive-dashboard/sidebar/man.png';
import house from '../../../assets/hive-dashboard/sidebar/home.png';
import clock from '../../../assets/hive-dashboard/sidebar/clock.png';
import email from '../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone from '../../../assets/hive-dashboard/sidebar/phone icon 1.svg';
import info from '../../../assets/hive-dashboard/sidebar/info.png';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import pin_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/location.png';
import man_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/man.png';
import house_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/home.png';
import clock_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/clock.png';
import email_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/email white.svg';
import phone_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/phone white.svg';

import twitter from '../../../assets/hive-dashboard/sidebar/twitter.png';
import insta from '../../../assets/hive-dashboard/sidebar/instagram.png';
import linkedin from '../../../assets/hive-dashboard/sidebar/linkedin.png';
import discord from '../../../assets/hive-dashboard/sidebar/discord.png';

import twitter_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/twitter.png';
import insta_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/instagram.png';
import linkedin_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/linkedin.png';
import discord_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/discord.png';
import loadingGif from '../../../assets/beeloade.gif';

import arrow from '../../../assets/hive-dashboard/Arrow 1.svg';
import { PackData } from '../../PowerPack/PackData';
import { RankData } from '../RankData';
// import HoneyBeeComingSoon from "../../../components/ComingSoon/HoneyBeeComingSoon";

// import { LineChart } from '@mui/x-charts/LineChart';

// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';

// import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import SubHeader from './SubHeader/SubHeader';
import './CaptainDash.css';
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Rating,
  ButtonBase,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
  baseCEXURL,
  getCaptainBeeStatics,
  baseHiveURL,
  getCoinPriceByName,
  getAppSettings,
  oneUSDHelper,
  createINEXBuyOrder,
  formatReadableDate,
  createMonthlyINEXsubscription,
  decodeJWT,
  cancelMonthlyINEXsubscription,
  createMonthlyINEXOrderNonPaypal,
} from '../../../services/api';
import BeeDash2 from '../Honeybee/MyBees/BeeDash2';

import { useMediaQuery } from '@mui/material';
import OpenNotification from '../../OpenNotification/OpenNotification';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CommissionTable from './CommissionTable';
import { Button } from 'antd';
import SubscriptionPaymentOptions from '../../BuySell/Notification/SubscriptionPaymentOptions';
import { useTheme } from '@mui/material/styles';
import GenericButton from '../../updated/shared/Button';
import { makeStyles } from '@mui/styles';
import HiveDashboardIconicHeader from './SubHeader/HiveDashboardIconicHeader';

let appSettingArr = [];
let priceData = {};

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '13px !important',
    lineHeight: '10px !important',
    padding: '0px 12px !important',
    height: '28px !important',
    background: `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
}));

const CaptainDash = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [rankPhoto, setRankPhoto] = useState();

  const [userType, setUserType] = useState('');

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [message, setMessage] = useState();
  const [message1, setMessage1] = useState();
  const [staticsData, setStaticsData] = useState();
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [rateData, setRateData] = useState();
  const [adminFee, setAdminFees] = useState('');
  const [loadings, setLoadings] = useState(false);
  const [loadingsubs, setLoadingsubs] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [checkSubscription, setCheckSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      arrow
      classes={{ popper: className }}
      placement="top-start"
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'var(--body_background)',
      backgroundColor: 'var(--body_background)',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--body_background)',
      color: 'var(--body_color)',
      minWidth: '90%',
      width: '215px',
    },
  }));

  useEffect(() => {
    const nextPurchaseDate = staticsData?.nextPurchaseDate;
    if (!nextPurchaseDate) return;

    const updateTimer = () => {
      const remaining = calculateTimeRemaining(nextPurchaseDate);
      setTimeRemaining(remaining);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [staticsData?.nextPurchaseDate]);

  function calculateTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  const getPricesData = async () => {
    const res = await getCoinPriceByName(String('INEX'));
    priceData = res.data.results.data;
    setRateData(priceData);

    let oneUsdValue = await oneUSDHelper(priceData, 'INEX');
    const finalPay = oneUsdValue * Number(300) * (1 - Number(adminFee) / 100);
    setTotalAmountToPay(finalPay);
  };

  const getAllSetting = async () => {
    const res = await getAppSettings();
    appSettingArr = res.data;
    let adminFees = appSettingArr.find(
      (item) => item.key === 'IndexxTokensAdminFees'
    );
    setAdminFees(adminFees.value);
    return;
  };

  const handleCreateSubscription = async () => {
    try {
      setLoadingsubs(true);
      let access_token = String(localStorage.getItem('access_token'));
      let decoded = decodeJWT(access_token);
      let res = await createMonthlyINEXsubscription(
        decoded.email,
        'USD',
        'INEX',
        '300',
        '',
        ''
      );
      if (res.status === 200) {
        console.log('res', res);
        for (let i = 0; i < res.data.links.length; i++) {
          OpenNotification('success', 'Subscription success');
          if (res.data.links[i].rel.includes('approve')) {
            window.location.href = res.data.links[i].href;
          }
        }
      } else {
        console.log('res', res);
        OpenNotification('error', res.data);
      }
    } catch (err) {
      OpenNotification(
        'error',
        'Something went wrong. Please try again after sometime.'
      );
      console.log('err', err);
    } finally {
      setLoadingsubs(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      let access_token = String(localStorage.getItem('access_token'));
      let decoded = decodeJWT(access_token);
      let res = await cancelMonthlyINEXsubscription(
        decoded.email,
        subscription?.paypalSubscriptionDetails?.id,
        'Cancelling the subscription'
      );
      console.log('Res', res);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userType = localStorage.getItem('userType') || undefined;
        const username = localStorage.getItem('username') || undefined;

        setUserType(userType);

        if (userType === 'CaptainBee' && username) {
          const data = await getCaptainBeeStatics(username);
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

          if (data?.data) {
            let hasValidSubscription = false;
            // Check and set PayPal subscription details
            if (
              data?.data?.paypalSubscriptionDetails?.paypalSubscriptionDBData &&
              Object.keys(data?.data?.paypalSubscriptionDetails).length > 0
            ) {
              setSubscription(data?.data?.paypalSubscriptionDetails);
              hasValidSubscription = true;
            }
            // Check if non-PayPal subscription details exist
            else if (
              data?.data?.nonPaypalSubscriptionDetails
                ?.nonPaypalSubscriptionDBData &&
              Object.keys(
                data?.data?.nonPaypalSubscriptionDetails
                  .nonPaypalSubscriptionDBData
              ).length > 0
            ) {
              setSubscription(
                data?.data?.nonPaypalSubscriptionDetails
                  .nonPaypalSubscriptionDBData
              );
              hasValidSubscription = true;
            }

            setCheckSubscription(hasValidSubscription);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const createNewBuyOrder = async () => {
    setLoadings(true);
    let basecoin = 'INEX';
    let quotecoin = 'USD';
    let amount = 300;
    let outAmount = Math.floor(totalAmountToPay * 1000000) / 1000000;
    let res;
    res = await createINEXBuyOrder(basecoin, quotecoin, amount, outAmount);
    if (res.status === 200) {
      setLoadings(false);
      //--Below code is to enable paypal Order---
      for (let i = 0; i < res.data.links.length; i++) {
        if (res.data.links[i].rel.includes('approve')) {
          window.location.href = res.data.links[i].href;
        }
      }
      //getStripePaymentIntent(res.data.orderId, res.data.user.email);
    } else {
      setLoadings(false);
      setMessage(res.data);
    }
  };

  const createSubscriptionOrderForZelleAndWire = async (paymentMethod) => {
    setLoadings(true);
    //await getPricesData();
    const rate = await getCoinPriceByName(String('INEX'));
    priceData = rate.data.results.data;

    let oneUsdValue = await oneUSDHelper(priceData, 'INEX');
    const finalPay = oneUsdValue * Number(300) * (1 - Number(adminFee) / 100);
    let basecoin = 'INEX';
    let quotecoin = 'USD';
    let amount = 300;
    let outAmount = Math.floor(finalPay * 1000000) / 1000000;
    let res;
    console.log('paymentMethod', paymentMethod);
    res = await createMonthlyINEXOrderNonPaypal(
      basecoin,
      quotecoin,
      amount,
      outAmount,
      paymentMethod
    );
    if (res.status === 200) {
      // Return the order ID for Zelle and Wire
      return res.data.orderId;
    } else {
      setLoadings(false);
      // OpenNotification('error', res.data);
      setIsModalOpen(true);
      setMessage1(res.data);
      return null;
    }
  };
  const [selectedTab, setSelectedTab] = useState('Hive Dashboard');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <HiveDashboardIconicHeader
        selectedTab={selectedTab}
        onChange={handleTabChange}
      />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',

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
            style={{
              marginTop: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Please wait while Hive Dashboard is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}

      {!isLoading && userType === 'CaptainBee' ? (
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
              style={{ flex: '0 0 25%' }}
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
                    }}
                  />
                </div>
              </div>
              <div
                className="font_20x fw-bold mt-4 mb-4 lh_32x d-flex"
                style={{ justifyContent: `${isMobile ? 'center' : 'start'}` }}
              >
                Hive Captain {staticsData?.affiliateUserProfile?.accname}
              </div>
              {powerPackPhoto !== undefined && powerPackPhoto !== '' ? (
                <div className="justify-content-center d-flex">
                  <img
                    src={powerPackPhoto}
                    alt="pack"
                    width={isMobile ? '45%' : '80%'}
                  />
                </div>
              ) : (
                <div className="justify-content-center d-flex flex-direction-column">
                  Please purchase the powerpack from the below URL: <br />
                  <a href={`${baseCEXURL}/indexx-exchange/power-pack`}>
                    Power Pack Purchase
                  </a>
                </div>
              )}
              <div className="align-items-start">
                {!checkSubscription ? (
                  // Display Subscribe Button
                  <div className="d-flex flex-direction-column align-items-start mt-5">
                    <div className="font_15x">
                      Subscribe to your $300 monthly INEX investment today
                    </div>
                    <div
                      className="d-flex gap-3"
                      style={{ width: '100%', marginTop: '10px' }}
                    >
                      <div style={{ display: 'flex' }}>
                        <GenericButton
                          className={classes.button}
                          IconComponent={
                            <img
                              src={info}
                              style={{
                                filter: 'invert(1)',
                                marginLeft: '6px',
                                marginTop: '-3px',
                              }}
                              alt="info"
                            />
                          }
                        />
                      </div>
                      <GenericButton
                        loading={loadings}
                        // onClick={handleCreateSubscription}
                        className={classes.button}
                        text={!loadingsubs ? 'Subscribe' : 'Loading...'}
                        onClick={() => {
                          setIsModalOpen2(true);
                          //createNewBuyOrder(card);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-direction-column align-items-start mt-5">
                    <div className="font_20x">
                      $300 INEX Subscription Details
                      <BootstrapTooltip
                        title="Hive Captain Subscription Fees: 
Ensure your elite rank and commission earnings by subscribing monthly. Failure to pay on time leads to demotion, lowering your Hive Captain status and associated commissions. Stay at the top – don't forget to pay your dues!"
                        sx={{ width: '20%' }}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            fontSize: '18px',
                            color: 'var(--body_color)',
                            mb: 0.5,
                            ml: 0.8,
                          }}
                        />
                      </BootstrapTooltip>
                    </div>

                    <div className="font_13x mt-3">
                      Subscription ID:{' '}
                      {subscription?.paypalSubscriptionDetails?.id ||
                        subscription?.orderId}
                    </div>
                    <div className="font_13x">
                      Status:{' '}
                      {subscription?.paypalSubscriptionDetails?.status ||
                        subscription?.paymentStatus}
                    </div>
                    <div className="font_13x">
                      Next Billing Date:{' '}
                      {formatReadableDate(
                        subscription?.paypalSubscriptionDetails?.billing_info
                          ?.next_billing_time ||
                          subscription?.nextPaymentDate ||
                          'NA'
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div
                className="align-items-start lh_32x mt-4"
                style={{ marginLeft: `${isMobile ? '65px' : '0px'}` }}
              >
                <a
                  href={
                    staticsData?.affiliateUserProfile?.socialMediaLink?.discord
                      ? staticsData?.affiliateUserProfile?.socialMediaLink
                          ?.discord
                      : '#'
                  }
                  target={
                    staticsData?.affiliateUserProfile?.socialMediaLink?.discord
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
                    staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin
                      ? staticsData?.affiliateUserProfile?.socialMediaLink
                          ?.linkedin
                      : '#'
                  }
                  target={
                    staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin
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
                    staticsData?.affiliateUserProfile?.socialMediaLink?.twitter
                      ? staticsData?.affiliateUserProfile?.socialMediaLink
                          ?.twitter
                      : '#'
                  }
                  target={
                    staticsData?.affiliateUserProfile?.socialMediaLink?.twitter
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
                    }}
                  />
                </div>

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
            <div style={{ flex: 1 }}>
              <div className="font_20x fw-bold d-flex gap-3 mb-3">
                <img
                  src={theme === 'dark' ? waggle_dark : waggle}
                  alt=""
                  width={'46px'}
                />
                Hive Dashboard
              </div>
              <div
                className="side-container"
                style={{ background: theme === 'dark' ? '#2B3139' : '#efefef' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: isMobile ? 4 : 2,
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        display: isMobile ? 'none' : 'flex',
                        gap: '16px',
                      }}
                    >
                      <Typography
                        variant="text"
                        component="p"
                        fontSize={'15px'}
                        fontWeight={700}
                        textAlign={'left'}
                        mb={2}
                        sx={{ flex: 1 }}
                      >
                        My Hive Member Statistics
                      </Typography>

                      <Typography
                        variant="text"
                        component="p"
                        fontSize={'15px'}
                        fontWeight={700}
                        textAlign={'left'}
                        mb={2}
                        sx={{ flex: 1 }}
                      >
                        My Hive Captain Statistics
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 2,
                        width: '100%',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          background: 'var(--body_background)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 3,
                          aspectRatio: 1,
                          borderRadius: '10px',
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '10px' : '12px'}
                          fontWeight={600}
                          textAlign={'center'}
                        >
                          Total Hive Members
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '25px' : '70px'}
                          // fontWeight={600}
                          textAlign={'left'}
                        >
                          {staticsData?.honeyBeesCount}
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={'22px'}
                          fontWeight={400}
                          textAlign={'left'}
                          color={'#FFB300'}
                          sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            verticalAlign: 'bottom',
                            gap: 1,
                          }}
                        >
                          <img alt="up" src={arrow} />{' '}
                          {staticsData?.honeyBeesCount ? '30%' : '0%'}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          background: 'var(--body_background)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 3,
                          aspectRatio: 1,
                          borderRadius: '10px',
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '10px' : '12px'}
                          fontWeight={600}
                          textAlign={'center'}
                          mb={2}
                        >
                          Total Commision Earned in USD
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '25px' : '40px'}
                          // fontWeight={600}
                          textAlign={'center'}
                          mb={2}
                        >
                          $
                          {staticsData?.affiliateHoneyBeeUserTotalEarnings
                            ?.amountInUSD
                            ? parseFloat(
                                staticsData?.affiliateHoneyBeeUserTotalEarnings
                                  ?.amountInUSD
                              ).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : '0.00'}
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '10px' : '12px'}
                          fontWeight={600}
                          textAlign={'center'}
                          mb={2}
                        >
                          Total Commision Earned in INEX
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '25px' : '40px'}
                          // fontWeight={600}
                          textAlign={'center'}
                          mb={2}
                        >
                          {staticsData?.affiliateHoneyBeeUserTotalEarnings
                            ?.amountInINEX
                            ? parseFloat(
                                staticsData?.affiliateHoneyBeeUserTotalEarnings
                                  ?.amountInINEX
                              ).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : '0.00'}
                          <span className="font_17x">INEX</span>
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={'22px'}
                          fontWeight={400}
                          textAlign={'center'}
                          color={'#FFB300'}
                          sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            verticalAlign: 'bottom',
                            gap: 1,
                          }}
                        >
                          <img alt="up" src={arrow} />{' '}
                          {staticsData?.ordersCount ? '15%' : '0%'}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          background: 'var(--body_background)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 3,
                          aspectRatio: 1,
                          borderRadius: '10px',
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '10px' : '12px'}
                          fontWeight={600}
                          textAlign={'center'}
                        >
                          Total Team Hive Captains
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '25px' : '70px'}
                          // fontWeight={600}
                          textAlign={'center'}
                        >
                          {staticsData?.captainsCount}
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={'22px'}
                          fontWeight={400}
                          textAlign={'center'}
                          color={'#FFB300'}
                          sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            verticalAlign: 'bottom',
                            gap: 1,
                          }}
                        >
                          <img alt="up" src={arrow} />{' '}
                          {staticsData?.captainsCount ? '30%' : '0%'}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,

                          background: 'var(--body_background)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 3,
                          aspectRatio: 1,
                          borderRadius: '10px',
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '10px' : '12px'}
                          fontWeight={600}
                          textAlign={'center'}
                          mb={2}
                        >
                          Total Commision Earned in USD
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '25px' : '40px'}
                          // fontWeight={600}
                          textAlign={'center'}
                          mb={2}
                        >
                          $
                          {staticsData?.affiliateUserTotalEarnings?.amountInUSD
                            ? parseFloat(
                                staticsData?.affiliateUserTotalEarnings
                                  ?.amountInUSD
                              ).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : '0.00'}
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '10px' : '12px'}
                          fontWeight={600}
                          textAlign={'center'}
                          mb={2}
                        >
                          Total Commision Earned in INEX
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '25px' : '40px'}
                          // fontWeight={600}
                          textAlign={'center'}
                        >
                          {staticsData?.affiliateUserTotalEarnings?.amountInINEX
                            ? parseFloat(
                                staticsData?.affiliateUserTotalEarnings
                                  ?.amountInINEX
                              ).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : '0.00'}{' '}
                          <span className="font_17x">INEX</span>
                        </Typography>
                        <Typography
                          variant="text"
                          fontSize={'22px'}
                          fontWeight={400}
                          textAlign={'center'}
                          color={'#FFB300'}
                          sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            verticalAlign: 'bottom',
                            gap: 1,
                          }}
                        >
                          <img alt="up" src={arrow} />{' '}
                          {staticsData?.ordersCount ? '20%' : '0%'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <CommissionTable />
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading && userType === 'CaptainBee' ? (
            <></>
          ) : (
            <BeeDash2></BeeDash2>
          )}
        </>
      )}

      <div>
        <SubscriptionPaymentOptions
          isVisible={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          onConfirm={handleCreateSubscription}
          onZelleAndWireConfirm={(paymentMethod) =>
            createSubscriptionOrderForZelleAndWire(paymentMethod)
          } // For Zelle and Wire
          message={message1}
        />
      </div>
    </>
  );
};

export default CaptainDash;
