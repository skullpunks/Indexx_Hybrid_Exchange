import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { LightMode, DarkMode, Star } from '@mui/icons-material'; // Example icons
import { useTheme } from '@mui/material';

import assetLight from '../../../../assets/updated/iconicHeader/Asset wallet.png';
import assetDark from '../../../../assets/updated/iconicHeader/Asset wallet.svg';

import tokenLight from '../../../../assets/updated/iconicHeader/Token.png';
import tokenDark from '../../../../assets/updated/iconicHeader/Token.svg';

import wallStreetLight from '../../../../assets/updated/iconicHeader/Wall Street.png';
import wallStreetDark from '../../../../assets/updated/iconicHeader/Wall Street.svg';

import stakingLight from '../../../../assets/updated/iconicHeader/Staking.png';
import stakingDark from '../../../../assets/updated/iconicHeader/Staking.svg';

import etfLight from '../../../../assets/updated/iconicHeader/ETF_light.png';
import etfDark from '../../../../assets/updated/iconicHeader/ETF_dark.svg';


import { useNavigate } from 'react-router-dom';

// Custom styled Tab component
const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  width: '130px',
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  margin: '0 10px',
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  position: 'relative',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    background: 'transparent',
  },

  '&.Mui-selected::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 'calc(50% - 10px)',
    width: '16px',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
  '&:hover': {
    color: theme.palette.primary.light,
    background: 'transparent',
  },
  '&:hover::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 'calc(50% - 10px)',
    width: '16px',
    borderBottom: `3px solid ${theme.palette.primary.light}`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'transparent',
  },
}));

export default function IconicHeader({ selectedTab, onChange }) {
  const [value, setValue] = React.useState(3);
  const theme = useTheme();
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    const label = event.currentTarget.innerText;
    if (label === 'Staking') {
      // route to staking
      navigate('/indexx-exchange/buy-sell/staking');
    } else if (label === 'Asset Wallet') {
      navigate('/wallet/overview');
    } else {
      navigate('/update/home');
      onChange(event, label);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '640px',
        margin: '20px auto 50px auto',
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        centered
        variant="scrollable"
        scrollButtons={false}
        sx={{
          width: '100%',
          background: 'none',
          '& .MuiTabs-indicator': {
            display: 'none', // Remove the underline
          },
        }}
      >
        <CustomTab
          icon={
            <img
              src={theme.palette.mode === 'dark' ? tokenDark : tokenLight}
              style={{ height: '25px', marginBottom: '0px' }}
            />
          }
          iconPosition="top"
          label="Tokens"
          disableRipple
        />
        <CustomTab
          icon={
            <img
              src={
                theme.palette.mode === 'dark' ? wallStreetDark : wallStreetLight
              }
              style={{ height: '25px', marginBottom: '0px' }}
            />
          }
          iconPosition="top"
          label="Stock Tokens"
          disableRipple
        />
        <CustomTab
          icon={
            <img
            src={theme.palette.mode === 'dark' ? etfDark : etfLight}
            style={{ height: '25px', marginBottom: '0px' }}
          />
          }
          iconPosition="top"
          label="ETF Tokens"
          disableRipple
        />
        <CustomTab
          icon={
            <img
              src={theme.palette.mode === 'dark' ? stakingDark : stakingLight}
              style={{ height: '25px', marginBottom: '0px' }}
            />
          }
          iconPosition="top"
          label="Staking"
          disableRipple
        />
        <CustomTab
          icon={
            <img
              src={theme.palette.mode === 'dark' ? assetDark : assetLight}
              style={{ height: '25px', marginBottom: '0px' }}
            />
          }
          iconPosition="top"
          label="Asset Wallet"
          disableRipple
        />
      </Tabs>
    </Box>
  );
}
