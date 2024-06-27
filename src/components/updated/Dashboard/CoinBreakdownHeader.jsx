import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  textAlign: 'left',
  width: '100px',
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  margin: '0 0px',
  padding: '6px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
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

export default function Header() {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState('Holding');

  const tabsData = [
    {
      label: 'Holding',
    },
    {
      label: 'Hot',
    },
    {
      label: 'New Listing',
    },
    {
      label: 'Favourite',
    },
    {
      label: 'Top Gainers',
    },
    {
      label: '24 Volume',
    },
  ];

  const handleChange = (event) => {
    const label = event.currentTarget.innerText;
    setActiveTab(label);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '850px',
        marginLeft: '-28px',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
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
            iconPosition="top"
            label={tab.label}
            disableRipple
            className={activeTab === tab.label ? 'active' : ''}
          />
        ))}
      </Tabs>
    </Box>
  );
}
