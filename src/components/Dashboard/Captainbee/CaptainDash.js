import React, { useState, useEffect } from 'react';
import frame from '../../../assets/hive-dashboard/frame.svg';
import dummy from '../../../assets/hive-dashboard/dummy.jpeg';

import pin from '../../../assets/hive-dashboard/sidebar/pin- 1.svg';
import man from '../../../assets/hive-dashboard/sidebar/man- 2.svg';
import house from '../../../assets/hive-dashboard/sidebar/house 2 1.svg';
import clock from '../../../assets/hive-dashboard/sidebar/clock 1.svg';

import twitter from '../../../assets/hive-dashboard/sidebar/Twiter-02 1.svg';
import insta from '../../../assets/hive-dashboard/sidebar/insta icon 2.svg';
import linkedin from '../../../assets/hive-dashboard/sidebar/in icon.svg';
import discord from '../../../assets/hive-dashboard/sidebar/discord.svg';

import arrow from '../../../assets/hive-dashboard/Arrow 1.svg';

import comingsoon from '../../../assets/hive-dashboard/comingsoon.svg';
import HoneyBeeComingSoon from "../../../components/ComingSoon/HoneyBeeComingSoon";

import { LineChart } from '@mui/x-charts/LineChart';

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
import { getCaptainBeeStatics } from '../../../services/api';

const CaptainDash = () => {
  const [platform, setPlatform] = useState('Exchange');
  const [Order, setOrder] = useState('buysell');
  const [selectedDate, setSelectedDate] = useState('aug-sept');
  const [userType, setUserType] = useState("");
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];

  const [staticsData, setStaticsData] = useState();

  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const username = localStorage.getItem("username") !== undefined ? String(localStorage.getItem("username")) : undefined;
    console.log(username, userType);
    setUserType(userType);
    if (userType === "CaptainBee") {
      getCaptainBeeStatics(username).then((data) => {
        console.log("captainbee data", data.data);
        setStaticsData(data.data);
      });
    }
  }, [])

  return (
    <>
      <SubHeader />
      {userType === "CaptainBee" ?
        (<div className="hive-container">
          <div
            className="d-flex justify-content-between"
            style={{ width: '74%', maxWidth: '1140px' }}
          >
            <div className="d-flex flex-direction-column mt-1">
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
                </div>
                <div className="font_20x fw-bold mt-4 mb-3 lh_32x">
                  Captain Bee {staticsData?.affiliateUserProfile?.accname}
                </div>
              </div>
              <div className="align-items-start ms-4 lh_32x">
                <div className="font_13x d-flex align-items-center ">
                  <img alt="man" src={man} className="me-2" />
                  @{staticsData?.affiliateUserProfile?.Username}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={pin} className="me-2" />
                  {staticsData?.affiliateUserProfile?.country}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={house} className="me-2" />
                  {staticsData?.affiliateUserProfile?.city}
                </div>
                <div className="font_13x d-flex align-items-center">
                  <img alt="man" src={clock} className="me-2" />
                  {staticsData?.formatedAccountCreationDate}
                </div>
              </div>

              <div className="align-items-start ms-4 lh_32x mt-4">
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.discord ? staticsData?.affiliateUserProfile?.socialMediaLink?.discord : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.discord ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="Discord" src={discord} className="me-3" />
                </a>
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.instagram ? staticsData?.affiliateUserProfile?.socialMediaLink?.instagram : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.instagram ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="Instagram" src={insta} className="me-3" />
                </a>
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin ? staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.linkedin ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="LinkedIn" src={linkedin} className="me-3" />
                </a>
                <a href={staticsData?.affiliateUserProfile?.socialMediaLink?.twitter ? staticsData?.affiliateUserProfile?.socialMediaLink?.twitter : "#"} target={staticsData?.affiliateUserProfile?.socialMediaLink?.twitter ? "_blank" : "_self"} rel="noopener noreferrer">
                  <img alt="Twitter" src={twitter} />
                </a>

              </div>
              <div className="d-flex  flex-direction-column align-items-center mt-5">
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
              <Typography
                variant="text"
                component="p"
                fontSize={'15px'}
                fontWeight={700}
                textAlign={'left'}
                mb={2}
              >
                Sales Dashboard
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
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
                        background: 'white',
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
                          background: 'white',
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
                        background: 'white',
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
                          background: 'white',
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
                        background: 'white',
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
                          background: 'white',
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
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1,
                      }}
                    >
                      <Typography
                        variant="text"
                        fontSize={'12px'}
                        fontWeight={600}
                        textAlign={'left'}
                        pr={5}
                      >
                        Total Honey Bees/Users
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
                        <img alt="up" src={arrow} /> {staticsData?.honeyBeesCount ? "30%" : "0%" }
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '50%',
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1,
                      }}
                    >
                      <Typography
                        variant="text"
                        fontSize={'12px'}
                        fontWeight={600}
                        textAlign={'left'}
                        pr={12}
                      >
                        Total Orders
                      </Typography>
                      <Typography
                        variant="text"
                        fontSize={'77px'}
                        fontWeight={600}
                        textAlign={'left'}
                      >
                        {staticsData?.ordersCount}
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
                  <Box
                    sx={{
                      background: 'white',
                    }}
                  >
                    <LineChart
                      width={400}
                      height={300}
                      series={[
                        { data: pData, label: 'pv' },
                        { data: uData, label: 'uv' },
                      ]}
                      xAxis={[{ scaleType: 'point', data: xLabels }]}
                    />
                  </Box>
                </Box>

                <Box
                  component="img"
                  alt="comingsoon"
                  src={comingsoon}
                  width={'50%'}
                />
              </Box>
            </div>
          </div>
        </div>) :
        <><HoneyBeeComingSoon />
        </>
      }
    </>
  );
};

export default CaptainDash;
