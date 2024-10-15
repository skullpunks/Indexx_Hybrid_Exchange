import React, { useEffect, useState, useCallback } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomTextField from './CustomTextField';
import GenericButton from '../../shared/Button/index';
import { useTheme } from '@mui/material/styles';
import PaymentMethodSelection from './PaymentMethodSelection';
import Popup from './PaymentPopup';
import GeneralPopup from '../Popup';

import {
  baseURL,
  confirmSellOrder,
  createBuyOrder,
  createSellOrder,
  decodeJWT,
  getHoneyBeeDataByUsername,
  getUserWallets,
} from '../../../../services/api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PaymentMethod } from '../../../AccountSettings/PaymentMethod';
import tokens from '../../../../utils/Tokens.json';
import ErrorPage from './ErrorPopup';
import exchangeLight from '../../../../assets/updated/buySell/Exchange for Light mode.svg';
import exchangeDark from '../../../../assets/updated/buySell/exchange for Dark mode.svg';
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
    marginTop: '5px',
    marginBottom: '15px',
  },
  estimatedPrice: {
    fontSize: '15px',
  },
}));

const BuySellTabs = ({
  tokenType,
  onReceiveTokenChange,
  defaultReceiveToken,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState('buy');
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spendToken, setSpendToken] = useState({ title: 'USD', image: 'USD' });
  const [receiveToken, setReceiveToken] = useState({
    title: 'INEX',
    image: 'INEX',
  });
  const [spendAmount, setSpendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [price, setPrice] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupOpen2, setPopupOpen2] = useState(false);
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
  const [defaultSelectedToken, setDefaultSelectedToken] = useState();
  const [generalMessage, setGeneralMessage] = useState('');
  const [paymentMethodError, setPaymentMethodError] = useState('');
  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const navigate = useNavigate();
  const [usdBalance, setUsdBalance] = useState('0.00'); // State to store USD balance
  const [usersWallets, setUsersWallets] = useState([]); // Store the user wallets

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const email = localStorage.getItem('email');
    const user = localStorage.getItem('user');
    console.log('!!email && !!user', !!email && !!user);
    setIsLoggedIn(!!email && !!user);
  }, []);

  console.log('defaultReceiveToken', defaultReceiveToken);
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

  const defaultTokenFromUrl = searchParams.get('buyToken');

  const handleTokenSelect = useCallback(
    (token, type) => {
      console.log('type', type);
      console.log('value', value);

      if (type === 'Spend') {
        setSpendToken({ title: token?.title, image: token?.image });
      } else if (type === 'Receive') {
        const selectedTokenTitle = defaultTokenFromUrl;
        const selectedTokenImage = defaultTokenFromUrl;
        setReceiveToken({
          title: selectedTokenTitle,
          image: selectedTokenImage,
        });
        onReceiveTokenChange(selectedTokenTitle);
        console.log('receiveToken', selectedTokenTitle);
      }
    },
    [onReceiveTokenChange, value, defaultTokenFromUrl]
  );

  useEffect(() => {
    const findToken = tokens.find((x) => x.title === defaultReceiveToken);
    console.log(findToken);
    if (findToken) {
      setDefaultSelectedToken(findToken);
    }
  }, [defaultSelectedToken, defaultReceiveToken]);

  const handleSpendAmountChange = (amount) => {
    setSpendAmount(amount);
    console.log('amount, price', amount, price);
    updateReceiveAmount(amount, price);
  };

  const handleReceiveAmountChange = (amount) => {
    setReceiveAmount(amount);
  };

  const handlePriceChange = useCallback(
    (priceData) => {
      setPrice(priceData.priceData);
      setReceiveToken({ title: priceData.currency, image: priceData.currency });
      updateReceiveAmount(spendAmount, priceData.priceData);
    },
    [spendAmount]
  );

  const updateReceiveAmount = useCallback((amount, rate) => {
    if (amount && rate) {
      const calculatedReceiveAmount =
        value === 'buy' ? amount / rate : amount * rate;
      setReceiveAmount(calculatedReceiveAmount.toFixed(2));
    }
  });

  const handlePaymentMethodClick = async () => {
    setPopupOpen(true);
  };

  const handleSubmit = async () => {
    if (spendAmount === '') {
      setOpenErrorPopup(true);
      return;
    }
    console.log('selectedPaymentMethod', value);
    console.log('selectedPaymentMethod', selectedPaymentMethod);
    if (selectedPaymentMethod && value === 'buy') {
      setPaymentMethodError('');
      await confirmPayment();
    } else if (selectedPaymentMethod && value === 'sell') {
      setPaymentMethodError('');
      const res = await createNewSellOrder();
      console.log('res', res);
    } else {
      setPaymentMethodError('Select Method*');
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

  // Fetch user wallets and USD balance
  useEffect(() => {
    const fetchUserWallets = async () => {
      const token = localStorage.getItem('access_token');
      const decodedToken = decodeJWT(String(token)); // Decode JWT

      const userWallets = await getUserWallets(decodedToken?.email);
      setUsersWallets(userWallets.data);

      // Find USD coin balance and format it
      setUsdBalance(
        formatBalance(
          userWallets.data.find((x) => x.coinSymbol === 'USD')?.coinBalance || 0
        )
      );
    };

    fetchUserWallets();
  }, []);

  // Format the balance based on its value
  const formatBalance = (balance) => {
    if (balance < 0.001) {
      return balance.toLocaleString('en-US', {
        minimumFractionDigits: 5,
        maximumFractionDigits: 6,
      });
    } else {
      return balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrder = async (paymentMethod) => {
    setLoadings(true);
    let basecoin = receiveToken.title;
    let quotecoin = 'USD';
    let outAmount = Math.floor(receiveAmount * 1000000) / 1000000;
    console.log('receiveAmount', receiveAmount);
    let res;
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Captain bee, Please apply for buy approval from honey bee");
        setGeneralMessage(
          'As Captain bee, Please apply for buy approval from honey bee'
        );
        setIsModalOpen(true);
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
      if (paymentMethod === 'Paypal' || paymentMethod === 'Credit Card') {
        setLoadings(false);
        //--Below code is to enable paypal Order---
        let payPalPaymentLink = '';
        for (let i = 0; i < res.data.links.length; i++) {
          if (res.data.links[i].rel.includes('approve')) {
            //window.location.href = res.data.links[i].href;
            payPalPaymentLink = res.data.links[i].href;
            break;
          }
        }
        navigate('/paypal-partnership-with-indexx', {
          state: { payPalPaymentLink },
        });
      } else {
        setLoadings(false);
        console.log('res.data', res.data);
        setIsModalOpen(true);
        setGeneralMessage('Order Completed');
      }
      //getStripePaymentIntent(res.data.orderId, res.data.user.email);
    } else {
      setLoadings(false);
      setIsModalOpen(true);
      setGeneralMessage(res.data);
    }
  };

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrderForTygaPay = async () => {
    setLoadings(true);
    let basecoin = receiveToken.title;
    let quotecoin = 'USD';
    let outAmount = Math.floor(receiveAmount * 1000000) / 1000000;
    console.log('receiveAmount', receiveAmount);
    let res;
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Captain bee, Please apply for buy approval from honey bee");
        setGeneralMessage(
          'As Captain bee, Please apply for buy approval from honey bee'
        );
        setIsModalOpen(true);
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
        'tygapay'
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
        'tygapay'
      );
    }
    console.log(res);
    if (res.status === 200) {
      console.log('Res', res);
      console.log('res.data.data.paymentUrl', res.data.data.paymentUrl);
      setLoadings(false);
      window.location.href = res.data.data.paymentUrl;
    } else {
      setLoadings(false);
      setIsModalOpen(true);
      setGeneralMessage(res.data);
    }
  };

  const createBuyOrderForZelleAndWire = async (paymentMethod) => {
    setLoadings(true);
    setLoadings(true);
    let basecoin = receiveToken.title;
    let quotecoin = 'USD';
    let outAmount = Math.floor(receiveAmount * 1000000) / 1000000;
    console.log('receiveAmount', receiveAmount);
    let res;
    console.log('paymentMethod', paymentMethod);
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Captain bee, Please apply for buy approval from honey bee");
        setGeneralMessage(
          'As Captain bee, Please apply for buy approval from honey bee'
        );
        setIsModalOpen(true);
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
      setLoadings(false);
      // Return the order ID for Zelle and Wire
      return res.data.orderId;
    } else {
      setLoadings(false);
      setGeneralMessage(res.data);
      setIsModalOpen(true);
      return null;
    }
  };

  const confirmPayment = async () => {
    try {
      if (paymentMethod === 'Paypal' || paymentMethod === 'Credit Card') {
        await createNewBuyOrder(paymentMethod);
      } else if (paymentMethod === 'USD') {
        // Ensure usdBalance and spendAmount are numbers by removing commas and converting them
        const usdBalanceNumber = parseFloat(usdBalance.replace(/,/g, '')); // Removes commas and converts to number
        const spendAmountNumber = parseFloat(spendAmount.replace(/,/g, '')); // Removes commas (if any) and converts to number

        if (usdBalanceNumber > 0 && usdBalanceNumber >= spendAmountNumber) {
          await createNewBuyOrder(paymentMethod);
        } else {
          console.log('Insufficient Balance');
          setGeneralMessage('Insufficient Balance');
          setIsModalOpen(true);
          return;
        }
      } else if (paymentMethod === 'TygaPay') {
        await createNewBuyOrderForTygaPay();
      } else if (
        paymentMethod === 'Zelle' ||
        paymentMethod === 'Wire' ||
        paymentMethod === 'Venmo' ||
        paymentMethod === 'ACH'
      ) {
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

  // Utility function to check if a token is an Indexx token
  const isIndexxToken = (tokenTitle) => {
    const indexxTokens = [
      'IN500',
      'INEX',
      'INEX-ETHEREUM',
      'INEX-POLYGON',
      'WIBS',
      'INXC',
      'IUSD+',
      'ALCRYP',
      'AMZN',
      'APPL',
      'BCM',
      'CRYC10',
      'EQSTK',
      'GOOGL',
      'INDXXF',
      'META',
      'MSFT',
      'NVDA',
      'PEP',
      'SNP500',
      'TSLA',
      'TOB',
    ];
    return indexxTokens.includes(tokenTitle);
  };

  const createNewSellOrder = async () => {
    setLoadings(true);
    // Check for disallowed selling of Indexx Tokens
    if (isIndexxToken(String(receiveToken?.title))) {
      //alert("Selling of Indexx tokens is not allowed.");
      setGeneralMessage('Feature of selling Indexx tokens is coming soon.');
      setIsModalOpen(true);
      setLoadings(false);
      return;
    }
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
      const result = await confirmSellOrder(
        res.data.user.email,
        res.data.orderId,
        'Completed',
        basecoin
      );
      console.log(result.data);
      setGeneralMessage(result.data.data);
      setIsModalOpen(true);
      setLoadings(false);
    } else {
      setIsModalOpen(true);
      setGeneralMessage(res.data);
      setLoadings(false);
    }
    //getStripePaymentIntent(res.data.orderId, res.data.user.email);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handlePopupCloseGenereral = () => {
    setPopupOpen2(false);
    setIsModalOpen(false);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);
    handlePopupClose();
  };

  useEffect(() => {
    if (value !== 'buy') {
      setSelectedPaymentMethod('Asset Wallet');
    } else {
      setSelectedPaymentMethod('');
    }
  }, [value]);
  const formatPrice = (price) => {
    if (price >= 1) {
      return price.toFixed(2);
    } else if (price >= 0.01) {
      return price.toFixed(4);
    } else {
      return price.toFixed(5);
    }
  };

  return (
    <Box>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>
          <img
            src={theme.palette.mode === 'dark' ? exchangeDark : exchangeLight}
          />
        </span>
        <h3 className={classes.heading} style={{ marginBottom: '0px' }}>
          {' '}
          Exchange
        </h3>
      </div>
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
            {value === 'buy' && (
              <>
                <CustomTextField
                  label="Spend"
                  placeholder="Enter Amount"
                  type="buy"
                  onSelectToken={(token) => handleTokenSelect(token, 'Spend')}
                  onAmountChange={handleSpendAmountChange}
                  onReceiveAmountChange={handleReceiveAmountChange}
                  onPriceChange={handlePriceChange}
                  amount={spendAmount}
                  receiveAmount={receiveAmount}
                  tokenType={tokenType}
                  disableDropdown={value === 'buy'}
                  fixedToken={
                    value === 'buy' ? { title: 'USD', image: 'USD' } : null
                  }
                  defaultReceiveToken={defaultSelectedToken}
                />
                <CustomTextField
                  label="Receive"
                  placeholder="0.00"
                  type="buy"
                  onSelectToken={(token) => handleTokenSelect(token, 'Receive')}
                  onAmountChange={handleReceiveAmountChange}
                  onPriceChange={handlePriceChange}
                  amount={receiveAmount}
                  receiveAmount={receiveAmount}
                  tokenType={tokenType}
                  disableDropdown={value === 'sell'}
                  fixedToken={
                    value === 'sell' ? { title: 'USD', image: 'USD' } : null
                  }
                  loggedIn={isLoggedIn}
                  defaultReceiveToken={defaultSelectedToken}
                />
              </>
            )}
            {value === 'sell' && (
              <>
                <CustomTextField
                  label="Spend"
                  placeholder="Enter Amount"
                  type="sell"
                  onSelectToken={(token) =>
                    setSpendToken({ title: token?.title, image: token?.image })
                  }
                  onAmountChange={handleSpendAmountChange}
                  onReceiveAmountChange={handleReceiveAmountChange}
                  onPriceChange={handlePriceChange}
                  amount={spendAmount}
                  receiveAmount={receiveAmount}
                  tokenType={tokenType}
                  disableDropdown={false}
                  loggedIn
                  defaultReceiveToken={defaultSelectedToken}
                />
                <CustomTextField
                  label="Receive"
                  placeholder="0.00"
                  type="sell"
                  onSelectToken={(token) => {}}
                  onAmountChange={handleReceiveAmountChange}
                  onPriceChange={handlePriceChange}
                  amount={receiveAmount}
                  receiveAmount={receiveAmount}
                  tokenType={tokenType}
                  disableDropdown={true}
                  fixedToken={{ title: 'USD', image: 'USD' }}
                  defaultReceiveToken={defaultSelectedToken}
                />
              </>
            )}
          </div>

          {isLoggedIn ? (
            <>
              <PaymentMethodSelection
                onClick={handlePaymentMethodClick}
                errorMsg={paymentMethodError}
                buttonText={
                  selectedPaymentMethod || 'Select Transaction Method'
                }
                type={`${value === 'buy' ? 'Buy' : 'Sell'}`}
                spendToken={spendToken}
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
                  ~ {formatPrice(price)} {'USD'}
                </Typography>
              </div>

              <GenericButton
                text={`${value === 'buy' ? 'Buy' : 'Sell'} ${
                  defaultTokenFromUrl || ''
                }`}
                styles={{
                  fontSize: '20px',
                  fontWeight: '500',
                  marginTop: 'auto',
                }}
                onClick={handleSubmit}
                // disabled={spendAmount === '' || loadings}
                loading={loadings}
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
                onClick={() => {
                  window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
                }}
                styles={{
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              />
            </div>
          )}
        </div>
      </Box>
      {isModalOpen && (
        <GeneralPopup
          message={generalMessage}
          onClose={handlePopupCloseGenereral}
        />
      )}
      <Popup
        open={popupOpen}
        onClose={handlePopupClose}
        amount={spendAmount}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        type={`${value === 'buy' ? 'Buy' : 'Sell'}`}
        token={receiveToken}
        spendToken={spendToken}
      />
      {openErrorPopup && <ErrorPage onClose={() => setOpenErrorPopup(false)} />}
    </Box>
  );
};

export default BuySellTabs;
