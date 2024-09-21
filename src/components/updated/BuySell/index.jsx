import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import IconicHeader from '../shared/IconicHeader';
import BuyCrypto from './BuyCrypto';
import CryptoCarts from './CryptoCarts';
import Conversion from './CryptoCarts/Conversions';
import HowToBuyCrypto from './HowToBuyCrypto';
import PopularConversion from './PopularConversion';
import {
  decodeJWT,
  getPaypalOrder,
  getPaypalSubscription,
  getUserDetails,
  loginWithToken,
  getOrderDetails,
} from '../../../services/api';
import Popup from './Popup';
import tokens from '../../../utils/Tokens.json';

const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1248px',
    width: '100%',
    margin: '50px auto',
    padding: '24px',
  },
}));

const BuySell = () => {
  const classes = useStyles();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let defaultToken = searchParams.get('buyToken') || 'INEX';
  const [receiveToken, setReceiveToken] = useState(defaultToken);
  const [selectedTab, setSelectedTab] = useState('Crypto');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    let newDefaultToken;
    if (path.includes('etf-tokens')) {
      setSelectedTab('ETF Tokens');
      newDefaultToken = 'ALCRYP';
    } else if (path.includes('stock-token')) {
      setSelectedTab('Stock Tokens');
      newDefaultToken = 'AMZN';
    } else {
      setSelectedTab('Tokens');
      newDefaultToken = 'INEX';
    }
    if (defaultToken !== newDefaultToken) {
      defaultToken = newDefaultToken;
      setReceiveToken(defaultToken);
    }
  }, [location.pathname]);

  useEffect(() => {
    const token = searchParams.get('token');
    const subscriptionId = searchParams.get('subscription_id');
    const type = searchParams.get('type');
    const orderId = searchParams.get('orderId');
    const redirectFlag = localStorage.getItem('redirected');

    console.log('type', type);
    if (subscriptionId) {
      getPaypalSubscription(subscriptionId).then((res) => {
        if (res.status === 200) {
          setPopupMessage('Subscription successful');
          setIsModalOpen(true);
          navigate(
            `/indexx-exchange/subscribe-success?subscription_id=${subscriptionId}`
          );
        }
      });
    } else if (token) {
      getPaypalOrder(token).then((res) => {
        if (res.status === 200) {
          let orderData = res.data.data;
          if (
            orderData?.orderType === 'Buy' ||
            orderData?.orderType === 'Sell' ||
            orderData?.orderType === 'Convert'
          ) {
            setPopupMessage(
              `${orderData?.orderType} Order processed successfully`
            );
            setIsModalOpen(true);
          } else {
            navigate(
              `/indexx-exchange/powerpack-payment-success?orderId=${orderData?.orderId}`
            );
          }
        }
      });
    } else if (type === 'tygapay') {
      let email = localStorage.getItem('email');
      console.log(email);
      getOrderDetails(email, String(orderId)).then((res) => {
        //setOrderData(order.data);
        if (res.status === 200) {
          let orderData = res.data;
          if (
            orderData?.orderType === 'Buy' ||
            orderData?.orderType === 'Sell' ||
            orderData?.orderType === 'Convert'
          ) {
            setPopupMessage(
              `${orderData?.orderType} Order processed successfully`
            );
            setIsModalOpen(true);
          }
        }
      });
    }

    if (defaultSignInToken && !redirectFlag) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    }
  }, []);

  async function checkLogin(defaultSignInToken) {
    try {
      const res = await loginWithToken(defaultSignInToken);
      console.log('I am here', res);
      console.log(res);
      if (res.status === 200) {
        let resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        window.location.reload();
        if (searchParams.get('buyToken')) {
          navigate(`/update/home?buyToken=${defaultToken}`);
        } else {
          navigate('/update/home');
        }
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleReceiveTokenChange = (token) => {
    setReceiveToken(token);
  };

  const handlePopupClose = () => {
    setIsModalOpen(false);
  };

  const handleTokenSelect = (selectedTokenValue) => {
    console.log('Selected token from crypto in BuySell :', selectedTokenValue);
    setReceiveToken(selectedTokenValue.Symbol); // You can pass the selected token to another component or update the state as needed

    // Find the selected token from the imported tokens
    const selectedToken = tokens.find(
      (token) => token.title === selectedTokenValue.Symbol
    );

    if (!selectedToken) {
      console.error('Token not found:', selectedTokenValue.Symbol);
      return;
    }

    let basePath = '/update/home';

    if (selectedToken.isStock) {
      basePath = '/update/home/stock-token';
    } else if (selectedToken.isETF) {
      basePath = '/update/home/etf-tokens';
    }

    // Construct the new URL with the buyToken parameter
    const newUrl = `${basePath}?buyToken=${selectedToken.title}`;

    navigate(newUrl);
  };

  return (
    <div className={classes.Container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <BuyCrypto
        tokenType={selectedTab}
        onReceiveTokenChange={handleReceiveTokenChange}
        defaultReceiveToken={receiveToken} // Pass the updated state
        handleTokenSelect={handleTokenSelect}
      />
      <HowToBuyCrypto tokenType={selectedTab} receiveToken={receiveToken} />
      <CryptoCarts receiveToken={receiveToken} />
      <PopularConversion receiveToken={receiveToken} />
      {isModalOpen && (
        <Popup message={popupMessage} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default BuySell;
