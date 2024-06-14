import React, { useState, useEffect } from 'react';
import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../assets/hive-dashboard/sidebar/location.png';
import man from '../../../assets/hive-dashboard/sidebar/man.png';
import house from '../../../assets/hive-dashboard/sidebar/home.png';
import clock from '../../../assets/hive-dashboard/sidebar/clock.png';
import email from '../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone from '../../../assets/hive-dashboard/sidebar/phone icon 1.svg';

import edit from '../../../assets/hive-dashboard/sidebar/pen_01 2.png';
import bin from '../../../assets/hive-dashboard/sidebar/trash_bin 3.png';

import edit_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/pen_01 3.png';
import bin_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/trash_bin 3.png';

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

import arrow from '../../../assets/hive-dashboard/Arrow 1.svg';
import { PackData } from '../../PowerPack/PackData';
import SubHeader from './SubHeader/SubHeader';
import './CaptainDash.css';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Stack,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  baseCEXURL,
  baseHiveURL,
  getCaptainBeeStatics,
  postPublicMessage,
  getPublicMessages,
} from '../../../services/api';
import OpenNotification from '../../OpenNotification/OpenNotification';
import { RankData } from '../RankData';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import loadingGif from '../../../assets/beeloade.gif';
import { StyledMenu } from './StyledMenu/StyledMenu';
import EditPost from '../../BuySell/Notification/EditPost';
import DeletePost from '../../BuySell/Notification/DeletePost';

