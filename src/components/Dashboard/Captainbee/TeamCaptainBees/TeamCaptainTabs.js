import React, { useState } from 'react';

// import "../../../AccountSettings/Account.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './TeamCaptainTabs.css';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import HiveDashboardIconicHeader from '../SubHeader/HiveDashboardIconicHeader';
import TeamCaptainGrowth from './TeamCaptainGrowth';
import TeamCaptainWalletTop from './TeamCaptainWalletTop';
import TeamCaptainPermissions from './TeamCaptainPermissions';
import TCaptTransactionHistoryLayout from './TeamCaptainTransactionHistory/TCaptTransactionHistoryLayout';
import TeamCaptWallet from './TeamCaptWallet';
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
    color: theme.palette.text.primary,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 5,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.text.primary}`,
    },
  },
  '&:hover': {
    color: theme.palette.text.primary,
    background: 'transparent !important',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 5,
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

const TeamCaptainTabs = ({ email }) => {
  const tabsData = [
    {
      label: 'Growth',
      key: 0,
    },
    {
      label: 'Asset Wallet',
      key: 1,
    },
    {
      label: 'Permissions',
      key: 2,
    },
    {
      label: 'Transaction History',
      key: 3,
    },
  ];

  let maxWidthTabContainer = '1000px';

  const TabView = CustomTabHive;
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const handleChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: maxWidthTabContainer,
          margin: '0px auto 0px auto',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={false}
          variant="scrollable"
          scrollButtons={'auto'}
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
              disableRipple
              className={selectedTab === tab.key ? 'active' : ''}
            />
          ))}
        </Tabs>
      </Box>

      {selectedTab === 0 && <TeamCaptainGrowth />}
      {selectedTab === 1 && <TeamCaptWallet email={email} />}
      {selectedTab === 2 && <TeamCaptainPermissions />}
      {selectedTab === 3 && <TCaptTransactionHistoryLayout email={email} />}
    </div>
  );
};

export default TeamCaptainTabs;
