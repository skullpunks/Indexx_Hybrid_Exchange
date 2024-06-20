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
} from '../../../services/api';
import Popup from './Popup';

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
  const defaultToken = searchParams.get('buyToken') || 'INEX';
  const [receiveToken, setReceiveToken] = useState(defaultToken);
  const [selectedTab, setSelectedTab] = useState('Tokens');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const defaultSignInToken = searchParams.get('signInToken');

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('etf-tokens')) {
      setSelectedTab('ETF Tokens');
    } else if (path.includes('stock-token')) {
      setSelectedTab('Stock Tokens');
    } else {
      setSelectedTab('Tokens');
    }
  }, [location.pathname]);

  useEffect(() => {
    const token = searchParams.get('token');
    const subscriptionId = searchParams.get('subscription_id');

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
    }

    if (defaultSignInToken) {
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
        window.location.reload();
        if(searchParams.get('buyToken'))
        navigate(`/update/home?buyToken=${defaultToken}`);
        else 
        navigate('/update/home');
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

  const handleTokenSelect = (token) => {
    console.log('Selected token from cryto in  BuySell :', token);
    setReceiveToken(token.Symbol); // You can pass the selected token to another component or update the state as needed
  };

  return (
    <div className={classes.Container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />
      <BuyCrypto
        tokenType={selectedTab}
        onReceiveTokenChange={handleReceiveTokenChange}
        defaultReceiveToken={defaultToken}
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
