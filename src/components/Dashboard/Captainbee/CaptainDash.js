import React, { useState, useEffect } from 'react';
import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';
import waggle from '../../../assets/hive-dashboard/waggle dance icon.svg';

import pin from '../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../assets/hive-dashboard/sidebar/clock 1.svg';
import email from '../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone from '../../../assets/hive-dashboard/sidebar/phone icon 1.svg';

import pin_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/pin.svg';
import man_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/man.svg';
import house_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/house.svg';
import clock_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/clock 1 1.svg';
import email_dark from '../../../assets/hive-dashboard/sidebar/email icon 1.svg';
import phone_dark from '../../../assets/hive-dashboard/sidebar/phone icon 1.svg';

import twitter from '../../../assets/hive-dashboard/sidebar/twitter logo- 1.svg';
import insta from '../../../assets/hive-dashboard/sidebar/insta icon 2.svg';
import linkedin from '../../../assets/hive-dashboard/sidebar/in icon.svg';
import discord from '../../../assets/hive-dashboard/sidebar/discord.svg';

import twitter_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/twitter logo.svg';
import insta_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/insta.svg';
import linkedin_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/LinkeIn.svg';
import discord_dark from '../../../assets/hive-dashboard/sidebar/dark-icons/discord.svg';


import arrow from '../../../assets/hive-dashboard/Arrow 1.svg';
// import bronze from "../../../assets/Rank Badges/1 bronze.svg";
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
import { baseCEXURL, getCaptainBeeStatics } from '../../../services/api';
import BeeDash2 from '../Honeybee/MyBees/BeeDash2';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenNotification from '../../OpenNotification/OpenNotification';
import CommissionTable from './CommissionTable';

const CaptainDash = () => {
  const [platform, setPlatform] = useState('Exchange');
  const [Order, setOrder] = useState('buysell');
  const [selectedDate, setSelectedDate] = useState('aug-sept');
  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [rankPhoto, setRankPhoto] = useState();
  const [platformCapt, setPlatformCapt] = useState('Exchange');
  const [OrderCapt, setOrderCapt] = useState('buysell');
  const [selectedDateCapt, setSelectedDateCapt] = useState('aug-sept');
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

  const [staticsData, setStaticsData] = useState();

  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;

    setUserType(userType);
    if (userType === "CaptainBee") {
      getCaptainBeeStatics(username).then((data) => {
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
      });
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


  const copyClick = (code) => {
    navigator.clipboard.writeText(code);
    OpenNotification('success', 'Copied Successfully!');
  };

  return (
    <>
      <SubHeader />
      {userType === "CaptainBee" ?
        (<div style={{ paddingTop: "220px" }}>
          <div className='font_20x fw-bold justify-content-center d-flex' style={{ marginLeft: "-570px" }}>
            <img src={waggle} alt="" width={"46px"} />&nbsp;&nbsp;&nbsp;
            Waggle Dance / My Dashboard
          </div>
          <div className="hive-container">
            <div
              className="d-flex justify-content-between"
            // style={{ width: '74%', maxWidth: '1140px' }}
            >
              <div className="d-flex flex-direction-column mt-1" style={{ width: "17%" }}>
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
                <div className="font_20x align-items-start fw-bold mt-4 mb-4 lh_32x">
                  Captain Bee {staticsData?.affiliateUserProfile?.accname}
                </div>
                {(powerPackPhoto !== undefined && powerPackPhoto !== "") ?
                  (<div className="justify-content-center d-flex">
                    <img src={powerPackPhoto} alt='pack' width={"80%"} />
                  </div>) : (
                    <div>
                      Please purchase the powerpack from the below URL: <br />
                      <a href={`${baseCEXURL}/indexx-exchange/power-pack`}>
                        Power Pack Purchase
                      </a>
                    </div>
                  )
                }
                <div className="align-items-start lh_32x">

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
                      <img alt="man" src={twitter_dark} />
                      :
                      <img alt="Twitter" src={twitter} />
                    }
                  </a>

                </div>

                <div className="d-flex flex-direction-column align-items-start lh_32x mt-5">
                  <div>
                    Invite Honey Bee : {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() => copyClick(staticsData?.userFullData?.referralCode)}
                      style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
                    />
                  </div>
                  <div>
                    Invite Captain Bee : {staticsData?.userFullData?.referralCode}
                    <ContentCopyIcon
                      fontSize="13px"
                      onClick={() => copyClick(staticsData?.userFullData?.referralCode)}
                      style={{ cursor: 'pointer', marginBottom: "4px", marginLeft: "5px" }}
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
              <div className="side-container">
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
                      flexDirection: 'row',
                      gap: 2,
                      mt: 2
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '50%',
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
                      <Box
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
                            {/* <MenuItem value="">Select Platform</MenuItem> */}
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

                          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={['year', 'month']}
                        label="Month/Year"
                        value={selectedDate}
                        onChange={handleDateChange}
                        inputFormat="MM/yy"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            margin="normal"
                          />
                        )}
                      />
                    </LocalizationProvider> */}
                        </Box>
                      </Box>
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
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
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
                            px: 2,
                            py: 1,
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Commision Earned in USD
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={'77px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            ${staticsData?.affiliateUserTotalEarnings?.amountInUSD? staticsData?.affiliateUserTotalEarnings?.amountInUSD : 0}
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
                        width: '50%',
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
                      <Box
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
                            {/* <MenuItem value="">Select Platform</MenuItem> */}
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

                          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={['year', 'month']}
                        label="Month/Year"
                        value={selectedDate}
                        onChange={handleDateChange}
                        inputFormat="MM/yy"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            margin="normal"
                          />
                        )}
                      />
                    </LocalizationProvider> */}
                        </Box>
                      </Box>
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
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Team Captain Bees
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
                            px: 2,
                            py: 1,
                            aspectRatio: 1
                          }}
                        >
                          <Typography
                            variant="text"
                            fontSize={'12px'}
                            fontWeight={600}
                            textAlign={'left'}
                            alignSelf={'flex-start'}
                          >
                            Total Commision Earned in USD
                          </Typography>
                          <Typography
                            variant="text"
                            fontSize={'77px'}
                            fontWeight={600}
                            textAlign={'left'}
                          >
                            ${staticsData?.affiliateUserTotalEarnings?.amountInUSD? staticsData?.affiliateUserTotalEarnings?.amountInUSD : 0}
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
        <><BeeDash2 />
        </>
      }
    </>
  );
};

export default CaptainDash;