import React, { useEffect, useState, useCallback } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomTextField from './CustomTextField';
import GenericButton from '../../shared/Button/index';
import { useTheme } from '@mui/material/styles';
import PaymentMethodSelection from './PaymentMethodSelection';
import Popup from './PaymentPopup';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '40px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '0px 0px 30px 0px',
    borderRadius: '24px',
    width: '100%',
    overflow: 'visible',
    height: '655px',
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
  estimatedPriceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
  estimatedPrice: {
    fontSize: '15px',
  },
}));

const BuySellTabs = ({ tokenType, onReceiveTokenChange  }) => {
  const classes = useStyles();
  const [value, setValue] = useState('buy');
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [spendToken, setSpendToken] = useState({ title: 'USD', image: 'USD' });
  const [receiveToken, setReceiveToken] = useState({
    title: 'INEX',
    image: 'INEX',
  });
  const [spendAmount, setSpendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [price, setPrice] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
  }, []);

  const handleChange = (value) => {
    setValue(value);
    if (value === 'buy') {
      setSpendToken({ title: 'USD', image: 'USD' });
      setReceiveToken({ title: 'INEX', image: 'INEX' });
    } else {
      setSpendToken({ title: 'INEX', image: 'INEX' });
      setReceiveToken({ title: 'USD', image: 'USD' });
    }
    setSpendAmount('');
    setReceiveAmount('');
  };


  useEffect(() => {
    console.log('tokenType', tokenType);
  }, [tokenType]);

  const handleTokenSelect = useCallback((token, type) => {
    if (type === 'Spend') {
      setSpendToken({ title: token?.title, image: token?.image });
    } else {
      setReceiveToken({ title: token?.title, image: token?.image });
      onReceiveTokenChange(token?.title);
    }
  }, [onReceiveTokenChange]);

  const handleSpendAmountChange = (amount) => {
    setSpendAmount(amount);
    console.log("amount, price", amount, price)
    updateReceiveAmount(amount, price);
  };

  const handleReceiveAmountChange = (amount) => {
    setReceiveAmount(amount);
  };

  const handlePriceChange = (priceData) => {
    console.log('am here', priceData);
    setPrice(priceData.priceData);
    setReceiveToken(priceData.currency)
    updateReceiveAmount(spendAmount, priceData.priceData);
  };

  const updateReceiveAmount = (amount, rate) => {
    console.log('rate', rate);
    console.log('amount', amount);

    if (amount && rate) {
      const calculatedReceiveAmount =
        value === 'buy' ? amount / rate : amount * rate;
        console.log("calculatedReceiveAmount", calculatedReceiveAmount)
      setReceiveAmount(calculatedReceiveAmount.toFixed(2));
    }
  };

  const handlePaymentMethodClick = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    handlePopupClose();
  };

  return (
    <Box>
      <Box className={classes.card}>
        <div
          className={`${classes.tabContainer} ${
            value === 'buy' ? classes.Buy : classes.Sell
          }`}
        >
          <div className={`${classes.bnFlex} ${classes.tabItemContainer}`}>
            <div
              data-type="buy"
              onClick={() => handleChange('buy')}
              className={`${classes.bnFlex} ${classes.tabItem} ${
                classes.tabItemBuy
              } ${
                value === 'buy'
                  ? classes.tabItemBuyActive
                  : classes.tabItemBuyNotActive
              }`}
            >
              <span data-type="buy" className={classes.paddingLeft}>
                Buy
              </span>
            </div>
            <div
              data-type="sell"
              onClick={() => handleChange('sell')}
              className={`${classes.bnFlex} ${classes.tabItem} ${
                classes.tabItemSell
              } ${
                value === 'buy'
                  ? classes.tabItemSellNotActive
                  : classes.tabItemSellActive
              } ${classes.margLeft}`}
            >
              <span data-type="sell" className={classes.paddingRight}>
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
            <CustomTextField
              label="Spend"
              placeholder="Enter Amount"
              type={value === 'buy' ? 'buy' : 'sell'}
              onSelectToken={(token) => handleTokenSelect(token, 'Spend')}
              onAmountChange={handleSpendAmountChange}
              onReceiveAmountChange={handleReceiveAmountChange}
              onPriceChange={handlePriceChange}
              amount={spendAmount}
              receiveAmount={receiveAmount}
              tokenType={tokenType}
            />
            <CustomTextField
              label="Receive"
              placeholder="0.00"
              type={value === 'buy' ? 'buy' : 'sell'}
              onSelectToken={(token) => handleTokenSelect(token, 'Receive')}
              onAmountChange={handleReceiveAmountChange}
              onPriceChange={handlePriceChange}
              amount={receiveAmount}
              receiveAmount={receiveAmount}
              tokenType={tokenType}
            />
          </div>

          {isLoggedIn ? (
            <>
              <PaymentMethodSelection
                onClick={handlePaymentMethodClick}
                buttonText={
                  selectedPaymentMethod || 'Select Transaction Method'
                }
                type={`${value === 'buy' ? 'Buy' : 'Sell'}`}
              />
              <div className={classes.estimatedPriceContainer}>
                <Typography
                  className={classes.estimatedPrice}
                  style={{
                    color:
                      theme.palette.mode === 'dark' ? '#EAECEF' : '#1E2329',
                  }}
                >
                  Estimated Price
                </Typography>
                <Typography
                  className={classes.estimatedPrice}
                  style={{
                    color:
                      theme.palette.mode === 'dark' ? '#EAECEF' : '#1E2329',
                  }}
                >
                  ~ {price} {'USD'}
                </Typography>
              </div>
              <br />
              <GenericButton
                text={`${value === 'buy' ? 'Buy' : 'Sell'} ${
                  receiveToken?.title || ''
                }`}
                styles={{
                  fontSize: '20px',
                  fontWeight: '500',
                  marginTop: 'auto',
                }}
                onClick={handlePaymentMethodClick}
              />
            </>
          ) : (
            <GenericButton
              text="Login/Signup"
              styles={{
                fontSize: '20px',
                fontWeight: '500',
                marginTop: 'auto',
              }}
            />
          )}
        </div>
      </Box>
      <Popup
        open={popupOpen}
        onClose={handlePopupClose}
        amount={spendAmount}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        type={`${value === 'buy' ? 'Buy' : 'Sell'}`}
        token={receiveToken}
      />
    </Box>
  );
};

export default BuySellTabs;
