import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const SmartCryptoTabs = ({ selectedTab, setSelectedTab }) => {
  const tabsData = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Ripple',
      value: 'Ripple',
    },
    {
      label: 'Surge',
      value: 'Surge',
    },
    {
      label: 'Wave',
      value: 'Wave',
    },
  ];


  const handleChange = (e, newValue) => {
    setSelectedTab(newValue);
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
    '&.Mui-selected': {
      backgroundColor: '#FEBA00', // Yellow background for the active tab
      color: '#000',
    },
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgb(43, 49, 57)' : '#F5F5F5', // Light grey background on hover
    },
  }));

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
          value={selectedTab}
          onChange={handleChange}
          aria-label="customized tabs"
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
