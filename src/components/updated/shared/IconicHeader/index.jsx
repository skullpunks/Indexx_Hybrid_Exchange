import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { LightMode, DarkMode, Star } from '@mui/icons-material'; // Example icons

// Custom styled Tab component
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
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    background: 'transparent',
  },

  '&.Mui-selected::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 'calc(50% - 10px)',
    width: '16px',
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
  '&:hover': {
    color: theme.palette.primary.light,
    background: 'transparent',
  },
  '&:hover::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 'calc(50% - 10px)',
    width: '16px',
    borderBottom: `3px solid ${theme.palette.primary.light}`,
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

export default function IconicHeader() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '640px',

        margin: '20px auto 50px auto',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        variant="scrollable"
        scrollButtons={false}
        sx={{
          width: '100%',
          background: 'none',
          '& .MuiTabs-indicator': {
            display: 'none', // Remove the underline
          },
        }}
      >
        <CustomTab
          icon={<LightMode />}
          iconPosition="top"
          label="Tokens"
          disableRipple
        />
        <CustomTab
          icon={<DarkMode />}
          iconPosition="top"
          label="Wallstreet"
          disableRipple
        />
        <CustomTab
          icon={<Star />}
          iconPosition="top"
          label="Staking"
          disableRipple
        />
        <CustomTab
          icon={<Star />}
          iconPosition="top"
          label="Asset Wallet"
          disableRipple
        />
      </Tabs>
    </Box>
  );
}
