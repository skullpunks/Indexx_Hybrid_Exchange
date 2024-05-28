import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomTextField from './CustomTextField';
import GenericButton from '../../shared/Button/index';
import { useTheme } from '@mui/material/styles';
import PaymentMethodSelection from './PaymentMethodSelection';
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '40px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '0px 0px 30px 0px',
    borderRadius: '24px',
    width: '100%',
    overflow: 'visible',
    height: '582px',
  },
  bnFlex: {
    display: 'flex',
  },
  tabContainer: {
    background: '#181a20',
    borderRadius: '24px 24px 0 0',
    height: 84,
  },
  tabItemContainer: {
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, #2b3139 50%, #181a20 0)'
        : 'linear-gradient(180deg, #f5f5f5 50%, #fff 0)',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    height: '64px',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  tabItem: {
    alignItems: 'center',
    background: '#2b3139',
    cursor: 'pointer',
    flex: '1 1',
    fontSize: '20px',
    fontWeight: 600,
    justifyContent: 'center',
    lineHeight: '28px',
    position: 'relative',
  },
  Buy: {
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(-90deg, #2b3139 50%, #181a20 0)'
        : 'linear-gradient(-90deg, #f5f5f5 50%, #fff 0)',
  },
  Sell: {
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(90deg, #2b3139 50%, #181a20 0)'
        : 'linear-gradient(90deg, #f5f5f5 50%, #fff 0)',
  },
  tabItemBuy: {},
  tabItemSell: {},
  tabItemBuyActive: {
    background: theme.palette.mode === 'dark' ? '#181a20' : '#fff',
    color: theme.palette.mode === 'dark' ? '#eaecef' : '#202630',
    '&::after': {
      background: theme.palette.mode === 'dark' ? '#181a20' : '#fff',
      borderRadius: '16px',
      bottom: 0,
      content: '" "',
      position: 'absolute',
      right: '-24px',
      top: 0,
      transform: 'skewX(15deg)',
      width: '24px',
    },
  },
  tabItemSellActive: {
    background: theme.palette.mode === 'dark' ? '#181a20' : '#ffff',
    color: theme.palette.mode === 'dark' ? '#eaecef' : '#202630',
    '&::before': {
      background: theme.palette.mode === 'dark' ? '#181a20' : '#fff',
      borderRadius: '16px',
      bottom: 0,
      content: '" "',
      position: 'absolute',
      left: '-24px',
      top: 0,
      transform: 'skewX(-15deg)',
      width: '24px',
    },
  },
  paddingLeft: {
    paddingLeft: '16px',
  },
  paddingRight: {
    paddingRight: '16px',
  },
  tabItemSell: {},
  tabItemSellNotActive: {
    background: theme.palette.mode === 'dark' ? '#2b3139' : '#f5f5f5',
    color: theme.palette.mode === 'dark' ? '#5e6673' : '#B7BDC6',
    '&::before': {
      background: theme.palette.mode === 'dark' ? '#2b3139' : '#F5F5F5',
      borderRadius: '16px',
      bottom: 0,
      content: '" "',
      left: '-24px',
      position: 'absolute',
      top: 0,
      transform: 'skewX(15deg)',
      width: '24px',
    },
  },
  tabItemBuyNotActive: {
    background: theme.palette.mode === 'dark' ? '#2b3139' : '#f5f5f5',
    color: theme.palette.mode === 'dark' ? '#5e6673' : '#B7BDC6',

    '&::after': {
      background: theme.palette.mode === 'dark' ? '#2b3139' : '#f5f5f5',
      borderRadius: '16px',
      bottom: 0,
      content: '" "',
      right: '-24px',
      position: 'absolute',
      top: 0,
      transform: 'skewX(-15deg)',
      width: '24px',
    },
  },
  margLeft: { marginLeft: '48px' },

  // tabs: {
  //   borderRadius: "0px",
  //   "& .MuiTabs-flexContainer": {
  //     borderRadius: "0px",
  //   },
  // },
  // Buytab: {
  //   flex: 1,
  //   borderTopLeftRadius: "16px",
  //   background: "grey",
  //   position: "relative",
  //   "&.Mui-selected": {
  //     border: "1px solid red !important",
  //     color: "white !important",
  //     position: "relative",
  //     zIndex: 1,
  //     "&::after": {
  //       content: '""',
  //       position: "absolute",
  //       top: "0",
  //       right: "-20px",
  //       width: "40px",
  //       height: "100%",
  //       background: "black",
  //       borderRadius: "0px 16px 16px 0px",
  //       transform: "skewX(15deg)",
  //     },
  //   },
  // },
  // Selltab: {
  //   flex: 1,
  //   borderRadius: "16px 16px 0 0",
  //   background: "grey",
  //   "&.Mui-selected": {
  //     border: "1px solid red !important",
  //     color: "black !important",
  //     position: "relative",
  //     zIndex: 1,
  //     "&::after": {
  //       content: '""',
  //       position: "absolute",
  //       top: "0",
  //       right: "-20px",
  //       width: "40px",
  //       height: "100%",
  //       background: "black",
  //       borderRadius: "16px 0px 0px 16px",
  //       transform: "skewX(15deg)",
  //     },
  //   },
  // },
}));

const BuySellTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState('0');
  const theme = useTheme();

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Box>
      <Box className={classes.card}>
        <div
          className={`${classes.tabContainer} ${
            value === '0' ? classes.Buy : classes.Sell
          }`}
        >
          <div className={`${classes.bnFlex} ${classes.tabItemContainer}`}>
            <div
              data-type="buy"
              onClick={() => handleChange('0')}
              className={`${classes.bnFlex} ${classes.tabItem} ${
                classes.tabItemBuy
              } ${
                value === '0'
                  ? classes.tabItemBuyActive
                  : classes.tabItemBuyNotActive
              }`}
            >
              <span data-type="buy" class={classes.paddingLeft}>
                Buy
              </span>
            </div>
            <div
              data-type="sell"
              onClick={() => handleChange('1')}
              class={`${classes.bnFlex} ${classes.tabItem} ${
                classes.tabItemSell
              } ${
                value === '0'
                  ? classes.tabItemSellNotActive
                  : classes.tabItemSellActive
              } ${classes.margLeft}`}
            >
              <span data-type="sell" class={classes.paddingRight}>
                Sell
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '24px',
            marginTop: '-20px',
            borderRadius: '24px',
            background: theme?.palette?.background.default,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            height: '91%',
          }}
        >
          <div>
            <CustomTextField label={'Spend'} placeholder={'Enter Amount'} />
            <CustomTextField label={'Receive'} placeholder={'0.00'} />
          </div>

          {/* <PaymentMethodSelection /> */}
          <GenericButton
            text={'Login/Signup'}
            styles={{ fontSize: '20px', fontWeight: '500', marginTop: 'auto' }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default BuySellTabs;
