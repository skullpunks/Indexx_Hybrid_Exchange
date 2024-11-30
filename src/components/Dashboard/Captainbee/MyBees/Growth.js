import React, { useEffect, useState } from 'react';

import arrow from '../../../../assets/hive-dashboard/Arrow 1.svg';

import comingsoon from '../../../../assets/hive-dashboard/comingsoon_grey.svg';

// import { LineChart } from '@mui/x-charts/LineChart';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getHoneyBeeDataByUsername } from '../../../../services/api';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

const Growth = () => {
  const [platform, setPlatform] = useState('Exchange');
  const [Order, setOrder] = useState('buysell');
  const [selectedDate, setSelectedDate] = useState('aug-sept');

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
  const { id } = useParams();

  const [userData, setUserData] = useState();

  useEffect(() => {
    getHoneyBeeDataByUsername(id).then((data) => {
      setUserData(data.data);
    });
  }, [id]);

  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <div style={{ paddingTop: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: `${isMobile ? 'column' : 'row'}`,
          gap: 2,
          mt: 2,
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
            p: 2,
            aspectRatio: 1,
          }}
        >
          <Typography
            variant="text"
            fontSize={'12px'}
            fontWeight={600}
            textAlign={'center'}
            alignSelf={'flex-start'}
          >
            Total Hive Members/Users
          </Typography>
          <Typography
            variant="text"
            fontSize={'77px'}
            fontWeight={600}
            textAlign={'center'}
          >
            0
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
            <img alt="up" src={arrow} /> 0%
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
            p: 2,
            aspectRatio: 1,
          }}
        >
          <Typography
            variant="text"
            fontSize={'12px'}
            fontWeight={600}
            textAlign={'center'}
            alignSelf={'flex-start'}
          >
            Total Orders
          </Typography>
          <Typography
            variant="text"
            fontSize={'77px'}
            fontWeight={600}
            textAlign={'center'}
          >
            {userData?.ordersCount}
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
            <img alt="up" src={arrow} /> 0%
          </Typography>
        </Box>

        {/* <Box component="img" alt="comingsoon" src={comingsoon} width={'50%'} /> */}
      </Box>
    </div>
  );
};

export default Growth;