const HoneyComb = () => {
  const [text, settext] = useState();
  const [userType, setUserType] = useState('');
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [rankPhoto, setRankPhoto] = useState();
  const [allTexts, setAllTexts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  );

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

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

  const [staticsData, setStaticsData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msgData, setMsgData] = useState();
  console.log(msgData, 'msgData in hc');
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  useEffect(() => {
    async function fetchAllText() {
      const email =
        localStorage.getItem('user') !== undefined
          ? String(localStorage.getItem('user'))
          : undefined;
      const getMessage = await getPublicMessages(email);
      console.log(
        'getMessage',
        getMessage?.data,
        getMessage?.data?.filter((x) => x.createdUserEmail === String(email))
      );
      const filteredData = getMessage?.data?.filter(
        (x) => x.createdUserEmail === String(email)
      );
      const sortedData = filteredData?.sort((a, b) => {
        return new Date(b.createdData) - new Date(a.createdData);
      });
      setAllTexts(sortedData);
    }
    fetchAllText();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userType =
          localStorage.getItem('userType') !== undefined
            ? String(localStorage.getItem('userType'))
            : undefined;
        const username =
          localStorage.getItem('username') !== undefined
            ? String(localStorage.getItem('username'))
            : undefined;

        setUserType(userType);
        if (userType === 'CaptainBee') {
          if (username) {
            const data = await getCaptainBeeStatics(username);

            setStaticsData(data.data);
            console.log(data?.data?.powerPackData?.type);
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

  const handleMenuItemClick = (clickedMessage, event) => {
    setMsgData(clickedMessage);
    setIsModalOpen(true);
    console.log(clickedMessage, 'onclick');
    handleCloseSortMenu();
  };

  const handleSubmitPostMessage = async () => {
    const email =
      localStorage.getItem('user') !== undefined
        ? String(localStorage.getItem('user'))
        : undefined;
    console.log('text', text);
    console.log('email', email);
    const postMessage = await postPublicMessage(email, text);
    console.log('postmessage', postMessage);
    const getMessage = await getPublicMessages(email);
    console.log('getMessage', getMessage?.data);
    setAllTexts(
      getMessage?.data?.filter((x) => x.createdUserEmail === String(email))
    );
    //if(postMessage)
  };

  const copyClick = (code) => {
    navigator.clipboard.writeText(code);
    OpenNotification('success', 'Copied Successfully!');
  };

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const [sortAnchorEl, setSortAnchorEl] = useState(null);

  const openSortMenu = Boolean(sortAnchorEl);

  const handleOpenSortMenu = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setSortAnchorEl(null);
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
            Please wait while Honeycomb is loading
            <span className="dots-animation"></span>
          </p>
        </div>
      )}
      <div style={{ paddingTop: `${isMobile ? '250px' : '220px'}` }}>
        <div
          className="fw-bold justify-content-center d-flex"
          style={{ fontSize: `${isMobile ? '18px' : '32px'}` }}
        >
          Captain Bee {staticsData?.affiliateUserProfile?.accname} Public
          Profile
        </div>
        <div className="hive-container">
          <div
            className="d-flex justify-content-between"
            style={{
              width: `${isMobile ? '90%' : '70%'}`,
              maxWidth: '1200px',
              flexDirection: `${isMobile ? 'column' : 'row'}`,
            }}
          >
            <div
              className="d-flex flex-direction-column mt-1"
              style={{ width: `${isMobile ? '100%' : '30%'}` }}
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
                Captain Bee {staticsData?.affiliateUserProfile?.accname}
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
                <div
                  className="justify-content-center d-flex flex-direction-column"
                  style={{ marginLeft: `${isMobile ? '40px' : 0}` }}
                >
                  Please purchase the powerpack from the below URL: <br />
                  <a href={`${baseCEXURL}/indexx-exchange/power-pack`}>
                    Power Pack Purchase
                  </a>
                </div>
              )}
              <div
                className="align-items-start lh_32x"
                style={{ marginLeft: `${isMobile ? '40px' : '0px'}` }}
              >
                <div
                  className="d-flex flex-direction-column align-items-start mt-4"
                  style={{ fontsixe: `${isMobile ? '12px' : '17px'}` }}
                >
                  <div className="fw-bold">Bio :</div>
                  {staticsData?.affiliateUserProfile?.PublicBio
                    ? staticsData?.affiliateUserProfile?.PublicBio
                    : `My name is ${staticsData?.affiliateUserProfile?.accname} and I am the best captain bee to ever exist
                  in indexx hive`}
                </div>

                <div className="font_13x d-flex align-items-center mt-5">
                  {theme === 'dark' ? (
                    <img alt="man" src={man_dark} className="me-1" />
                  ) : (
                    <img alt="man" src={man} className="me-1" />
                  )}
                  @{staticsData?.affiliateUserProfile?.Username}
                </div>
                <div className="font_13x d-flex align-items-center">
                  {theme === 'dark' ? (
                    <img alt="man" src={pin_dark} className="me-2" />
                  ) : (
                    <img alt="man" src={pin} className="me-2" />
                  )}
                  {staticsData?.affiliateUserProfile?.country}
                </div>
                <div className="font_13x d-flex align-items-center">
                  {theme === 'dark' ? (
                    <img alt="man" src={house_dark} className="me-1" />
                  ) : (
                    <img alt="man" src={house} className="me-1" />
                  )}
                  {staticsData?.affiliateUserProfile?.city}
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
                    {String(
                      `(${staticsData?.affiliateUserProfile?.Phone.slice(
                        0,
                        3
                      )}) ${staticsData?.affiliateUserProfile?.Phone.slice(
                        3,
                        6
                      )}-${staticsData?.affiliateUserProfile?.Phone.slice(6)}`
                    )}
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

              <div
                className="align-items-start lh_32x mt-5"
                style={{ marginLeft: `${isMobile ? '40px' : '0px'}` }}
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
              <div
                className="d-flex flex-direction-column align-items-start mt-5"
                style={{ marginLeft: `${isMobile ? '40px' : '0px'}` }}
              >
                <div>
                  <span className="fw-bold">Invite Honey Bee :</span>
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
                  <span className="fw-bold">Invite Captain Bee :</span>
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
              <div
                className="d-flex  flex-direction-column align-items-start mt-5"
                style={{ marginLeft: `${isMobile ? '40px' : '0px'}` }}
              >
                <div className="font_13x ">Your Rating</div>
                <div className="mt-4">
                  <Rating name="read-only" value={4} readOnly size="large" />
                </div>
                <div className="font_40x mt-3">95%</div>
              </div>
            </div>
            <div className="honeycomb-container">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: '100%',
                }}
              >
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
                      px: 2,
                      py: 1,
                      aspectRatio: 2,
                      border: '1px solid var(--border-color)',
                      borderRadius: '2px',
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={'12px'}
                      fontWeight={600}
                      textAlign={'left'}
                      // pr={"50%"}
                      alignSelf={'flex-start'}
                    >
                      Total Honey Bees
                    </Typography>
                    <Typography
                      variant="text"
                      fontSize={'77px'}
                      fontWeight={600}
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
                      width: '50%',
                      background: 'var(--body_background)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      aspectRatio: 2,
                      border: '1px solid var(--border-color)',
                      borderRadius: '2px',
                    }}
                  >
                    <Typography
                      variant="text"
                      fontSize={'12px'}
                      fontWeight={600}
                      textAlign={'left'}
                      // pr={"70%"}
                      alignSelf={'flex-start'}
                    >
                      Total Captain Bee's Colonys
                    </Typography>
                    <Typography
                      variant="text"
                      fontSize={'77px'}
                      fontWeight={600}
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
                      <img alt="up" src={arrow} /> {'20%'}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  className="post-input"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <TextField
                    id="outlined-multiline-static"
                    // label="Multiline"
                    placeholder="Share something with the Public and your Honeybees!"
                    multiline
                    rows={5}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={text}
                    onChange={(e) => {
                      settext(e.target.value);
                    }}
                    sx={{ width: '100%' }}
                  />

                  <Button
                    variant="contained"
                    onClick={handleSubmitPostMessage}
                    disableTouchRipple
                    sx={{
                      backgroundColor: '#FFB300',
                      borderRadius: '2px',
                      color: '#282828',
                      width: `${isMobile ? '100%' : '35%'}`,
                      px: 4,
                      py: 0.5,
                      textTransform: 'none',
                      fontSize: '13px',
                      fontWeight: 500,
                      boxShadow: 'none',
                      mt: 3,
                      alignSelf: `${isMobile ? 'center' : 'flex-end'}`,
                      '&:hover': {
                        backgroundColor: '#FFD000',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Post
                  </Button>
                </Box>

                {allTexts &&
                  allTexts?.map((message) => (
                    <Box
                      className="d-flex flex-direction-column"
                      key={message._id}
                      sx={{
                        // border: '1px solid var(--border-color)',
                        // borderRadius: "2px",
                        pr: 2,
                        pb: 2,
                      }}
                    >
                      <IconButton
                        onClick={handleOpenSortMenu}
                        variant="contained"
                        // fullWidth
                        style={{
                          width: 'min-content',
                          height: 'min-content',
                          alignSelf: 'flex-end',
                          padding: 0,
                          color: 'var(--body_color)',
                        }}
                      >
                        <MoreHorizIcon
                          style={{ fontSize: '20px', fill: 'var(body_color)' }}
                        />
                      </IconButton>
                      <StyledMenu
                        elevation={1}
                        PaperProps={{
                          style: {
                            borderRadius: '5px',
                            // backgroundColor: `${darkMode ? '#040404' : '#fbfbfb'}`,
                            backgroundColor: 'var(--body_background)',
                            boxShadow: 'none',
                            border: '1px solid var(--border-color)',
                          },
                        }}
                        anchorEl={sortAnchorEl}
                        open={openSortMenu}
                        onClose={handleCloseSortMenu}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <MenuItem
                          // onClick={() => handleMenuItemClick(message)}
                          onClick={handleMenuItemClick.bind(null, message)}
                          // onClick={() => {
                          //   console.log("message clicked", message);
                          //   setMsgData(message);
                          //   setIsModalOpen(true);
                          //   handleCloseSortMenu();
                          // }}
                          disableTouchRipple
                        >
                          <Stack direction="row" gap={1} alignItems="center">
                            <img
                              src={theme === 'dark' ? edit_dark : edit}
                              style={{
                                height: 25,
                                width: 25,
                                fill: 'var(--color-text)',
                              }}
                            />
                            <Typography variant="subtitle1" fontWeight={400}>
                              {'Edit Post'}
                            </Typography>
                          </Stack>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setIsModalOpenDelete(true);
                            handleCloseSortMenu();
                          }}
                          disableTouchRipple
                        >
                          <Stack direction="row" gap={1} alignItems="center">
                            <img
                              src={theme === 'dark' ? bin_dark : bin}
                              alt="bin"
                              style={{
                                height: 25,
                                width: 25,
                                fill: 'var(--color-text)',
                              }}
                            />
                            <Typography
                              ml={0.8}
                              variant="subtitle1"
                              fontWeight={400}
                            >
                              {'Delete'}
                            </Typography>
                          </Stack>
                        </MenuItem>
                      </StyledMenu>
                      <Box className="d-flex align-items-center">
                        <Box
                          style={{
                            width: '80px',
                            height: '80px',
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
                          <Box className="bee-hexagon">
                            <img
                              alt=""
                              src={
                                staticsData?.affiliateUserProfile
                                  ?.photoIdFileurl !== undefined
                                  ? staticsData?.affiliateUserProfile
                                      ?.photoIdFileurl
                                  : dummy
                              }
                              width={'63px'}
                              height={'66px'}
                              ml={'-6px'}
                              border={'none'}
                            />
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            backgroundColor: 'transparent',
                            border: 'none',
                            height: '50px',
                            marginLeft: '-35px',
                            pl: 4,
                            width: '50%',
                            transition: '0.3s ease-in-out',
                          }}
                        >
                          <div className="font_15x d-flex align-items-center">
                            Captain Bee{' '}
                            {staticsData?.affiliateUserProfile?.accname}
                          </div>
                          <div className="font_10x d-flex align-items-center">
                            {new Date(message.createdData).toLocaleString(
                              'en-US',
                              options
                            )}
                          </div>
                        </Box>
                        <br />
                        {/* {allTexts &&
                      <MessageList data={allTexts} />
                    } */}
                      </Box>
                      <Box sx={{ paddingLeft: '77px' }}>
                        {message.publicMessage}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div>
        <EditPost
          isVisible={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setMsgData();
          }}
          message={msgData}
          captainData={staticsData}
        />
      </div>
      <div>
        <DeletePost
          isVisible={isModalOpenDelete}
          onClose={() => setIsModalOpenDelete(false)}
        />
      </div>
    </>
  );
};

export default HoneyComb;

// const MessageList = ({ data }) => {
//   return (
//     <div>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'baseline',
//           backgroundColor: 'transparent',
//           border: '1px solid #e0e0e0',
//           borderRadius: '4px',
//           padding: '80px',
//           margin: '8px 0',
//         }}
//       >
//         {data?.map((message) => (
//           <><div key={message._id} className="font_15x d-flex align-items-center">
//             {message.publicMessage}
//           </div>
//           <div className="font_10x d-flex align-items-center" style={{ alignSelf: 'flex-end' }}>
//               {new Date(message.createdData).toLocaleString()}
//             </div></>
//         ))}
//       </Box>
//     </div>
//   );
// };
