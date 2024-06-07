import React, { useState } from 'react';
import { Tabs, Tab, Box, useTheme } from '@mui/material';

function DurationTabs({ value, onChange }) {
  const theme = useTheme();


  return (
    <Box
      style={{
        width: '34%',
        marginLeft: 'auto',
        marginBottom: '10px',
      }}
    >
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="Duration Tabs"
        sx={{
          '& .MuiTabs-indicator': {
            display: 'none', // Remove the underline
          },
          '& .MuiButtonBase-root': {
            minWidth: '0px !important',
          },
          '& .MuiTab-root': {
            disableRipple: true,
            color: theme.palette.mode === 'dark' ? '#848E9C' : '#848E9C',

            borderRadius: '8px', // Customize border radius
            '&:hover': {
              backgroundColor: 'transparent', // Disable background color on hover
            },

            '&.Mui-selected': {
              backgroundColor:
                theme.palette.mode === 'light' ? '#F5F5F5' : '#2B3139',
              color: theme.palette.mode === 'dark' ? '#848E9C' : '#848E9C',
            },
          },
        }}
      >
        <Tab
          label="1D"
          disableRipple
          sx={{
            width: '38px !important',
            minWidth: '38px !important',
            padding: '00px',
            height: '38px',
          }}
        />
        <Tab
          label="7D"
          sx={{
            width: '38px !important',
            minWidth: '38px !important',
            padding: '00px',
            height: '38px',
          }}
        />
        <Tab
          label="1M"
          disableRipple
          sx={{
            width: '38px !important',
            minWidth: '38px !important',
            padding: '00px',
            height: '38px',
          }}
        />
        <Tab
          label="3M"
          disableRipple
          sx={{
            width: '38px !important',
            minWidth: '38px !important',
            padding: '00px',
            height: '38px',
          }}
        />
        <Tab
          label="1Y"
          disableRipple
          sx={{
            width: '38px !important',
            minWidth: '38px !important',
            padding: '00px',
            height: '38px',
          }}
        />
      </Tabs>
    </Box>
  );
}

export default DurationTabs;
