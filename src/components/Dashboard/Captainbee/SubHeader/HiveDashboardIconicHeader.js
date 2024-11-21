import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import yellowModeConvert from '../../../../assets/updated/iconicHeader/yellow convert.svg';
import yellowModeCrypto from '../../../../assets/updated/iconicHeader/crypto yellow.svg';
import yellowModeMarket from '../../../../assets/updated/iconicHeader/market yellow.svg';

import tokenHive from '../../../../assets/updated/iconicHeader/token_hive.svg';
import stockTokenHive from '../../../../assets/updated/iconicHeader/stock_token_hive.svg';
import etfHive from '../../../../assets/updated/iconicHeader/etf_hive.svg';
import { checkByemail } from '../../../../services/api';
import captainBeeIcon from '../../../../assets/updated/iconicHeader/Captain bee.svg';
import crytoBeeIcon from '../../../../assets/updated/iconicHeader/crypto bee.svg';
import editIcon from '../../../../assets/updated/iconicHeader/Edit.svg';
import exchangeIcon from '../../../../assets/updated/iconicHeader/exchange icon.svg';
import greetingCard from '../../../../assets/updated/iconicHeader/greeting card.svg';
import honeyCombIcon from '../../../../assets/updated/iconicHeader/honey comb.svg';
import myColonyIcon from '../../../../assets/updated/iconicHeader/my colony.svg';
import resourcesIcon from '../../../../assets/updated/iconicHeader/Resources.svg';
import waggleIcon from '../../../../assets/updated/iconicHeader/waggle.svg';

const CustomTabHive = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: '#000',
  minWidth: 0,
  width: '145px',
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
    color: '#000',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid #000`,
    },
  },
  '&:hover': {
    color: '#000',
    background: 'transparent !important',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid #000`,
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
export default function HiveDashboardIconicHeader({ selectedTab, onChange }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userType, setUserType] = React.useState('Indexx Exchange');
  React.useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
    if (email) {
      checkByemail(String(email)).then((res) => {
        if (res && res.userType) {
          setUserType(res.userType);
        }
      });
    }
  }, []);

  const tabsData = [
    {
      label: 'Hive Dashboard',
      light: waggleIcon,
      dark: waggleIcon,
      path: '/indexx-exchange/dashboard',
      search: 'buyToken=INEX',
    },
    {
      label: 'My Colony',
      light: myColonyIcon,
      dark: myColonyIcon,
      path: '/indexx-exchange/dashboard/capt-mycaptains',
      search: '',
    },
    {
      label: 'My Hive Captain',
      light: captainBeeIcon,
      dark: captainBeeIcon,
      path: '/indexx-exchange/dashboard/capt-leader',
      search: '',
    },
    {
      label: 'My Hive Members',
      light: crytoBeeIcon,
      dark: crytoBeeIcon,
      path: '/indexx-exchange/dashboard/capt-mybees',
      search: '',
    },
    {
      label: 'Edit Profile',
      light: editIcon,
      dark: editIcon,
      path: '/indexx-exchange/dashboard/capt-profile',
      search: '',
    },

    // {
    //   label: 'Greeting Cards',
    //   light: greetingCard,
    //   dark: greetingCard,
    //   path: '/indexx-exchange/dashboard/capt-greet',
    //   search: '',
    // },
    // {
    //   label: 'Resources',
    //   light: resourcesIcon,
    //   dark: resourcesIcon,
    //   path: '/indexx-exchange/dashboard/capt-resource-mkt',
    //   search: '',
    // },
    {
      label: 'Exchange',
      light: exchangeIcon,
      dark: exchangeIcon,
      path: '/update/home',
      search: '',
    },
  ];

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

  let maxWidthTabContainer = '1000px';

  const TabView = CustomTabHive;
  return (
    <Box
      sx={{ backgroundColor: 'rgb(255, 179, 0)', padding: '0px 0px 10px 0px' }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          maxWidth: maxWidthTabContainer,
          margin: '120px auto 0px auto',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered={!isLoggedIn}
          variant="scrollable"
          scrollButtons={'auto'}
          sx={{
            width: '100%',
            background: 'none',
            [theme.breakpoints.down('md')]: {
              '& .MuiTabs-scrollButtons': {
                display: 'flex',
              },
              '& .MuiTabScrollButton-root': {
                padding: '25px',
                color: 'black',
                fontSize: '24px',
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          {tabsData.map((tab, index) => (
            <TabView
              key={index}
              icon={
                <img
                  src={theme.palette.mode === 'dark' ? tab.dark : tab.light}
                  style={{
                    height: '25px',
                    marginBottom: '0px',
                    filter: 'invert(1) brightness(0)',
                  }}
                />
              }
              iconPosition="top"
              label={tab.label}
              disableRipple
              className={selectedTab === tab.label ? 'active' : ''}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
