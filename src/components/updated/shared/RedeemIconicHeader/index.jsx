import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import assetLight from '../../../../assets/updated/iconicHeader/lightMode/Vector.svg';
import assetDark from '../../../../assets/updated/iconicHeader/Asset wallet.svg';

import radeemDarkMode from '../../../../assets/redeem/redeem.svg';
import radeemLightMode from '../../../../assets/redeem/redeem Black.svg';

import createDarkMode from '../../../../assets/redeem/Create.svg';
import createLightMode from '../../../../assets/redeem/Create Black.svg';

import sendDarkMode from '../../../../assets/redeem/Send.svg';
import sendLightMode from '../../../../assets/redeem/Send black.svg';

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  width: '130px',
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
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

export default function IconicHeader({ selectedTab, onChange }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
  }, []);

  const tabsData = [];

  if (isLoggedIn) {
    tabsData.push(
      {
        label: 'Create',
        light: createLightMode,
        dark: createDarkMode,
        path: '/redeem/create-card',
      },

      {
        label: 'Send',
        light: sendLightMode,
        dark: sendDarkMode,
        path: '/redeem/send-card',
      },
      {
        label: 'Redeem',
        light: radeemLightMode,
        dark: radeemDarkMode,
        path: '/redeem',
      }
    );
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
      navigate(
        `${selectedTabData.path}${
          selectedTabData.search ? '?' + selectedTabData.search : ''
        }`
      );
      onChange(event, label);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '500px',
        margin: '20px auto 50px auto',
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        centered={!isLoggedIn}
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
            key={index}
            icon={
              <img
                src={theme.palette.mode === 'dark' ? tab.dark : tab.light}
                style={{ height: '25px', marginBottom: '0px' }}
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
  );
}