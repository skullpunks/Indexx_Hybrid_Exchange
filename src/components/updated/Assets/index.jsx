import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import BalanceOverview from './Balance';
import CoinBreakdown from './CoinBreakdown';
import IconicHeader from '../shared/IconicHeader';
import GenericButton from '../shared/Button';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import assetLight from '../../../assets/updated/iconicHeader/lightMode/Vector.svg';
import assetDark from '../../../assets/updated/iconicHeader/Asset wallet.svg';
import assetHive from '../../../assets/updated/iconicHeader/asset_wallet_hive.svg';
import CategoryIconicHeader from './CategoryIconicHeader';

// Define the makeStyles hook
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '50px',
    margin: '50px auto 50px auto', // Center the container
    position: 'relative', // Center the container
  },
  maxWidthContainer: {
    // maxWidth: '1380px',
    width: '100%',
    margin: 'auto',
    padding: '20px',
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
    marginBottom: '30px',
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
  activeLink: {
    color: theme.palette.text.primary,
    borderBottom: `0px solid ${theme.palette.primary.main}`, // 3px underline
    '&::before': {
      content: '""',
      display: 'block',
      width: '16px', // height of the line at the start of the item
      height: '3px', // thickness
      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      position: 'absolute',
      left: 20,
      top: '95%',
      transform: 'translateY(-50%)', // vertical alignment
    },
  },
  hoverEffect: {
    fontSize: '14px',
    position: 'relative', // for the pseudo-element
    background: 'none',
    color: '#FFBB00',
    '&:hover': {
      backgroundColor: 'transparent',
      borderBottom: `0px solid ${
        theme.palette.mode === 'dark' ? '#fff' : '#000'
      }`, // underline on hover
    },
    '&:hover::before': {
      content: '""',
      display: 'block',
      width: '16px',
      height: '3px',
      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      position: 'absolute',
      left: 20,
      top: '95%',
      transform: 'translateY(-50%)',
    },
  },
  tableContainer: {
    display: 'flex',
    padding: '0px 20px',
    [theme.breakpoints.down('md')]: {
      padding: '0px',
    },
  },
}));

const Assets = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('Asset Wallet');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const tab = useMediaQuery('(max-width:900px)');
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <div className={`${classes.flexContainer1} ${classes.maxWidthContainer}`}>
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
      {tab && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          className={classes.maxWidthContainer}
        >
          <CategoryIconicHeader
            selectedTab={selectedCategory}
            setSelectedTab={setSelectedCategory}
          />
        </div>
      )}

      <div className={classes.tableContainer}>
        {!tab && (
          <div
            style={{
              width: '300px',
              position: 'sticky',
              top: 100,
              marginTop: '20px',
            }}
          >
            <List sx={{ position: 'sticky', top: 100 }}>
              {[
                { name: 'Overview', path: '/wallet/overview' },
                { name: 'Crypto', path: '/wallet/crypto' },
                { name: 'Fiat', path: '/wallet/fiat' },
                { name: 'Smart Crypto', path: '/wallet/smart-crypto' },
                { name: 'IUSD+', path: '/wallet/iusd+' },
              ].map((el, index) => (
                <ListItem
                  key={el.path}
                  disablePadding
                  disableRipple
                  onClick={() => navigate(`${el.path}`)}
                  className={`${classes.hoverEffect} ${
                    location.pathname === el.path ? classes.activeLink : ''
                  }`}
                >
                  <ListItemButton
                    disableRipple
                    sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  >
                    <ListItemText primary={el.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        <div className={classes.maxWidthContainer}>
          <BalanceOverview />

          <Box className={`${classes.buttonContainer}`}>
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
              onClick={() =>
                navigate('/indexx-exchange/buy-sell/order-history')
              }
            />
            <GenericButton
              text={'Staking History'}
              className={classes.button}
              onClick={() =>
                navigate('/indexx-exchange/buy-sell/staking-history')
              }
            />
          </Box>
          <div>
            <CoinBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
