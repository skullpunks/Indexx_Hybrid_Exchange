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
import wallStreetLight from '../../../../assets/updated/iconicHeader/Stock token for Light Mode.svg';
import wallStreetDark from '../../../../assets/updated/iconicHeader/Stock token for dark mode.svg';
import stakingLight from '../../../../assets/updated/SmartApy/staking light mode.png';
import stakingDark from '../../../../assets/updated/SmartApy/Staking dark mode.png';
import etfLight from '../../../../assets/updated/iconicHeader/lightMode/etf-logo.svg';
import etfDark from '../../../../assets/updated/iconicHeader/ETF_dark.svg';
import giftLight from '../../../../assets/redeem/giftWhite.svg';
import giftDark from '../../../../assets/redeem/giftBlack.svg';

import darkModeConvert from '../../../../assets/updated/iconicHeader/darkModeConvert.png';
import lightModeConvert from '../../../../assets/updated/iconicHeader/lightModeConvert.png';
import yellowModeConvert from '../../../../assets/updated/iconicHeader/yellow convert.svg';

import darkModeCrypto from '../../../../assets/updated/iconicHeader/crypto Dark.svg';
import lightModeCrypto from '../../../../assets/updated/iconicHeader/crypto white.svg';
import yellowModeCrypto from '../../../../assets/updated/iconicHeader/crypto yellow.svg';

import darkModeMarket from '../../../../assets/updated/iconicHeader/market icon Dark.svg';
import lightModeMarket from '../../../../assets/updated/iconicHeader/market icon white.svg';
import yellowModeMarket from '../../../../assets/updated/iconicHeader/market yellow.svg';

import tokenHive from '../../../../assets/updated/iconicHeader/token_hive.svg';
import stockTokenHive from '../../../../assets/updated/iconicHeader/stock_token_hive.svg';
import etfHive from '../../../../assets/updated/iconicHeader/etf_hive.svg';
import stakingHive from '../../../../assets/updated/SmartApy/Staking Yellow.png';

import giftHive from '../../../../assets/updated/iconicHeader/gift_hive.svg';
import assetHive from '../../../../assets/updated/iconicHeader/asset_wallet_hive.svg';
import hiveHive from '../../../../assets/updated/iconicHeader/hive_hive.svg';
import smartCrypto from '../../../../assets/updated/smartCrypto/smartCryptoLogo.png';
import smartCryptoWhite from '../../../../assets/updated/smartCrypto/smartcryptowhite.svg';
import smartCryptoBlack from '../../../../assets/updated/smartCrypto/smartcryptoblack.svg';

import apyYellow from '../../../../assets/updated/SmartApy/APY yellow.png';
import apyDarkMode from '../../../../assets/updated/SmartApy/APY Dark mode.png';
import apyLightMode from '../../../../assets/updated/SmartApy/APY Light mode.png';

import { checkByemail } from '../../../../services/api';

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  width: '120px',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  margin: '0 5px',
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

