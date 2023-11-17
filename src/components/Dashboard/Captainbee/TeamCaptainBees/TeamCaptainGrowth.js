import React, { useEffect, useState } from 'react'

import arrow from '../../../../assets/hive-dashboard/Arrow 1.svg';

import comingsoon from '../../../../assets/hive-dashboard/comingsoon_grey.svg';

import { LineChart } from '@mui/x-charts/LineChart';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { getCaptainBeeStatics, getHoneyUserDetails } from '../../../../services/api';
import CommissionTable from '../CommissionTable';
import { useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material'

const TeamCaptainGrowth = () => {
  const { id } = useParams();
  // const [platform, setPlatform] = useState('Exchange');
  // const [Order, setOrder] = useState('buysell');
  // const [selectedDate, setSelectedDate] = useState('aug-sept');

  // const [platformCapt, setPlatformCapt] = useState('Exchange');
  // const [OrderCapt, setOrderCapt] = useState('buysell');
  // const [selectedDateCapt, setSelectedDateCapt] = useState('aug-sept');

  const [userType, setUserType] = useState("");
  const [staticsData, setStaticsData] = useState();
  const [userData, setUserData] = useState();
  const [loadings, setLoadings] = useState(false);
  const [email, setEmail] = useState('');
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


  const [powerPackPhoto, setPowerPackPhoto] = useState();
  const [honeyBeeData, setHoneyBeeData] = useState();
  const [honeybeeCreateDate, setHoneybeeCreateDate] = useState();
  const [captainBeeData, setRefferedUserData] = useState();
  const [captainbeeCreateDate, setCaptainbeeCreateDate] = useState();
  const [captainbeeOrders, setCaptainbeeOrders] = useState();
  const [captainbeesEmail, setCaptainbeeEmail] = useState();

  useEffect(() => {
    const userType = localStorage.getItem("userType") !== undefined ? String(localStorage.getItem("userType")) : undefined;
    const user = localStorage.getItem("user") !== undefined ? String(localStorage.getItem("user")) : undefined;

    setUserType(userType);
    if (userType === "CaptainBee") {
      if (id) {
        getCaptainBeeStatics(id).then((data) => {
          setStaticsData(data.data);
          console.log("Data", data?.data);
          console.log("Data", data?.data.userFullData?.email);
          setCaptainbeeEmail(data?.data?.userFullData?.email);
        });
      }
    } else {
      console.log("I am else")

    }
  }, [captainbeesEmail])

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <div style={{ paddingTop: "10px" }}>
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
                  fontSize={isMobile ? '25px' : '50px'}
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
                  fontSize={isMobile ? '25px' : '50px'}
                  // fontWeight={600}
                  textAlign={'left'}
                >
                  ${'0.00'}
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
                  fontSize={isMobile ? '25px' : '50px'}
                  // fontWeight={600}
                  textAlign={'left'}
                >
                  {'0.00'} {" "}
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
                      width:"100%",
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
                  fontSize={isMobile ? '25px' : '50px'}
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
                  fontSize={isMobile ? '25px' : '50px'}
                  // fontWeight={600}
                  textAlign={'left'}
                >
                  ${(staticsData?.affiliateUserTotalEarnings?.amountInUSD
                    ? parseFloat(staticsData?.affiliateUserTotalEarnings?.amountInUSD).toFixed(2)
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
                  fontSize={isMobile ? '25px' : '50px'}
                  // fontWeight={600}
                  textAlign={'left'}
                >
                  {(staticsData?.affiliateUserTotalEarnings?.amountInINEX
                    ? parseFloat(staticsData?.affiliateUserTotalEarnings?.amountInINEX).toFixed(2)
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
                      width:"100%",
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
          <CommissionTable leaderEmail={captainbeesEmail} />
        </Box>
      </Box>
    </div>
  )
}

export default TeamCaptainGrowth