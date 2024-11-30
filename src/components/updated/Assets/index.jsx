import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import BalanceOverview from './Balance';
import CoinBreakdown from './CoinBreakdown';
import IconicHeader from '../shared/IconicHeader';
import GenericButton from '../shared/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import assetLight from '../../../assets/updated/iconicHeader/lightMode/Vector.svg';
import assetDark from '../../../assets/updated/iconicHeader/Asset wallet.svg';
import assetHive from '../../../assets/updated/iconicHeader/asset_wallet_hive.svg';
import CategoryIconicHeader from './CategoryIconicHeader';

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
  flexContainer1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',

    marginBottom: '70px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%',
      '&>div': {
        width: '100%',
      },
    },
  },
  smartCryptoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
    '& img': {
      height: '50px',
    },
    marginBottom: '20px',
  },
}));

const Assets = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState('Asset Wallet');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <div className={classes.flexContainer1}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <div className={classes.smartCryptoContainer}>
            <img src={assetHive} />
            <h3 style={{ margin: 0 }}>Asset Wallet</h3>
          </div>
          <p>
            Securely Manage, Grow, and Track Your Assets in One Powerful Wallet.
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '50px',
        }}
      >
        <CategoryIconicHeader
          selectedTab={selectedCategory}
          setSelectedTab={setSelectedCategory}
        />
      </div>

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
