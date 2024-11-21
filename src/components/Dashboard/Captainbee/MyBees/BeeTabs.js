import React, { useState } from 'react';

// import "../../../AccountSettings/Account.css";
// import { Tabs } from 'antd';
import './BeeTabs.css';

import Growth from './Growth';
import BeeWallet from './BeeWallet';
import Tabs from '@mui/material/Tabs';
import BeeTransactionHistoryLayout from './BeeTransactionHistory/BeeTransactionHistoryLayout';
import Permissions from './Permissions';
import { useParams } from 'react-router-dom';
import { Box, styled, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
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

const BeeTabs = ({ honeyBeeEmail }) => {
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

      {selectedTab === 0 && <Growth />}
      {selectedTab === 1 && <BeeWallet honeyBeeEmail={honeyBeeEmail} />}
      {selectedTab === 2 && <Permissions />}
      {selectedTab === 3 && (
        <BeeTransactionHistoryLayout honeyBeeEmail={honeyBeeEmail} />
      )}
    </div>

    // <div
    // // style={{ paddingTop: 90 }}
    // className="my-tabs"
    // >
    //     <Tabs defaultActiveKey={finaltab}>
    //         <Tabs.TabPane tab="Growth" key="1">
    //            <Growth/>
    //         </Tabs.TabPane>
    //         <Tabs.TabPane tab="Wallet" key="2">
    //           <BeeWallet honeyBeeEmail={honeyBeeEmail}/>
    //         </Tabs.TabPane>
    //         <Tabs.TabPane tab="Permissions" key="3">
    //           <Permissions/>
    //         </Tabs.TabPane>
    //         <Tabs.TabPane tab="Transactions" key="4">
    //         <BeeTransactionHistoryLayout honeyBeeEmail={honeyBeeEmail}/>
    //         </Tabs.TabPane>
    //     </Tabs>
    // </div>
  );
};

export default BeeTabs;
