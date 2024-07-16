import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import BalanceOverview from './Balance';
import CoinBreakdown from './CoinBreakdown';
import IconicHeader from '../shared/IconicHeader';
import GenericButton from '../shared/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1200px',
    width: '100%',
    paddingTop: '50px',
    margin: '50px auto 50px auto', // Center the container
    position: 'relative', // Center the container
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',

    margin: '30px auto 10px auto',
    [theme.breakpoints.down('md')]: {
      margin: '0px auto 10px auto',
      gap: '10px',
      padding: '20px',
      flexDirection: 'column',
    },
  },
  button: {
    fontSize: '13px !important',
    lineHeight: '10px !important',
    padding: '0px 12px !important',
    height: '28px !important',
    background: `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
}));

const Assets = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState('Asset Wallet');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <BalanceOverview />
      <Box className={classes.buttonContainer}>
        <GenericButton
          text={'Transaction History'}
          className={classes.button}
          onClick={() =>
            navigate('/indexx-exchange/buy-sell/transaction-history')
          }
        />
        <GenericButton
          text={'Order History'}
          className={classes.button}
          onClick={() => navigate('/indexx-exchange/buy-sell/order-history')}
        />
        <GenericButton
          text={'Staking History'}
          className={classes.button}
          onClick={() => navigate('/indexx-exchange/buy-sell/staking-history')}
        />
      </Box>
      <CoinBreakdown />
    </div>
  );
};

export default Assets;
