import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';

import { Box, styled, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import xBlueIcon from '../../../assets/updated/smartCrypto/x-blue.png';
import xBitcoinIcon from '../../../assets/updated/smartCrypto/x-bitcoin.png';

const CustomTabHive = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: '#FEBA00',
  width: 'fit-content',
  marginRight: '10px',
  padding: '12px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  position: 'relative',
  background: 'transparent !important',
  '&.active': {
    color: '#FEBA00',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 2,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.text.primary}`,
    },
  },
  '&:hover': {
    color: '#FEBA00',
    background: 'transparent !important',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 2,
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

const CategoryIconicHeader = ({ selectedTab, setSelectedTab }) => {
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

  let maxWidthTabContainer = '400px';

  const TabView = CustomTabHive;
  const theme = useTheme();
  const handleChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        centered={false}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          width: '100%',
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
                  height: '25px',
                  marginBottom: '0px',
                }}
              />
            }
            iconPosition="top"
            disableRipple
            className={selectedTab === tab.key ? 'active' : ''}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryIconicHeader;
