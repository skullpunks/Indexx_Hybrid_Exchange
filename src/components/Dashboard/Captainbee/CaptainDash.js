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
import { Box, MenuItem, Select, Typography, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { baseCEXURL, getCaptainBeeStatics, baseHiveURL, getCoinPriceByName, getAppSettings, oneUSDHelper, createINEXBuyOrder, formatReadableDate, createMonthlyINEXsubscription, decodeJWT, cancelMonthlyINEXsubscription } from '../../../services/api';
import BeeDash2 from '../Honeybee/MyBees/BeeDash2';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material'
import OpenNotification from '../../OpenNotification/OpenNotification';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CommissionTable from './CommissionTable';
import { Button } from 'antd';
let appSettingArr = [];
let priceData = {};

const CaptainDash = () => {

  const [isLoading, setIsLoading] = useState(true);
  // const [platform, setPlatform] = useState('Exchange');
  // const [Order, setOrder] = useState('buysell');
  // const [selectedDate, setSelectedDate] = useState('aug-sept');
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [rankPhoto, setRankPhoto] = useState();
  // const [platformCapt, setPlatformCapt] = useState('Exchange');
  // const [OrderCapt, setOrderCapt] = useState('buysell');
  // const [selectedDateCapt, setSelectedDateCapt] = useState('aug-sept');
  const [userType, setUserType] = useState("");
  // const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  // const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  // const xLabels = [
  //   'Page A',
  //   'Page B',
  //   'Page C',
  //   'Page D',
  //   'Page E',
  //   'Page F',
  //   'Page G',
  // ];

  // const uDataCapt = [4500, 2000, 2500, 2780, 5890, 2390, 3490];
  // const pDataCapt = [2400, 1398, 5800, 3908, 4100, 3800, 4300];
  // const xLabelsCapt = [
  //   'Page A',
  //   'Page B',
  //   'Page C',
  //   'Page D',
  //   'Page E',
  //   'Page F',
  //   'Page G',
  // ];

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  const [message, setMessage] = useState();
  const [staticsData, setStaticsData] = useState();
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    total: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });
  const [rateData, setRateData] = useState();
  const [adminFee, setAdminFees] = useState('');
  const [loadings, setLoadings] = useState(false);
  const [loadingsubs, setLoadingsubs] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [checkSubscription, setCheckSubscription] = useState(null);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement="top-start" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "var(--body_background)",
      backgroundColor: "var(--body_background)",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      border: "1px solid var(--border-color)",
      backgroundColor: "var(--body_background)",
      color: "var(--body_color)",
      minWidth:"90%",
      width: "215px",
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
      total, days, hours, minutes, seconds
    };
  }

  const getPricesData = async () => {
    const res = await getCoinPriceByName(String("INEX"));
    priceData = res.data.results.data;
    setRateData(priceData);

    let oneUsdValue = await oneUSDHelper(
      priceData,
      "INEX"
    );
    const finalPay =
      oneUsdValue * Number(300) * (1 - Number(adminFee) / 100);
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
      let access_token = String(localStorage.getItem("access_token"));
      let decoded = decodeJWT(access_token);
      let res = await createMonthlyINEXsubscription(decoded.email, "USD", "INEX", "300", "", "");
      if (res.status === 200) {
        console.log("res", res);
        for (let i = 0; i < res.data.links.length; i++) {
          OpenNotification('success', "Subscription success");
          if (res.data.links[i].rel.includes("approve")) {
            window.location.href = res.data.links[i].href;
          }
        }
      } else {
        console.log("res", res);
        OpenNotification('error', res.data);
      }
    } catch (err) {
      OpenNotification('error', "Something went wrong. Please try again after sometime.");
      console.log("err", err)
    } finally {
      setLoadingsubs(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      let access_token = String(localStorage.getItem("access_token"));
      let decoded = decodeJWT(access_token);
      let res = await cancelMonthlyINEXsubscription(decoded.email, subscription?.paypalSubscriptionDetails?.id, "Cancelling the subscription");
      console.log("Res", res);

    } catch (err) {
      console.log("err", err)
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userType = localStorage.getItem("userType") || undefined;
        const username = localStorage.getItem("username") || undefined;

        setUserType(userType);

        if (userType === "CaptainBee" && username) {
          const data = await getCaptainBeeStatics(username);
          setStaticsData(data.data);

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

          if (data?.data?.paypalSubscriptionDetails) {
            setSubscription(data?.data?.paypalSubscriptionDetails);
            const hasValidSubscription = data?.data?.paypalSubscriptionDetails && Object.keys(data?.data?.paypalSubscriptionDetails).length > 0;
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

  const createNewBuyOrder = async () => {
    setLoadings(true);
    let basecoin = "INEX";
    let quotecoin = "USD";
    let amount = 300;
    let outAmount = Math.floor(totalAmountToPay * 1000000) / 1000000;
    let res;
    res = await createINEXBuyOrder(basecoin, quotecoin, amount, outAmount);
    if (res.status === 200) {
      setLoadings(false);
      //--Below code is to enable paypal Order---
      for (let i = 0; i < res.data.links.length; i++) {
        if (res.data.links[i].rel.includes("approve")) {
          window.location.href = res.data.links[i].href;
        }
      }
      //getStripePaymentIntent(res.data.orderId, res.data.user.email);
    } else {
      setLoadings(false);
      setMessage(res.data);
    }
  };

  return (
    <>
      <SubHeader />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: "blur(8px)",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 995,
            pointerEvents: 'none',
          }}
        >
          <img src={loadingGif} alt="Loading" />
          <p style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            Please wait while Waggle Dance is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}

      {(!isLoading && userType === "CaptainBee") ?
        (<div style={{ paddingTop: `${isMobile ? "250px" : '220px'}` }}>
          <div className='font_20x fw-bold justify-content-center d-flex' style={{ marginLeft: `${isMobile ? "0" : "-570px"}` }}>
            <img src={theme === "dark" ? waggle_dark : waggle} alt="" width={"46px"} />&nbsp;&nbsp;&nbsp;
            Waggle Dance / My Dashboard
          </div>
          <div className="hive-container">
            <div
              className="d-flex justify-content-center"
              // style={{ width: '74%', maxWidth: '1140px' }}
              style={{ flexDirection: `${isMobile ? "column" : "row"}` }}
            >
              <div className="d-flex flex-direction-column mt-1" style={{ width: `${isMobile ? "100%" : "258px"}` }}>
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
                        src={(staticsData?.affiliateUserProfile?.photoIdFileurl !== undefined) ? staticsData?.affiliateUserProfile?.photoIdFileurl : dummy}
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
                <div className="font_20x fw-bold mt-4 mb-4 lh_32x d-flex" style={{ justifyContent: `${isMobile ? "center" : "start"}` }}>
                  Captain Bee {staticsData?.affiliateUserProfile?.accname}
                </div>
                {(powerPackPhoto !== undefined && powerPackPhoto !== "") ?
                  (<div className="justify-content-center d-flex">
                    <img src={powerPackPhoto} alt='pack' width={isMobile ? "45%" : "80%"} />
                  </div>) : (
                    <div className="justify-content-center d-flex flex-direction-column" style={{ marginLeft: `${isMobile ? "40px" : 0}` }}>
                      Please purchase the powerpack from the below URL: <br />
                      <a href={`${baseCEXURL}/indexx-exchange/power-pack`}>
                        Power Pack Purchase
                      </a>
                    </div>
                  )
                }
                <div className="align-items-start" style={{ marginLeft: `${isMobile ? "40px" : "0px"}` }}>
                  {(!subscription?.paypalSubscriptionDBData) ?
                    (<div className="d-flex flex-direction-column align-items-start mt-5">
                      <div className="font_15x">
                        Subscribe to your $300 monthly INEX investment today
                      </div>
                      <div className="d-flex align-items-start gap-2" style={{ width: "100%" }}>
                      <BootstrapTooltip title="Captain Bee Subscription Fees: 
Ensure your elite rank and commission earnings by subscribing monthly. Failure to pay on time leads to demotion, lowering your Captain Bee status and associated commissions. Stay at the top – don't forget to pay your dues!" 
                      sx={{width:"20%"}}
                      >
                        <Button
                          className="atn-btn atn-btn-round atn-btn-hover hive-btn mt-3"
                          style={{ width: "auto", height: "auto", color: "#393939", display:"flex", alignItems:"center", paddingBlock:"9.5px" }}

                        >
                          <img src={info} alt="info" />
                        </Button>
                      </BootstrapTooltip>
                        <Button
                          loading={loadings}
                          type="primary"
                          className="atn-btn atn-btn-round atn-btn-hover hive-btn mt-3"
                          onClick={handleCreateSubscription}
                          style={{ width: `${isMobile ? "70%" : "80%"}`, height: "auto", color: "#393939" }}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>)
                    :
                    (<div className="d-flex flex-direction-column align-items-start mt-5">
                      <div className="font_20x">
                        $300 INEX Subscription Details
                        <BootstrapTooltip title="Captain Bee Subscription Fees: 
Ensure your elite rank and commission earnings by subscribing monthly. Failure to pay on time leads to demotion, lowering your Captain Bee status and associated commissions. Stay at the top – don't forget to pay your dues!" 
                      sx={{width:"20%"}}
                      >
                          <InfoOutlinedIcon sx={{fontSize :"18px", color:"var(--body_color)", mb:0.5, ml:0.8}}/>
                      </BootstrapTooltip>
                      </div>
                      <div className="font_13x mt-3">
                        Subscription ID: {subscription?.paypalSubscriptionDetails?.id}
                      </div>
                      <div className="font_13x">
                        Status: {subscription?.paypalSubscriptionDetails?.status}
                      </div>
                      <div className="font_13x">
                        Next Billing Date: {formatReadableDate(subscription?.paypalSubscriptionDetails?.billing_info.next_billing_time)}
                      </div>
                      {/* <div>
                      <Button
                        type="danger"
                        className="atn-btn atn-btn-round atn-btn-hover mt-3"
                        onClick={handleCancelSubscription}

                      >
                        Cancel Subscription
                      </Button>
                    </div> */}
                    </div>)
                  }
                </div>

                <div className="align-items-start lh_32x" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>

                  {/* <div className="d-flex flex-direction-column align-items-start mt-4" style={{fontsixe:`${isMobile ? "12px": "17px"}`}}>
                  <div className="fw-bold">Bio :</div>
                  {staticsData?.affiliateUserProfile?.PublicBio ? staticsData?.affiliateUserProfile?.PublicBio :
                    `My name is ${staticsData?.affiliateUserProfile?.accname} and I am the best captain bee to ever exist
                  in indexx hive`}
                </div> */}
                  <div className="font_13x d-flex align-items-center mt-4">
                    {theme === "dark" ?
                      <img alt="man" src={man_dark} className="me-1" />
                      :
                      <img alt="man" src={man} className="me-1" />
                    }
                    @{staticsData?.affiliateUserProfile?.Username}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={pin_dark} className="me-2" />
                      :
                      <img alt="man" src={pin} className="me-2" />
                    }
                    {staticsData?.affiliateUserProfile?.country}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={house_dark} className="me-1" />
                      :
                      <img alt="man" src={house} className="me-1" />
                    }
                    {staticsData?.affiliateUserProfile?.city}
                  </div>
                  <div className="font_13x d-flex align-items-center">
                    {theme === "dark" ?
                      <img alt="man" src={clock_dark} className="me-1" />
                      :
                      <img alt="man" src={clock} className="me-1" />
                    }
                    {staticsData?.formatedAccountCreationDate}
                  </div>
                  {staticsData?.affiliateUserProfile?.isPhonePublic &&
                    <div className="font_13x d-flex align-items-center">
                      {theme === 'dark' ? (
                        <img alt="man" src={phone_dark} className="me-2" />
                      ) : (
                        <img alt="man" src={phone} className="me-2" />
                      )}
                      {String(`(${staticsData?.affiliateUserProfile?.Phone.slice(0, 3)}) ${staticsData?.affiliateUserProfile?.Phone.slice(3, 6)}-${staticsData?.affiliateUserProfile?.Phone.slice(6)}`)}
                    </div>
                  }
                  {staticsData?.affiliateUserProfile?.isEmailPublic &&
                    <div className="font_13x d-flex align-items-center">
                      {theme === 'dark' ? (
                        <img alt="man" src={email_dark} className="me-2" />
                      ) : (
                        <img alt="man" src={email} className="me-2" />
                      )}
                      {staticsData?.affiliateUserProfile?.Email}
                    </div>
                  }
                </div>

                <div className="align-items-start lh_32x mt-4" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
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
                      <img alt="man" src={twitter_dark} />
                      :
                      <img alt="Twitter" src={twitter} />
                    }
                  </a>

                </div>

                <div className="d-flex flex-direction-column align-items-start mt-5" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
                  <div>
                    <span className='fw-bold'>
                      Invite Honey Bee :
                    </span>
                    <br />
                    {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() => copyClick(baseCEXURL +
                        "/indexx-exchange/buy-sell/get-started-honeybee?referral=" +
                        staticsData?.userFullData?.referralCode)}
                      style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
                    />
                  </div>
                  <br />
                  <div>
                    <span className='fw-bold'>
                      Invite Captain Bee :
                    </span>
                    <br />
                    {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() => copyClick(baseHiveURL +
                        "/sign-up?referral=" +
                        staticsData?.userFullData?.referralCode)}
                      style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
                    />
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
                {/* 
                {timeRemaining?.days &&
                <div className="d-flex flex-direction-column align-items-start mt-5" style={{ marginLeft: `${isMobile ? "65px" : "0px"}` }}>
                  <div className="font_13x ">
                    Next Monthly INEX Order Deadline
                  </div>
                  <div className="font_20x mt-3">
                    {staticsData?.nextPurchaseDate}
                  </div>
                </div>
                } */}
                {/* <div className="font_20x mt-3">
                    {timeRemaining?.days > 0 ? "Time Remaining:" : ""}
                    <br />
                    {timeRemaining?.days > 0 && `${timeRemaining.days} days `}
                    {timeRemaining?.days > 0 ? `${timeRemaining?.hours} h` `${timeRemaining.minutes} m` `${timeRemaining.seconds} s` : ""}
                  </div> */}
                {/* {timeRemaining?.days < 15 && (
                    <div>
                      <Button
                        type="primary"
                        className="atn-btn atn-btn-round atn-btn-hover"
                        block
                        onClick={() => createNewBuyOrder()}
                        loading={loadings}
                      >
                        Buy 300 INEX now
                      </Button>
                    </div>
                  )} */}
                {/* </div> */}


              </div>
              <div className="side-container" style={{ marginTop: `${isMobile ? "65px" : "0px"}` }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2
                  }}
                >

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: `${isMobile ? "column" : "row"}`,
                      gap: isMobile ? 4 : 2,
                      mt: 2
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: `${isMobile ? "100%" : "50%"}`,
                      }}
                    >
                      <Typography
                        variant="text"
                        component="p"
                        fontSize={'15px'}
                        fontWeight={700}
                        textAlign={'left'}
                        mx={"auto"}
                        mb={2}
                        sx={{
                          color: "#393939",
                        }}

                      >
                        My Honey Bee Statistics
                      </Typography>
                      {/* <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            width: '31%',
                            background: 'var(--body_background)',
                            pl: 1,
                            pt: 0.4,
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            Platforms
                          </Typography>
                          <Select
                            value={platform}
                            onChange={(e) => {
                              setPlatform(e.target.value);
                            }}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              background: 'var(--body_background)',
                              color: "var(--body_color)",
                              border: 'none',
                              outline: 'none',
                              padding: 0,
                              fontSize: '12px',
                            }}
                            size="small"
                            disableUnderline
                          >
                            <MenuItem key="Exchange" value="Exchange">
                              Indexx Exchange
                            </MenuItem>
                          </Select>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            width: '29%',
                            background: 'var(--body_background)',
                            pl: 1,
                            pt: 0.4,
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            Type of Order
                          </Typography>
                          <Select
                            value={Order}
                            onChange={(e) => {
                              setOrder(e.target.value);
                            }}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              background: 'var(--body_background)',
                              color: "var(--body_color)",
                              border: 'none',
                              outline: 'none',
                              padding: 0,
                              fontSize: '12px',
                            }}
                            size="small"
                            disableUnderline
                          >
                            <MenuItem key="buysell" value="buysell">
                              Buy & Sell
                            </MenuItem>
                            <MenuItem key="Convert" value="Convert">
                              Convert
                            </MenuItem>
                          </Select>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            width: '40%',
                            background: 'var(--body_background)',
                            pl: 1,
                            pt: 0.4,
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            Date Range
                          </Typography>

                          <Select
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                            }}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              background: 'var(--body_background)',
                              color: "var(--body_color)",
                              border: 'none',
                              outline: 'none',
                              padding: 0,
                              fontSize: '12px',
                            }}
                            size="small"
                            disableUnderline
                          >
                            <MenuItem key="aug-sept" value="aug-sept">
                              August-September
                            </MenuItem>
                          </Select>
                        </Box>
                      </Box> */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: '50%',
                            background: 'var(--body_background)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: isMobile ? 1 : 2,
                            py: 1,
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '10px' : '12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Honey Bees
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
                            <img alt="up" src={arrow} /> {staticsData?.honeyBeesCount ? "30%" : "0%"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: '50%',
                            background: 'var(--body_background)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: isMobile ? 1 : 2,
                            py: 1,
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '10px' : '12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Commision Earned in USD
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '25px' : '40px'}
                            // fontWeight={600}
                            textAlign={'left'}
                          >
                            ${(staticsData?.affiliateHoneyBeeUserTotalEarnings?.amountInUSD
                              ? parseFloat(staticsData?.affiliateHoneyBeeUserTotalEarnings?.amountInUSD).toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : '0.00')
                            }
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '10px' : '12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Commision Earned in INEX
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '25px' : '40px'}
                            // fontWeight={600}
                            textAlign={'left'}
                          >
                        
                            {(staticsData?.affiliateHoneyBeeUserTotalEarnings?.amountInINEX
                              ? parseFloat(staticsData?.affiliateHoneyBeeUserTotalEarnings?.amountInINEX).toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : '0.00')}
                            <span className='font_17x'>
                              INEX
                            </span>
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
                            <img alt="up" src={arrow} />  {staticsData?.ordersCount ? "15%" : "0%"}
                          </Typography>
                        </Box>
                      </Box>
                      {/* <Box
                      sx={{
                        background: 'var(--body_background)',
                        width: "100%",
                      }}
                    >
                      <LineChart
                        width={572}
                        height={429}
                        series={[
                          { data: pData, label: 'pv' },
                          { data: uData, label: 'uv' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                      />
                    </Box> */}
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: `${isMobile ? "100%" : "50%"}`,
                      }}
                    >
                      <Typography
                        variant="text"
                        component="p"
                        fontSize={'15px'}
                        fontWeight={700}
                        textAlign={'left'}
                        mx={"auto"}
                        mb={2}
                        sx={{
                          color: "#393939",
                        }}

                      >
                        My Captain Bee Statistics
                      </Typography>
                      {/* <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            width: '31%',
                            background: 'var(--body_background)',
                            pl: 1,
                            pt: 0.4,
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            Platforms
                          </Typography>
                          <Select
                            value={platformCapt}
                            onChange={(e) => {
                              setPlatformCapt(e.target.value);
                            }}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              background: 'var(--body_background)',
                              color: "var(--body_color)",
                              border: 'none',
                              outline: 'none',
                              padding: 0,
                              fontSize: '12px',
                            }}
                            size="small"
                            disableUnderline
                          >
                            <MenuItem key="Exchange" value="Exchange">
                              Indexx Exchange
                            </MenuItem>
                          </Select>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            width: '29%',
                            background: 'var(--body_background)',
                            pl: 1,
                            pt: 0.4,
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            Type of Order
                          </Typography>
                          <Select
                            value={OrderCapt}
                            onChange={(e) => {
                              setOrderCapt(e.target.value);
                            }}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              background: 'var(--body_background)',
                              color: "var(--body_color)",
                              border: 'none',
                              outline: 'none',
                              padding: 0,
                              fontSize: '12px',
                            }}
                            size="small"
                            disableUnderline
                          >
                            <MenuItem key="buysell" value="buysell">
                              Buy & Sell
                            </MenuItem>
                            <MenuItem key="Convert" value="Convert">
                              Convert
                            </MenuItem>
                          </Select>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            width: '40%',
                            background: 'var(--body_background)',
                            pl: 1,
                            pt: 0.4,
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            Date Range
                          </Typography>

                          <Select
                            value={selectedDateCapt}
                            onChange={(e) => {
                              setSelectedDateCapt(e.target.value);
                            }}
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                              width: '100%',
                              borderRadius: 0,
                              background: 'var(--body_background)',
                              color: "var(--body_color)",
                              border: 'none',
                              outline: 'none',
                              padding: 0,
                              fontSize: '12px',
                            }}
                            size="small"
                            disableUnderline
                          >
                            <MenuItem key="aug-sept" value="aug-sept">
                              August-September
                            </MenuItem>
                          </Select>
                        </Box>
                      </Box> */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: '50%',
                            background: 'var(--body_background)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: isMobile ? 1 : 2,
                            py: 1,
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '10px' : '12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Team Captain Bees
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '25px' : '70px'}
                            // fontWeight={600}
                            textAlign={'left'}
                          >
                            {staticsData?.captainsCount}
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
                            <img alt="up" src={arrow} /> {staticsData?.captainsCount ? "30%" : "0%"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: '50%',
                            background: 'var(--body_background)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: isMobile ? 1 : 2,
                            py: 1,
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '10px' : '12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Commision Earned in USD
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '25px' : '40px'}
                            // fontWeight={600}
                            textAlign={'left'}
                          >
                            ${(staticsData?.affiliateUserTotalEarnings?.amountInUSD
                              ? parseFloat(staticsData?.affiliateUserTotalEarnings?.amountInUSD).toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : '0.00')
                            }
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '10px' : '12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Commision Earned in INEX
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={isMobile ? '25px' : '40px'}
                            // fontWeight={600}
                            textAlign={'left'}
                          >
                            {(staticsData?.affiliateUserTotalEarnings?.amountInINEX
                              ? parseFloat(staticsData?.affiliateUserTotalEarnings?.amountInINEX).toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : '0.00')
                            } {" "}
                            <span className='font_17x'>
                              INEX
                            </span>
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
                            <img alt="up" src={arrow} />  {staticsData?.ordersCount ? "20%" : "0%"}
                          </Typography>
                        </Box>
                      </Box>
                      {/* <Box
                      sx={{
                        background: 'var(--body_background)',
                        width: "100%",
                      }}
                    >
                      <LineChart
                        width={572}
                        height={429}
                        series={[
                          { data: pDataCapt, label: 'pv' },
                          { data: uDataCapt, label: 'uv' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabelsCapt }]}
                      />
                    </Box> */}
                    </Box>
                  </Box>

                  <Box>
                    <CommissionTable />
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </div>) :
        <>
          {(isLoading && userType === "CaptainBee") ? <></> : <BeeDash2></BeeDash2>}
        </>
      }
    </>
  );
};

export default CaptainDash;