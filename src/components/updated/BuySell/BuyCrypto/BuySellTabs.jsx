import React, { useEffect, useState, useCallback } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomTextField from './CustomTextField';
import GenericButton from '../../shared/Button/index';
import { useTheme } from '@mui/material/styles';
import PaymentMethodSelection from './PaymentMethodSelection';
import Popup from './PaymentPopup';
import {
  confirmSellOrder,
  createBuyOrder,
  createSellOrder,
  getHoneyBeeDataByUsername,
} from '../../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '40px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '0px 0px 30px 0px',
    borderRadius: '24px',
    width: '100%',
    overflow: 'visible',
    minHeight: '585px',
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
    marginTop: '4px',
  },
  estimatedPrice: {
    fontSize: '15px',
  },
}));

const BuySellTabs = ({ tokenType, onReceiveTokenChange }) => {
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
  const [paymentMethod, setPaymentMethod] = useState('');
  const { id } = useParams();
  const [honeyBeeId, setHoneyBeeId] = useState('');
  const [userData, setUserData] = useState();
  const [honeyBeeEmail, setHoneyBeeEmail] = useState('');
  const [adminFee, setAdminFees] = useState('');
  const [totalAmountToPay, setTotalAmountToPay] = useState(0);
  const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [rateData, setRateData] = useState();
  const [taskCenterDetails, setTaskCenterDetails] = useState();
  const [permissionData, setPermissionData] = useState();
  const [loadings, setLoadings] = useState(false);
  const [message, setMessage] = useState();
  const navigate = useNavigate();

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

  const handleTokenSelect = useCallback(
    (token, type) => {
      if (type === 'Spend') {
        setSpendToken({ title: token?.title, image: token?.image });
      } else {
        setReceiveToken({ title: token?.title, image: token?.image });
        onReceiveTokenChange(token?.title);
      }
    },
    [onReceiveTokenChange]
  );

  const handleSpendAmountChange = (amount) => {
    setSpendAmount(amount);
    console.log('amount, price', amount, price);
    updateReceiveAmount(amount, price);
  };

  const handleReceiveAmountChange = (amount) => {
    setReceiveAmount(amount);
  };

  const handlePriceChange = (priceData) => {
    console.log('am here', priceData);
    setPrice(priceData.priceData);
    setReceiveToken({ title: priceData.currency, image: priceData.currency });
    updateReceiveAmount(spendAmount, priceData.priceData);
  };

  const updateReceiveAmount = (amount, rate) => {
    console.log('rate', rate);
    console.log('amount', amount);

    if (amount && rate) {
      const calculatedReceiveAmount =
        value === 'buy' ? amount / rate : amount * rate;
      console.log('calculatedReceiveAmount', calculatedReceiveAmount);
      setReceiveAmount(calculatedReceiveAmount.toFixed(2));
    }
  };

  const handlePaymentMethodClick = async () => {
    if (selectedPaymentMethod && value === 'buy') {
      await confirmPayment();
    } else if (selectedPaymentMethod && value === 'sell') {
    } else {
      setPopupOpen(true);
    }
  };

  useEffect(() => {
    if (id) {
      setHoneyBeeId(String(id));
      getHoneyBeeDataByUsername(String(id)).then((data) => {
        setUserData(data.data);

        setHoneyBeeEmail(data.data.userFullData?.email);
        let captainbeePermissions =
          data.data.referredUserData?.data.relationships;

        let c = captainbeePermissions.find(
          (x) => x.honeybeeEmail === data.data.userFullData?.email
        );

        setPermissionData(c);
      });
    }
  }, []);

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrder = async () => {
    setLoadings(true);
    let basecoin = receiveToken.title;
    let quotecoin = 'USD';
    let outAmount = Math.floor(spendAmount * 1000000) / 1000000;
    let res;
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Captain bee, Please apply for buy approval from honey bee");
        setMessage(
          'As Captain bee, Please apply for buy approval from honey bee'
        );
        setLoadings(false);
        return;
      }
      res = await createBuyOrder(
        basecoin,
        quotecoin,
        spendAmount,
        outAmount,
        0,
        honeyBeeEmail,
        true
      );
    } else {
      res = await createBuyOrder(basecoin, quotecoin, spendAmount, outAmount);
    }
    if (res.status === 200) {
      setLoadings(false);
      //--Below code is to enable paypal Order---

      for (let i = 0; i < res.data.links.length; i++) {
        if (res.data.links[i].rel.includes('approve')) {
          window.location.href = res.data.links[i].href;
        }
      }
      //getStripePaymentIntent(res.data.orderId, res.data.user.email);
    } else {
      setLoadings(false);
      setMessage(res.data);
    }
  };

  const createBuyOrderForZelleAndWire = async (paymentMethod) => {
    setLoadings(true);
    setLoadings(true);
    let basecoin = receiveToken.title;
    let quotecoin = 'USD';
    let outAmount = Math.floor(spendAmount * 1000000) / 1000000;
    let res;
    console.log('paymentMethod', paymentMethod);
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Captain bee, Please apply for buy approval from honey bee");
        setMessage(
          'As Captain bee, Please apply for buy approval from honey bee'
        );
        setLoadings(false);
        return;
      }
      res = await createBuyOrder(
        basecoin,
        quotecoin,
        spendAmount,
        outAmount,
        0,
        honeyBeeEmail,
        true,
        paymentMethod
      );
    } else {
      res = await createBuyOrder(
        basecoin,
        quotecoin,
        spendAmount,
        outAmount,
        0,
        '',
        false,
        paymentMethod
      );
    }
    if (res.status === 200) {
      // Return the order ID for Zelle and Wire
      return res.data.orderId;
    } else {
      setLoadings(false);
      setMessage(res.data);
      return null;
    }
  };

  const confirmPayment = async () => {
    try {
      if (paymentMethod === 'Paypal' || paymentMethod === 'Credit Card') {
        await createNewBuyOrder();
      } else if (paymentMethod === 'Zelle' || paymentMethod === 'Wire') {
        const orderId = await createBuyOrderForZelleAndWire(paymentMethod);
        if (orderId) {
          let selectedMethod = String(paymentMethod).toLowerCase();
          navigate(
            `/indexx-exchange/payment-${selectedMethod}?orderId=${orderId}`
          );
        }
      }
    } catch (err) {
      console.log('Err', err);
    }
  };

  const createNewSellOrder = async () => {
    setLoadings(true);
    let basecoin = receiveToken.title;
    let quotecoin = 'USD';
    let amount = Number(spendAmount);
    let res;
    if (id) {
      if (!permissionData?.permissions?.sell) {
        setLoadings(false);
        return;
      }
      res = await createSellOrder(
        basecoin,
        quotecoin,
        amount,
        totalAmountToPay,
        0,
        honeyBeeEmail,
        true
      );
    } else {
      res = await createSellOrder(
        basecoin,
        quotecoin,
        amount,
        totalAmountToPay
      );
    }

    if (res.status === 200) {
      await confirmSellOrder(
        res.data.user.email,
        res.data.orderId,
        'Completed',
        basecoin
      );
    } else {
      setLoadings(false);
    }
    //getStripePaymentIntent(res.data.orderId, res.data.user.email);
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
              loggedIn={isLoggedIn}
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
                disabled={spendAmount === '' ? true : false}
              />
            </>
          ) : (
            <div
              style={{
                height: '100%',
                flex: 1,
                alignItems: 'flex-end',
                marginTop: '130px', // Align the button at the end of the container
              }}
            >
              <GenericButton
                text="Login/Signup"
                onClick={() => navigate(`/auth/login`)}
                styles={{
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              />
            </div>
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
