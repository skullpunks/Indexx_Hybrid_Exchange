import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';

const CustomTab = styled(Tab)(({ theme }) => ({
  '& .MuiTab-root': {
    width: 'fit-content !important',
  },
  textTransform: 'none',
  minWidth: 0,
  width: 'fit-content',
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  margin: '0 10px',
  padding: '12px 0px',
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
      bottom: '6px',
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
      bottom: '6px',
      left: 'calc(50% - 10px)',
      width: '16px',
      borderBottom: `3px solid ${theme.palette.primary.light}`,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '6px',
    left: 0,
    right: 0,
    height: '3px',
    background: 'transparent',
  },
}));

export default function IconicHeader({ selectedTab, onChange }) {
  const theme = useTheme();

  const tabsData = [
    {
      label: 'Markets',
      path: '',
    },
    // {
    //   label: 'Limits',
    //   path: '',
    // },
  ];

  const handleChange = (event, newValue) => {
    onChange(event, newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: '20px 0 20px -10px',
      }}
    >
      <Tabs
        value={0} // Always set the first tab as selected
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          width: 'fit-content',

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
            className={index === 0 ? 'active' : ''}
          />
        ))}
      </Tabs>
    </Box>
  );
}