const CustomTabHive = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: '#FEBA00 !important',
  minWidth: 0,
  width: '120px',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  margin: '0 5px',
  padding: '12px 16px',
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
      bottom: 0,
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
      bottom: 0,
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
export default function IconicHeader({ selectedTab, onChange }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState('Indexx Exchange');
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
    if (email) {
      checkByemail(String(email))
        .then((res) => {
          if (res && res.userType) {
            setUserType(res.userType);
          }
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const tabsData = [
    {
      label: 'Buy & Sell',
      light: userType === 'Indexx Exchange' ? darkModeCrypto : yellowModeCrypto,
      dark: userType === 'Indexx Exchange' ? lightModeCrypto : yellowModeCrypto,
      path: '/update/home',
      search: 'buyToken=INEX',
    },
    {
      label: 'Convert',
      light:
        userType === 'Indexx Exchange' ? lightModeConvert : yellowModeConvert,
      dark:
        userType === 'Indexx Exchange' ? darkModeConvert : yellowModeConvert,
      path: '/convert',
      search: '',
    },
    {
      label: 'xTokens',
      light: userType === 'Indexx Exchange' ? tokenLight : tokenHive,
      dark: userType === 'Indexx Exchange' ? tokenDark : tokenHive,
      path: 'https://indexx.ai/indexx-exchange/token-details',
      search: '',
    },
    {
      label: 'Smart Crypto',
      light: userType === 'Indexx Exchange' ? smartCryptoBlack : smartCrypto,
      dark: userType === 'Indexx Exchange' ? smartCryptoWhite : smartCrypto,
      path: '/smart-crypto',
      search: '',
    },
    {
      label: 'Smart APY',
      light: userType === 'Indexx Exchange' ? apyLightMode : apyYellow,
      dark: userType === 'Indexx Exchange' ? apyDarkMode : apyYellow,
      path: '/smart-apy',
      search: '',
    },

    {
      label: 'Markets',
      light: userType === 'Indexx Exchange' ? darkModeMarket : yellowModeMarket,
      dark: userType === 'Indexx Exchange' ? lightModeMarket : yellowModeMarket,
      path: '/indexx-exchange/market-data',
      search: '',
    },
  ];

  if (isLoggedIn) {
    tabsData.push(
      {
        label: 'Staking',
        light: userType === 'Indexx Exchange' ? stakingLight : stakingHive,
        dark: userType === 'Indexx Exchange' ? stakingDark : stakingHive,
        path: '/indexx-exchange/buy-sell/staking',
      },
      {
        label: 'Gifts',
        light: userType === 'Indexx Exchange' ? giftDark : giftHive,
        dark: userType === 'Indexx Exchange' ? giftLight : giftHive,
        path: '/redeem/create-card',
      },

      {
        label: 'Asset Wallet',
        light: userType === 'Indexx Exchange' ? assetLight : assetHive,
        dark: userType === 'Indexx Exchange' ? assetDark : assetHive,
        path: '/wallet/overview',
      }
    );
  }

  if (userType !== 'Indexx Exchange') {
    tabsData.push({
      label: 'Hive',
      light: hiveHive,
      dark: hiveHive,
      path: '/indexx-exchange/dashboard',
    });
  }

  const getSelectedTab = () => {
    const currentPath = location.pathname;
    const currentSearch = location.search;

    const matchedTab = tabsData.find(
      (tab) =>
        tab.path === currentPath &&
        (tab.search ? currentSearch.includes(tab.search) : true)
    );
    return matchedTab ? matchedTab.label : '';
  };

  const [selectedTabState, setSelectedTabState] = React.useState(
    getSelectedTab()
  );

  React.useEffect(() => {
    setSelectedTabState(getSelectedTab());
  }, [location]);

  const handleChange = (event, newValue) => {
    const label = event.currentTarget.innerText;
    const selectedTabData = tabsData.find((tab) => tab.label === label);

    if (selectedTabData) {
      if (selectedTabData.path.startsWith('http')) {
        // If the path is an external URL, open it in a new tab
        window.open(selectedTabData.path, '_blank');
      } else {
        // Navigate to internal paths
        navigate(
          `${selectedTabData.path}${
            selectedTabData.search ? '?' + selectedTabData.search : ''
          }`
        );
      }
      onChange(event, label);
    }
  };

  let maxWidthTabContainer;
  if (isLoggedIn && userType === 'Indexx Exchange') {
    maxWidthTabContainer = '1260px';
  } else if (isLoggedIn && userType !== 'Indexx Exchange') {
    maxWidthTabContainer = '1400px';
  } else {
    maxWidthTabContainer = '870px';
  }

  const TabView = userType === 'Indexx Exchange' ? CustomTab : CustomTabHive;
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: maxWidthTabContainer,
        margin: '20px auto 50px auto',
      }}
    >
      {loading ? (
        ''
      ) : (
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={!isLoggedIn}
          variant="scrollable"
          scrollButtons={'auto'}
          sx={{
            width: '100%',
            background: 'none',
            '& .MuiTabs-indicator': {
              display: 'none',
            },

            '& .MuiTabs-flexContainer': {
              height: '100%',
            },
            [theme.breakpoints.down('md')]: {
              '& .MuiTabs-scrollButtons': {
                display: 'flex',
              },
              '& .MuiTabScrollButton-root': {
                padding: '25px',
              },
            },
          }}
        >
          {tabsData.map((tab, index) => (
            <TabView
              key={index}
              icon={
                <img
                  src={theme.palette.mode === 'dark' ? tab.dark : tab.light}
                  style={{ height: '65px', marginBottom: '0px' }}
                />
              }
              iconPosition="top"
              label={tab.label}
              disableRipple
              className={selectedTab === tab.label ? 'active' : ''}
            />
          ))}
        </Tabs>
      )}
    </Box>
  );
}
