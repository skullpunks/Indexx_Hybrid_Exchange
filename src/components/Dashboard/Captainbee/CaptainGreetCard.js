import React, { useState, useEffect, useRef } from 'react';
import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../assets/hive-dashboard/sidebar/location.png';
import man from '../../../assets/hive-dashboard/sidebar/man.png';
import house from '../../../assets/hive-dashboard/sidebar/home.png';
import clock from '../../../assets/hive-dashboard/sidebar/clock.png';
import email from '../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone from '../../../assets/hive-dashboard/sidebar/phone icon 1.svg';

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
import Slider from 'react-slick';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import SubHeader from './SubHeader/SubHeader';
import './CaptainDash.css';
import { Box, MenuItem, Select, Typography, Rating, TextField, IconButton, Button } from '@mui/material';
import { baseCEXURL, getCaptainBeeStatics, baseHiveURL, getCoinPriceByName, getAppSettings, oneUSDHelper, createINEXBuyOrder, formatReadableDate, createMonthlyINEXsubscription, decodeJWT, cancelMonthlyINEXsubscription, shareGreetingCard, checkEmail } from '../../../services/api';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material'
import OpenNotification from '../../OpenNotification/OpenNotification';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { Button } from 'antd';
import { GreetData } from '../GreetData';
import GreetLandscape from '../../BuySell/Notification/GreetLandscape';
import GreetPortrait from '../../BuySell/Notification/GreetPortrait';
let appSettingArr = [];
let priceData = {};

