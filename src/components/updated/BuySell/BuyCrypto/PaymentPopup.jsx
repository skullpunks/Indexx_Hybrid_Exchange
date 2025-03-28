import React, { useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';
import GenericButton from '../../shared/Button/index';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import transactionIcon from '../../../../assets/updated/buySell/transactionMethod.svg';
import { Box, useTheme } from '@mui/material';

import usd from '../../../../assets/token-icons/USD.png';
import creditCard from '../../../../assets/updated/popup/credit-card.svg';
import wireTransfer from '../../../../assets/updated/popup/wiretransfer.svg';
import ach from '../../../../assets/updated/popup/ach.png';
import venmo from '../../../../assets/updated/popup/venmo.svg';
import paypal from '../../../../assets/updated/popup/paypal.svg';
import zelle from '../../../../assets/updated/popup/zelle.svg';
import tygpay from '../../../../assets/updated/tyga_icon.png';
import CloseIcon from '@mui/icons-material/Close';
import {
  createBuyOrder,
  decodeJWT,
  getHoneyBeeDataByUsername,
  getUserWallets,
} from '../../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralPopup from '../Popup';
const useStyles = makeStyles((theme) => ({
  dataShow: {
    opacity: '1 !important',
    visibility: 'visible !important',
    '& .bnModalWrap': {
      transform: 'scale(1) !important',
    },
  },

  bidsFullModal: {},
  bnMask: {
    backgroundColor: ' rgba(0, 0, 0, .5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    minheight: '100vh',
  },
  bnTrans: {
    opacity: 0,
    transitionDuration: '250ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
    visibility: 'hidden',
  },
  bnModal: {
    '& .bnModalWrap': {
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#1e2329',
      borderRadius: '16px',
      boxShadow: '0px 3px 6px rgba(0,0,0,.04)',
      maxWidth: '518px',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      width: '100%',
      marginTop: '70px',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    // padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '0px',
      marginBottom: '20px',
    },
    '& h4': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      margin: '10px 0px 15px 0px',
    },
    '& p': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
    },
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    gap: '15px',
    marginTop: '25px',
    padding: '24px',
  },
  cancelButton: {
    background:
      theme.palette.mode === 'light'
        ? '#EAECEF !important'
        : '#2B3139 !important',
    color: `${theme.palette.text.primary} !important`,
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '36px 16px',
    background: 'transparent',
    marginBottom: '15px',
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843'
    }`,
    borderRadius: '8px',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      background: 'transparent',
      border: `1px solid ${theme.palette.primary.main}`,
    },
    '&:active': {
      background: 'transparent',
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  container: {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none !important', // Hide the scrollbar track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? '#5f6673 !important'
          : '#b7bdc6 !important', // Keep the same color on hover
    },
  },
  iconTextContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& img': {
      width: '50px',
    },
  },
  label: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
  },
  btnText: {
    color: theme.palette.text.primary,
    fontSize: '18px',
  },
  paymentSelectionImg: {
    width: '50px',
  },
}));

const Popup = ({
  open,
  onClose,
  amount,
  onSelectPaymentMethod,
  type,
  token,
  spendToken,
}) => {
  console.log(
    spendToken,
    '=======================spendtoken====================='
  );
  const classes = useStyles();
  const theme = useTheme();
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
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const navigate = useNavigate();
  const [usdBalance, setUsdBalance] = useState('0.00'); // State to store USD balance
  const [usersWallets, setUsersWallets] = useState([]); // Store the user wallets

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
    let basecoin = token.title;
    let quotecoin = 'USD';
    let outAmount = Math.floor(amount * 1000000) / 1000000;
    let res;
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setLoadings(false);
        setShowMessagePopup(true);
        return;
      }
      res = await createBuyOrder(
        basecoin,
        quotecoin,
        amount,
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
        amount,
        outAmount,
        paymentMethod
      );
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
      setShowMessagePopup(true);
    }
  };

  if (!open) {
    return null;
  }

  const createBuyOrderForZelleAndWire = async (paymentMethod) => {
    setLoadings(true);
    setLoadings(true);
    let basecoin = token.title;
    let quotecoin = 'USD';
    let outAmount = Math.floor(amount * 1000000) / 1000000;
    let res;
    console.log('paymentMethod', paymentMethod);
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setLoadings(false);
        setShowMessagePopup(true);
        return;
      }
      res = await createBuyOrder(
        basecoin,
        quotecoin,
        amount,
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
        amount,
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
      setShowMessagePopup(true);
      return null;
    }
  };

  const confirmPayment = async () => {
    try {
      if (paymentMethod === 'Paypal' || paymentMethod === 'Credit Card') {
        await createNewBuyOrder();
      } else if (
        paymentMethod === 'Zelle' ||
        paymentMethod === 'Wire' ||
        paymentMethod === 'Venmo'
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

  const handlePaymentMethodSelect = async (method) => {
    console.log('method', method);
    console.log(
      'amount, onSelectPaymentMethod, type, token',
      amount,
      onSelectPaymentMethod,
      type,
      token
    );
    setPaymentMethod(method);
    onSelectPaymentMethod(method);

    onClose();
  };

  return (
    <>
      <div
        className={`${open ? classes.dataShow : ''} ${classes.bnMask} ${
          classes.bnModal
        } ${classes.bidsFullModal}`}
      >
        <div className="bnModalWrap">
          <div className={classes.contentContainer}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                padding: '24px',
              }}
            >
              <div></div>
              <h3>Pay With</h3>{' '}
              <div onClick={onClose} style={{ cursor: 'pointer' }}>
                <CloseIcon
                  color={theme.palette.text.secondary}
                  sx={{
                    '&:hover': {
                      color: theme.palette.text.primary,
                    },
                  }}
                />
              </div>
            </div>
            <Box
              className={classes.container}
              style={{
                width: '100%',
                overflow: 'auto',
                height: '100%',

                padding: '24px',
              }}
            >
              {type === 'Sell' ? (
                <button
                  className={classes.button}
                  onClick={() => handlePaymentMethodSelect('Asset Wallet')}
                >
                  <Box className={classes.iconTextContainer}>
                    <img src={transactionIcon} alt="Asset Wallet" />
                    <p className={classes.btnText}>Asset Wallet</p>
                  </Box>
                  <p>
                    {amount} {spendToken?.title ?? ''}
                  </p>
                </button>
              ) : (
                <>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('USD')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={usd} alt="USD" />
                      <p className={classes.btnText}>
                        USD Balance
                        <span className={classes.usdBalanceText}>
                          (Available: ${usdBalance})
                        </span>
                      </p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('Credit Card')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={creditCard} alt="Credit Card" />
                      <p className={classes.btnText}>Credit Card</p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('Paypal')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={paypal} alt="Paypal" />
                      <p className={classes.btnText}>Paypal</p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('ACH')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={ach} alt="ACH" />
                      <p className={classes.btnText}>ACH</p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('Wire Transfer')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={wireTransfer} alt="wire transfer" />
                      <p className={classes.btnText}>Wire transfer</p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('Zelle')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={zelle} alt="Zelle" />
                      <p className={classes.btnText}>Zelle</p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('TygaPay')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={tygpay} alt="TygaPay" />
                      <p className={classes.btnText}>TygaPay</p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handlePaymentMethodSelect('Venmo')}
                  >
                    <Box className={classes.iconTextContainer}>
                      <img src={venmo} alt="Venmo" />
                      <p className={classes.btnText}>Venmo</p>
                    </Box>
                    <p>${amount}</p>
                  </button>
                </>
              )}
            </Box>
            <div className={classes.btnContainer}>
              <GenericButton text="Confirm" onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
      {showMessagePopup && (
        <GeneralPopup
          message={message}
          onClose={() => setShowMessagePopup(false)}
        />
      )}
    </>
  );
};

export default Popup;
