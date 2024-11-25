import React, { useEffect, useState } from 'react';

import arrow from '../../../../assets/hive-dashboard/Arrow 1.svg';

import comingsoon from '../../../../assets/hive-dashboard/comingsoon_grey.svg';

// import { LineChart } from '@mui/x-charts/LineChart';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import {
  getCaptainBeeStatics,
  getHoneyUserDetails,
} from '../../../../services/api';
import CommissionTable from '../CommissionTable';
import { useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

const TeamCaptainGrowth = () => {
  const { id } = useParams();
  // const [platform, setPlatform] = useState('Exchange');
  // const [Order, setOrder] = useState('buysell');
  // const [selectedDate, setSelectedDate] = useState('aug-sept');

  // const [platformCapt, setPlatformCapt] = useState('Exchange');
  // const [OrderCapt, setOrderCapt] = useState('buysell');
  // const [selectedDateCapt, setSelectedDateCapt] = useState('aug-sept');

  const [userType, setUserType] = useState('');
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
        getCaptainBeeStatics(id).then((data) => {
          setStaticsData(data.data);
          console.log('Data', data?.data);
          console.log('Data', data?.data.userFullData?.email);
          setCaptainbeeEmail(data?.data?.userFullData?.email);
        });
      }
    } else {
      console.log('I am else');
    }
  }, [captainbeesEmail]);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <div style={{ paddingTop: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: isMobile ? 4 : 2,
            flexDirection: 'column',
            padding: '10px',
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
                {staticsData?.affiliateHoneyBeeUserTotalEarnings?.amountInUSD
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
                {staticsData?.affiliateHoneyBeeUserTotalEarnings?.amountInINEX
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
                {staticsData?.ordersCount ? '20%' : '0%'}
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
                      staticsData?.affiliateUserTotalEarnings?.amountInUSD
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
                      staticsData?.affiliateUserTotalEarnings?.amountInINEX
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
                {staticsData?.ordersCount ? '20%' : '0%'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <CommissionTable leaderEmail={captainbeesEmail} />
        </Box>
      </Box>
    </div>
  );
};

export default TeamCaptainGrowth;
