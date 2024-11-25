import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const SmartCryptoTabs = ({
  selectedInnerTab,
  setSelectedInnerTab,
  backgroundColor,
  category = 'x-Blue',
}) => {
  const tabsXBlueData = [
    {
      label: 'All',
      value: 0,
    },
    {
      label: 'Ripple',
      value: 1,
    },
    {
      label: 'Surge',
      value: 2,
    },
    {
      label: 'Wave',
      value: 3,
    },
  ];

  const tabsXBitcoinData = [
    {
      label: 'All',
      value: 0,
    },
    {
      label: 'Blooming',
      value: 1,
    },
    {
      label: 'Rush',
      value: 2,
    },
    {
      label: 'Bullrun',
      value: 3,
    },
  ];

  const handleChange = (e, newValue) => {
    setSelectedInnerTab(newValue);
  };

  // Custom Styled Tabs
  const StyledTabs = styled(Tabs)({
    margin: '50px 0',
    '.MuiTabs-indicator': {
      display: 'none', // Remove the default underline
    },
  });

  // Custom Styled Tab
  const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    padding: '8px 16px',
    borderRadius: '12px',
    width: 'auto',
    fontSize: '18px',
    marginRight: '10px',
    transition: 'background-color 0.3s, color 0.3s',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      padding: '4px 12px',
      marginRight: '5px',
    },
    '&.Mui-selected': {
      backgroundColor: backgroundColor ?? '#FEBA00', // Yellow background for the active tab
      color: '#000',
    },
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgb(43, 49, 57)' : '#F5F5F5', // Light grey background on hover
    },
  }));
  const tabsData = category === 'x-Blue' ? tabsXBlueData : tabsXBitcoinData;
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          margin: '0px auto 0px auto',
        }}
      >
        <StyledTabs
          value={selectedInnerTab}
          onChange={handleChange}
          aria-label="customized tabs"
          variant="scrollable"
        >
          {tabsData.map((curr, index) => (
            <StyledTab key={index} label={curr.label} value={curr.value} />
          ))}
        </StyledTabs>
      </Box>

      {/* Content for each tab */}
      {/* {selectedTab === 0 && <div>Content for All</div>}
      {selectedTab === 1 && <div>Content for Ripple</div>}
      {selectedTab === 2 && <div>Content for Surge</div>}
      {selectedTab === 3 && <div>Content for Wave</div>} */}
    </div>
  );
};

export default SmartCryptoTabs;
