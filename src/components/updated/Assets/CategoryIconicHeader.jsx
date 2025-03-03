import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import { Box, styled, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useLocation } from 'react-router-dom';

const CustomTabHive = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: '#FEBA00',
  fontSize: '16px',
  width: 'fit-content',
  marginRight: '20px',
  padding: '12px 0px',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '0px',
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

const CategoryIconicHeader = ({ navigationMenu, selectedListValue, handleListClick }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();
  const theme = useTheme();
  const [flatNavigation, setFlatNavigation] = useState([]);

  useEffect(() => {
    const flatNav = navigationMenu.reduce((acc, item) => {
      if (item.children) {
        acc.push(...item.children);
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    setFlatNavigation(flatNav);
  }, [navigationMenu]);

  const handlecategoryChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedMenuItem = flatNavigation[newValue];

    if (selectedMenuItem) {
      handleListClick(selectedMenuItem.name, selectedMenuItem.path);
    }
  };

  const TabView = CustomTabHive;

  useEffect(() => {
    const currentPath = location.pathname;
    const index = flatNavigation.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setSelectedTab(index);
    }
  }, [location.pathname, flatNavigation]);

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
        onChange={handlecategoryChange}
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
        {flatNavigation.map((tab, index) => (
          <TabView
            key={index}
            label={tab.name}
            iconPosition="top"
            disableRipple
            className={selectedTab === index ? 'active' : ''}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryIconicHeader;