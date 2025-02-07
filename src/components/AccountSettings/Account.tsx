import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'; // To extract the query parameter
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled, useTheme } from '@mui/material/styles';
import CaptainBeeBridge from './CaptainBeeBridge';
import BasicInfo from './BasicInfo';
import Security from './Security';
import Preferences from './Preferences';
import Signup from './Signup';

import basicLight from '../../assets/updated/accountIconicHeader/basicInfoLightMode.png';
import basicDark from '../../assets/updated/accountIconicHeader/basicInfoDarkMode.png';

import securityLight from '../../assets/updated/accountIconicHeader/securityLightMode.png';
import securityDark from '../../assets/updated/accountIconicHeader/securityDarkMode.png';

import preferenceLight from '../../assets/updated/accountIconicHeader/preferrencesLightMode.png';
import preferenceDark from '../../assets/updated/accountIconicHeader/preferencesDarkMode.png';

import convertLight from '../../assets/updated/accountIconicHeader/convertLightMode.svg';
import convertDark from '../../assets/updated/accountIconicHeader/convertDarkMode.svg';
import {
  loginWithToken,
  decodeJWT,
  getCaptainBeeByEmail,
} from '../../services/api';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // Access the query parameters
  const [captainBeeForm, setCaptainBeeForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    if (defaultSignInToken) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    }
  }, []);

  async function checkLogin(defaultSignInToken: any) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.access_token, 'res.data.access_token');
        let resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        if (resObj?.userType === 'CaptainBee') {
          let resObj2 = await getCaptainBeeByEmail(String(resObj?.email));
          console.log(resObj2);
          let username = resObj2?.data.Username;
          localStorage.setItem('username', username);
        }
        searchParams.delete('signInToken');
        setSearchParams(searchParams);
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  const tabsData = [
    {
      label: 'Basic Info',
      light: basicLight,
      dark: basicDark,
      component: <BasicInfo theme={theme} />,
      key: '1',
    },
    {
      label: 'Security',
      light: securityLight,
      dark: securityDark,
      component: <Security />,
      key: '2',
    },
    // {
    //   label: 'Preferences',
    //   light: preferenceLight,
    //   dark: preferenceDark,
    //   component: <Preferences />,
    //   key: '3',
    // },
  ];

  if (localStorage.getItem('userType') === 'Indexx Exchange') {
    tabsData.push({
      label: 'Convert to Hive Captain',
      light: convertLight,
      dark: convertDark,
      component: captainBeeForm ? (
        <Signup />
      ) : (
        <CaptainBeeBridge handleCaptainBee={() => setCaptainBeeForm(true)} />
      ),
      key: '5',
    });
  }

  // Extract `active` from the URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activeTab = params.get('active');
    if (activeTab === 'security') {
      setSelectedTab(1); // Set tab 2 (index 1) as active
    }
  }, [location.search]);

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
          maxWidth: `${210 * tabsData.length}px`,
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
              icon={
                <img
                  src={theme.palette.mode === 'dark' ? tab.dark : tab.light}
                  style={{ height: '25px', marginBottom: '0px' }}
                />
              }
            />
          ))}
        </Tabs>
      </Box>
      <Box>{tabsData[selectedTab]?.component}</Box>
    </div>
  );
};

export default Account;
