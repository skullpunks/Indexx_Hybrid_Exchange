import { makeStyles } from '@mui/styles';
import React from 'react';
import BuySellTabs from './BuySellTabs';
import CryptoStats from './CryptoStats';
import Popup from './PaymentPopup';
import { TokenProvider } from './TokenContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  container1: {
    order: 1,
    [theme.breakpoints.down('md')]: {
      order: 3,
    },
  },
  container2: {
    order: 2,
  },
}));

const BuyCrypto = ({ tokenType, onReceiveTokenChange }) => {
  const classes = useStyles();

  return (
    <TokenProvider>
      <div className={classes.root}>
        <div className={`${classes.container} ${classes.container1}`}>
          <CryptoStats tokenType={tokenType} />
        </div>
        <div className={`${classes.container} ${classes.container2}`}>
          <BuySellTabs
            tokenType={tokenType}
            onReceiveTokenChange={onReceiveTokenChange}
          />
        </div>
        <Popup />
      </div>
    </TokenProvider>
  );
};

export default BuyCrypto;
