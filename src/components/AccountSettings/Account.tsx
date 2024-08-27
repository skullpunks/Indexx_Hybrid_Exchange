import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled, useTheme } from '@mui/material/styles';
import CaptainBeeBridge from './CaptainBeeBridge';
import BasicInfo from './BasicInfo';
import Security from './Security';
import Preferences from './Preferences';
import Signup from './Signup';

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  width: '180px',
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

const Account = () => {
  const theme = useTheme();
  const [captainBeeForm, setCaptainBeeForm] = useState(false);

  const tabsData = [
    { label: 'Basic Info', component: <BasicInfo theme={theme} />, key: '1' },
    { label: 'Security', component: <Security />, key: '2' },
    { label: 'Preferences', component: <Preferences />, key: '3' },
    // { label: 'Payment Method', component: <PaymentMethod />, key: '4' },
  ];

  if (localStorage.getItem('userType') === 'Indexx Exchange') {
    tabsData.push({
      label: 'Convert to Captain Bee',
      component: captainBeeForm ? (
        <Signup />
      ) : (
        <CaptainBeeBridge handleCaptainBee={() => setCaptainBeeForm(true)} />
      ),
      key: '5',
    });
  }

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ paddingTop: 100 }} className="accounts_container">
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: `${190 * tabsData.length}px`,
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
              display: 'none',
            },
          }}
        >
          {tabsData.map((tab, index) => (
            <CustomTab
              key={tab.key}
              label={tab.label}
              disableRipple
              className={selectedTab === index ? 'active' : ''}
            />
          ))}
        </Tabs>
      </Box>
      <Box>{tabsData[selectedTab]?.component}</Box>
    </div>
  );
};

export default Account;
