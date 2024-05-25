import { makeStyles } from '@mui/styles';
import React from 'react';
import BuySellTabs from './BuySellTabs';
import CryptoStats from './CryptoStats';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '20px', // Add some space between the containers
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  container: {
    maxWidth: '486px',
    flex: 1, // To ensure both containers take up equal space
    width: '100%',
  },
}));

const BuyCrypto = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CryptoStats />
      </div>
      <div className={classes.container}>
        <BuySellTabs />
      </div>
    </div>
  );
};

export default BuyCrypto;