const CaptainGreetCard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [rankPhoto, setRankPhoto] = useState();
  const [userType, setUserType] = useState("");

  const [amount, setAmount] = useState('30-inex');
  const [codeAmount, setCodeAmount] = useState(0);
  const [inviteType, setInviteType] = useState('captainbee');
  const [greetWords, setGreetWords] = useState('[ADD GREETING WORDS HERE]');
  const [recName, setRecName] = useState('Friend');
  const [emailid, setEmailid] = useState();
  const [images, setImages] = useState(GreetData);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // State to track the current slide index
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPort, setIsModalOpenPort] = useState(false);

  // useEffect(() => {
  //   if (amount === '30-inex') {
  //     const filtered = GreetData.filter((item) => item.type === '30-inex');
  //     setImages(filtered);
  //   }
  //   else if (amount === '50-inex') {
  //     const filtered = GreetData.filter((item) => item.type === '50-inex');
  //     setImages(filtered);
  //   }
  // }, [amount])





  const handleMessage = () => {
    if (images[currentSlideIndex]?.orient === "portrait") {
      setIsModalOpenPort(true);
    }
    else {
      setIsModalOpen(true);
    }

  }

  const liveSlideRef = useRef();

  const nextButtonLive = () => liveSlideRef.current.slickNext();
  const previousButtonLive = () => liveSlideRef.current.slickPrev();

  const CustomArrow = ({ onClick, icon }) => (
    <IconButton onClick={onClick} style={{ width: "fit-content", height: "fit-content", padding: 0, color:"var(--body_color)" }}>
      {icon}
    </IconButton>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow onClick={previousButtonLive} icon={<NavigateBeforeIcon />} />,
    nextArrow: <CustomArrow onClick={nextButtonLive} icon={<NavigateNextIcon />} />,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlideIndex(newIndex); // Update the current slide index
    },
  };


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
  const [greetingCards, setGreetingCards] = useState([]);
  const [selectedGreetingCard, setSelectedGreetingCards] = useState();

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

  useEffect(() => {
    // Find the selected greeting card based on its code
    const selectedCard = greetingCards.find(card => card.code === amount);
    setSelectedGreetingCards(selectedCard);
    setCodeAmount(selectedCard?.numberOfTokens || 0)
    if (selectedCard) {
      // Determine the card type ('30-inex' or '50-inex') based on numberOfTokens
      const cardType = selectedCard.numberOfTokens === 30 ? '30-inex' : '50-inex';

      // Filter the GreetData based on the determined card type
      const filtered = GreetData.filter(item => item.type === cardType);
      setImages(filtered);
      console.log(currentSlideIndex)
    }
  }, [amount, greetingCards]);

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
          console.log(data.data);
          setStaticsData(data.data);
          setGreetingCards(data.data.affiliateUserProfile.greetingCards)
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

  const handleSubmit = async () => {
    setLoadings(true);

    //first check the email which is new
    const res = await checkEmail(String(emailid).toLowerCase());
    console.log(res);
    if (res.status === 200 && !res.success) {
      OpenNotification('error', `${emailid} is already existing indexx user. Please send Greeting Cards to invite to new users.`);
      setLoadings(false);
      return;
    }
    else {
      setLoadings(true);
      let access_token = String(localStorage.getItem("access_token"));
      let decoded = decodeJWT(access_token);
      let res;
      let greetingCardUrl = images[currentSlideIndex].imageUrl;
      console.log(greetingCardUrl)
      console.log(selectedGreetingCard)
      console.log(decoded?.email, recName, emailid, greetWords, inviteType, selectedGreetingCard?.code, greetingCardUrl);
      setLoadings(false);
      res = await shareGreetingCard(decoded?.email, recName, emailid, greetWords, inviteType, selectedGreetingCard?.code, greetingCardUrl);
      if (res.status === 200) {
        OpenNotification('success', `Greeting Cards to invite successfully sent to ${emailid}.`);
      } else {
        setLoadings(false);
        setMessage(res.data);
        OpenNotification('error', `Something went wrong. Please try again after sometime.`);
      }
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
            Please wait while Greeting Card is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}

      <div style={{ paddingTop: `${isMobile ? "250px" : '180px'}` }}>
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
                    <div style={{ width: "100%" }}>
                      <Button
                        loading={loadings}
                        type="primary"
                        className="atn-btn atn-btn-round atn-btn-hover hive-btn mt-3"
                        onClick={handleCreateSubscription}
                        style={{ width: "100%", height: "auto", color: "#393939" }}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>)
                  :
                  (<div className="d-flex flex-direction-column align-items-start mt-5">
                    <div className="font_20x">
                      $300 INEX Subscription Details
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
            <div className="greet-container" style={{ marginTop: `${isMobile ? "65px" : "0px"}` }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mt: 2
                }}
              >

                <Box>
                  <Typography
                        variant="text"
                        component="p"
                        fontSize={'40px'}
                        fontWeight={'bold'}
                        textAlign={'left'}
                        mb={2}
                      >
                        Send Greeting Cards to invite
                        <br /> friends and family to the Hive!
                      </Typography>
                      <Typography
                        variant="text"
                        component="p"
                        fontSize={'13px'}
                        textAlign={'left'}
                        mb={2}
                      >
                      Each Captain Bee gets 10 Greeting Cards to Share with people to invite them to their colony as honeybees or captainbees
                      </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: `${isMobile ? "column" : "row"}`,
                      gap: isMobile ? 4 : 2,
                      mt: 3
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:"center",
                        width: `${isMobile ? "100%" : "45%"}`,
                      }}
                    >
                      <Slider 
                      ref={liveSlideRef}
                      {...sliderSettings} style={{ maxWidth: "100%", display: "flex", alignItems: "center", height: "fit-content" }}>

                      {images?.map((token, index) => (
                        <div key={index} className='greet-slide-div'>
                          <img src={token.photo} alt="" className="greet-slide-img"/>
                        </div>
                      ))}

                    </Slider>
                    <Button
                      type="text"
                      className="atn-btn atn-btn-round link-btn"
                      onClick={() => handleMessage()}
                    >
                      See message
                    </Button>
                  </Box>


                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      width: `${isMobile ? "100%" : "55%"}`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // gap: 1,
                      }}
                    >
                      {/* <Box
                        sx={{
                          display: 'flex',
                          // flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          width: '100%',
                          background: 'var(--main-body)',
                          p: 1
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={'20px'}
                          textAlign={'left'}
                          width={'50%'}
                        >
                          Select INEX Amount
                        </Typography>
                        <Select
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value);
                          }}
                          variant="standard"
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            width: '60%',
                            borderRadius: 0,
                            background: 'var(--main-body)',
                            color: "var(--body_color)",
                            border: 'none',
                            outline: 'none',
                            padding: 0,
                            fontSize: '20px',
                          }}
                          size="small"
                          disableUnderline
                        >
                          <MenuItem key="50-inex" value="50-inex">
                            50 INEX Greeting Card X2pcs
                          </MenuItem>
                          <MenuItem key="30-inex" value="30-inex">
                            30 INEX Greeting Card X8pcs
                          </MenuItem>
                        </Select>
                      </Box> */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          width: '100%',
                          background: 'var(--main-body)',
                          p: 1,
                          gap:1
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={'20px'}
                          textAlign={'left'}
                          width={'50%'}
                        >
                          Select INEX Amount
                        </Typography>
                        <Select
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value);
                          }}
                          variant="standard"
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            width: '60%',
                            borderRadius: 0,
                            background: 'var(--main-body)',
                            color: "var(--body_color)",
                            border: 'none',
                            outline: 'none',
                            padding: 0,
                            fontSize: '20px',
                          }}
                          size="small"
                          disableUnderline
                        >
                          {greetingCards?.map((card) => (
                            <MenuItem
                              key={card._id}
                              value={card.code}
                              disabled={card.isUsed}
                            >
                              {`${card.title} (${card.code})${card.isUsed ? ` - Used by ${card.receiverEmail}` : ''}`}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          width: '100%',
                          background: 'var(--main-body)',
                          p: 1,
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={'20px'}
                          textAlign={'left'}
                          width={'47%'}
                        >
                          Invite Type
                        </Typography>
                        <Select
                          value={inviteType}
                          onChange={(e) => {
                            setInviteType(e.target.value);
                          }}
                          variant="standard"
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            width: '70%',
                            borderRadius: 0,
                            background: 'var(--main-body)',
                            color: "var(--body_color)",
                            border: 'none',
                            outline: 'none',
                            padding: 0,
                            fontSize: '20px',
                            textAlign:"right"
                          }}
                          size="small"
                          disableUnderline
                        >
                          <MenuItem key="captainbee" value="captainbee">
                            Captain Bee
                          </MenuItem>
                          <MenuItem key="honeybee" value="honeybee">
                            Honey Bee
                          </MenuItem>
                        </Select>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          width: '100%',
                          background: 'var(--main-body)',
                          p: 1,
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '12px' : '13px'}
                          fontWeight={400}
                          width={'35%'}
                          textAlign={'left'}
                        >
                          Greeting Words
                        </Typography>
                        <TextField
                          type="email"
                          InputLabelProps={{ shrink: true, readOnly: true, }}
                          variant="outlined"
                          sx={{ width: '74%' }}
                          size="small" // Make the input box smaller
                          value={greetWords}
                          onChange={(e) => {
                            setGreetWords(e.target.value);
                          }}
                          InputProps={{
                            style: { fontSize: '13px', borderRadius: 0 }
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          width: '100%',
                          background: 'var(--main-body)',
                          p: 1,
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '12px' : '13px'}
                          fontWeight={400}
                          width={'35%'}
                          textAlign={'left'}
                        >
                          Receiver’s Name
                        </Typography>
                        <TextField
                          type="email"
                          InputLabelProps={{ shrink: true, readOnly: true, }}
                          variant="outlined"
                          sx={{ width: '74%' }}
                          size="small" // Make the input box smaller
                          value={recName}
                          onChange={(e) => {
                            setRecName(e.target.value);
                          }}
                          InputProps={{
                            style: { fontSize: '13px', borderRadius: 0 } // Set the desired font size
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          width: '100%',
                          background: 'var(--main-body)',
                          p: 1,
                        }}
                      >
                        <Typography
                          variant="text"
                          fontSize={isMobile ? '12px' : '13px'}
                          fontWeight={400}
                          width={'35%'}
                          textAlign={'left'}
                        >
                          Email Address
                        </Typography>
                        <TextField
                          // placeholder="abc@xyz.com"
                          type="email"
                          InputLabelProps={{ shrink: true, readOnly: true, }}
                          variant="outlined"
                          sx={{ width: '74%' }}
                          size="small" // Make the input box smaller
                          value={emailid}
                          onChange={(e) => {
                            setEmailid(e.target.value);
                          }}
                          InputProps={{
                            style: { fontSize: '13px', borderRadius: 0 } // Set the desired font size
                          }}
                        />
                      </Box>
                      <Box px={1}>
                        <Button
                          type="primary"
                          disabled={loadings}
                          className="atn-btn atn-btn-round atn-btn-hover hive-btn mt-3"
                          style={{ width: "100%", height: "37px", color: "#393939", fontSize: "13px" }}
                          onClick={handleSubmit}
                        >
                          {loadings ? "Loading..." : "Submit"}
                        </Button>
                      </Box>

                    </Box>
                  </Box>
                </Box>

                  <Box>
                  <Typography component="div" fontSize={'20px'} lineHeight={'30px'} fontWeight={'bold'} mt={5} mb={3}>
                  Email Template:
                  </Typography>

                  <Typography component="div" fontSize={'20px'} lineHeight={'30px'} overflow={"auto"}>

                    <span className='fw-bold'>
                      Subject: 🎄Holiday Cheers from Captain Bee! 🐝🎁
                    </span>

                    <br />
                    Dear {recName},
                    <br />
                    <br />
                    {greetWords}
                    <br />
                    <br />
                    Wishing you joy this season! 🎅🎉 Join our hive and enjoy an exclusive festive bonus:
                    <br />
                    <br />
            🌟 Register with {" "}
            {inviteType === 'captainbee' ?
                          <a href={`${baseHiveURL}/sign-up?referral=${staticsData?.userFullData?.referralCode}`} className='hive_link'>
                          referral link
                          </a>
                          :
                          <a href={`${baseCEXURL}/indexx-exchange/buy-sell/get-started-honeybee?referral=${staticsData?.userFullData?.referralCode}`} className='hive_link'>
                          referral link
                          </a>
                        }{" "}
                        <br />
                    
                        💰 Instant bonus in your wallet of {codeAmount} INEX 
                        <br />
                        <br />
                    🎊 How to Claim:
                    <br />
                    1. Click the {" "}
                        {inviteType === 'captainbee' ?
                          <a href={`${baseHiveURL}/sign-up?referral=${staticsData?.userFullData?.referralCode}`} className='hive_link'>
                          link
                          </a>
                          :
                          <a href={`${baseCEXURL}/indexx-exchange/buy-sell/get-started-honeybee?referral=${staticsData?.userFullData?.referralCode}`} className='hive_link'>
                          link
                          </a>
                        }
                        <br />
            2. Fill the form
            <br />
            3. Verify your email
            <br />
            <br />
                     
                        Enjoy your instant bonus!
                        <br />
            Dive into the hive as a Captain Bee or Honeybee for growth,
            connections, and perks. Here's to a sweet and successful festive
            season!
            <br />
            <br />
            Learn more about Indexx Hive here: {" "}
            <a href="https://hive.indexx.ai" className='hive_link'>
            https://hive.indexx.ai
            </a>
            <br />
            <br />
                    Best,
                    <br />

                    Captain Bee {staticsData?.affiliateUserProfile?.accname},
                    <br />
                    Indexx Hive

                  </Typography>

                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <div>
        <GreetLandscape
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          amount={codeAmount}
          type={inviteType}
          name={recName}
          captainName={staticsData?.affiliateUserProfile?.accname}
          refCode={staticsData?.userFullData?.referralCode}
        />
      </div>

      <div>
        <GreetPortrait
          isVisible={isModalOpenPort}
          onClose={() => setIsModalOpenPort(false)}
          amount={codeAmount}
          type={inviteType}
          name={recName}
          captainName={staticsData?.affiliateUserProfile?.accname}
          refCode={staticsData?.userFullData?.referralCode}
        />
      </div>
    </>
  );
};

export default CaptainGreetCard;