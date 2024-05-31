import React from 'react';

import { makeStyles } from '@mui/styles';
import BalanceOverview from './Balance';
import CoinBreakdown from './CoinBreakdown';
import IconicHeader from '../shared/IconicHeader';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '936px',
    width: '100%',
    paddingTop: '50px',
    margin: '50px auto 50px auto', // Center the container
    position: 'relative', // Center the container
  },
}));

const Assets = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <IconicHeader />
      <BalanceOverview />
      <CoinBreakdown />
    </div>
  );
};

export default Assets;
