import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomTextField from './CustomTextField';
import GenericButton from '../../shared/Button/index';
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '40px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '0px 0px 30px 0px',
    borderRadius: '16px',
    width: '100%',
  },
  tabs: {
    borderRadius: '16px',

    '& .MuiTabs-flexContainer': {
      borderRadius: '16px',
      overflow: 'hidden',
    },
  },
  tab: {
    flex: 1,
    borderRadius: '16px 16px 0 0',
    '&.Mui-selected': {
      color: theme.palette.primary.default,
    },
  },
}));

const BuySellTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box className={classes.card}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <Tab label="Buy" className={classes.tab} />
          <Tab label="Sell" className={classes.tab} />
        </Tabs>
        <div style={{ padding: '24px' }}>
          <CustomTextField label={'Spend'} placeholder={'Enter Amount'} />
          <CustomTextField label={'Receive'} placeholder={'0.00'} />
          <div style={{ margin: '100px 0px' }}></div>
          <GenericButton text={'Login/Signup'} />
        </div>
      </Box>
    </Box>
  );
};

export default BuySellTabs;
