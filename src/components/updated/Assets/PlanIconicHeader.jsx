import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';

import { Box, styled, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import xBlueIcon from '../../../assets/updated/smartCrypto/x-blue.png';
import xBitcoinIcon from '../../../assets/updated/smartCrypto/x-bitcoin.png';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomTabHive = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: '#fff',
  width: 'fit-content',
  marginRight: '50px',

  fontSize: '16px',
  padding: '12px 0px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  background: 'transparent !important',
  opacity: '.7',
  '&.active': {
    color: '#fff',
    transform: 'scale(1.15)',
    opacity: '1',

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 12,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.text.primary}`,
    },
  },
  '&:hover': {
    color: '#fff',
    transform: 'scale(1.15)',
    opacity: '1',

    background: 'transparent !important',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 12,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.text.primary}`,
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

const PlanIconicHeader = ({
  selectedPlanTab,
  setSelectedPlanTab,
  largeFont = false,
}) => {
  const navigate = useNavigate();
  const tabsData = [
    {
      label: 'x-Blue',
      img: xBlueIcon,
      key: 0,
    },
    {
      label: 'x-Bitcoin',
      img: xBitcoinIcon,
      key: 1,
    },
  ];

  const TabView = CustomTabHive;
  const theme = useTheme();
  const handleChange = (e, newValue) => {
    setSelectedPlanTab(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '50px',
        width: '100%',
      }}
    >
      <Tabs
        value={selectedPlanTab}
        onChange={handleChange}
        centered={false}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          maxWidth: largeFont ? '450px' : '250px',
          width: '100%',
          display: 'flex',

          justifyContent: 'space-between',
          background: 'none',
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          [theme.breakpoints.down('md')]: {
            '& .MuiTabs-scrollButtons': {
              display: 'flex',
            },
            '& .MuiTabScrollButton-root': {
              padding: '25px',
              color: 'white',
              fontSize: '24px',
            },
          },
        }}
      >
        {tabsData.map((tab, index) => (
          <TabView
            key={index}
            label={tab.label}
            icon={
              <img
                src={tab.img}
                alt=""
                style={{
                  height: largeFont ? '45px' : '25px',
                  marginBottom: '0px',
                }}
              />
            }
            iconPosition="start"
            disableRipple
            className={selectedPlanTab === tab.key ? 'active' : ''}
            style={{
              fontSize: largeFont ? '24px' : '',
              marginLeft: largeFont ? '30px' : '',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default PlanIconicHeader;
