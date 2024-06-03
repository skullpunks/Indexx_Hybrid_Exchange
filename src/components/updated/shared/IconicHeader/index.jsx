import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import assetLight from '../../../../assets/updated/iconicHeader/lightMode/Vector.svg';
import assetDark from '../../../../assets/updated/iconicHeader/Asset wallet.svg';

import tokenLight from '../../../../assets/updated/iconicHeader/lightMode/Token.svg';
import tokenDark from '../../../../assets/updated/iconicHeader/Token.svg';

import wallStreetLight from '../../../../assets/updated/iconicHeader/lightMode/Wall Street.svg';
import wallStreetDark from '../../../../assets/updated/iconicHeader/Wall Street.svg';

import stakingLight from '../../../../assets/updated/iconicHeader/lightMode/Staking.svg';
import stakingDark from '../../../../assets/updated/iconicHeader/Staking.svg';

import etfLight from '../../../../assets/updated/iconicHeader/lightMode/etf-logo.svg';
import etfDark from '../../../../assets/updated/iconicHeader/ETF_dark.svg';

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
  background: 'transparent !important',
  '&.active': {
    color: theme.palette.primary.light,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.primary.light}`,
    },
  },
  '&:hover': {
    color: theme.palette.primary.light,
    background: 'transparent !important',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.primary.light}`,
    },
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
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const tabsData = [
    {
      label: 'Tokens',
      light: tokenLight,
      dark: tokenDark,
      path: '/update/home',
    },
    {
      label: 'Stock Tokens',
      light: wallStreetLight,
      dark: wallStreetDark,
      path: '/update/home/stock-token',
    },
    {
      label: 'ETF Tokens',
      light: etfLight,
      dark: etfDark,
      path: '/update/home/etf-tokens',
    },
    {
      label: 'Staking',
      light: stakingLight,
      dark: stakingDark,
      path: '/staking',
    },
    {
      label: 'Asset Wallet',
      light: assetLight,
      dark: assetDark,
      path: '/wallet/overview',
    },
  ];

  const handleChange = (event, newValue) => {
    const label = event.currentTarget.innerText;
    if (label === 'Staking') {
      navigate('/indexx-exchange/buy-sell/staking');
    } else if (label === 'Asset Wallet') {
      navigate('/wallet/overview');
    } else if (label === 'ETF Tokens') {
      navigate('/update/home/etf-tokens');
      onChange(event, label);
    } else if (label === 'Stock Tokens') {
      navigate('/update/home/stock-token');
      onChange(event, label);
    } else {
      navigate('/update/home');
      onChange(event, label);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '740px',
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
        {tabsData.map((tab, index) => (
          <CustomTab
            key={index}
            icon={
              <img
                src={theme.palette.mode === 'dark' ? tab.dark : tab.light}
                style={{ height: '25px', marginBottom: '0px' }}
              />
            }
            iconPosition="top"
            label={tab.label}
            disableRipple
            className={location.pathname === tab.path ? 'active' : ''}
          />
        ))}
      </Tabs>
    </Box>
  );
}
