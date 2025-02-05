import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import GenericButton from '../shared/Button';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
} from '@mui/material';

import coinImg from '../../../assets/updated/smartCrypto/coinimg.png';
import InputField from '../shared/TextField';
import CustomSelectBox from './CustomSelectBox';
import { NewMultiSelect } from './MultiSelect';
import DeleteIcon from '@mui/icons-material/Delete';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  createBuyOrderForSmartCrypto,
  decodeJWT,
  getUserWallets,
  insertNewSmartCryptoPlan,
  validateUserEmail,
} from '../../../services/api';
import GeneralPopup from '../BuySell/Popup';

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
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, .6)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1200,
    width: '100%',
    height: '100vh',
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
      boxShadow: '0px 3px 6px rgba(0,0,0,.1)',
      overflow: 'hidden',
      position: 'relative',
      transform: 'scale(.9)',
      transitionDuration: '250ms',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease-in-out',
      maxWidth: '660px',
      width: '100%',
      padding: '10px',
      marginTop: '20px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '100px',
        height: '100vh',
      },
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    textAlign: 'center',
    color: `${theme.palette.text.primary} !important`,
    '& h3': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      marginTop: '10px',
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
  },
  greyButton: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? `rgb(71, 77, 87) !important`
        : `${theme.palette.divider} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
  yellowButton: {
    backgroundColor: `#FEBA00 !important`,
    color: `#000 !important`,
  },
  blueButton: {
    backgroundColor: `#07A6FC !important`,
    color: `#000 !important`,
  },
  selectTypeContainer: {
    marginBottom: '20px',
    width: '100%',
    '& label': {
      width: '100%',
      fontSize: '12px',
      marginBottom: '10px',
      textAlign: 'left',
    },
  },
  enterAmountContainer: {
    marginBottom: '20px',
    marginTop: '10px',
    '& label': {
      textAlign: 'left',
      fontSize: '12px',
      width: '100%',
      marginBottom: '10px',
    },
  },
  coinAllocationRoot: {
    width: '100%',
    '& label': {
      width: '100%',
      fontSize: '12px ',
      textAlign: 'left',
      marginBottom: '10px',
    },
  },
  inputContainer: {
    marginTop: '-5px',
    marginBottom: '20px',
    maxHeight: '220px',
    overflow: 'auto',
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
  coinAllocationInput: {
    textAlign: 'right',
    '& .MuiInputBase-input ': {
      textAlign: 'right',
    },
  },
  selectCoinAndAllocationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const CreateOwnPlan = ({ onClose, category, filteredTokens }) => {
  const theme = useTheme();
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [error, setError] = useState('');
  const [usdAmountError, setUsdAmountError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [email, setEmail] = useState('');
  const [usdAmount, setUsdAmount] = useState();
  const [planName, setPlanName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [usdBalance, setUsdBalance] = useState('0.00'); // State to store USD balance
  const [usersWallets, setUsersWallets] = useState([]); // Store the user wallets
  const [planManagedBy, setPlanManagedBy] = useState('');
  const [permissionData, setPermissionData] = useState();
  const [generalMessage, setGeneralMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [paymentMethodError, setPaymentMethodError] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    setEmail(email);
    let planManagedBy = email;
    setPlanManagedBy(planManagedBy);
    const user = localStorage.getItem('user');
    console.log('!!email && !!user', !!email && !!user);
    setIsLoggedIn(!!email && !!user);
    setPlanName('');
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

  const handleTokenChange = (newValues) => {
    console.log('Raw New Values:', newValues);

    // Flatten and deduplicate the token array
    const updatedTokens = Array.isArray(newValues)
      ? newValues.flat().filter((value, index, self) => {
          return (
            value && self.findIndex((v) => v.name === value.name) === index // Ensure uniqueness
          );
        })
      : [];

    console.log('Updated Coins:', updatedTokens);

    // Calculate equal percentages
    const equalPercentage = updatedTokens.length
      ? Math.floor(100 / updatedTokens.length)
      : 0;

    const updatedWithPercentages = updatedTokens.map((coin) => ({
      ...coin,
      percentage: equalPercentage,
    }));

    setSelectedCoins(updatedWithPercentages);
    setError(''); // Clear any existing error
  };

  const handlePercentageChange = (index, newPercentage) => {
    const updatedCoins = [...selectedCoins];
    updatedCoins[index].percentage = parseFloat(newPercentage) || 0; // Ensure it's a valid number
    setSelectedCoins(updatedCoins);

    // Validate the total percentage
    const totalPercentage = updatedCoins.reduce(
      (sum, coin) => sum + coin.percentage,
      0
    );

    if (totalPercentage > 100) {
      setError(
        `The sum of allocation is ${totalPercentage}%, must add up to 100%`
      );
    } else {
      setError(''); // Clear the error if the total is valid
    }
  };

  const handleRemoveCoin = (index) => {
    const updatedCoins = selectedCoins.filter((_, i) => i !== index);
    setSelectedCoins(updatedCoins);

    // Recalculate percentages if coins are removed
    if (updatedCoins.length > 0) {
      const equalPercentage = Math.floor(100 / updatedCoins.length);
      const recalculatedCoins = updatedCoins.map((coin) => ({
        ...coin,
        percentage: equalPercentage,
      }));
      setSelectedCoins(recalculatedCoins);
    }
  };

  const getImage = (image) => {
    try {
      if (image === 'INEX') {
        return Inex;
      } else {
        return require(`../../../assets/token-icons/${image}.png`).default;
      }
    } catch (error) {
      return Inex;
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Reset and validate amount dynamically
    if (isNaN(value) || value < 500) {
      setUsdAmountError(true); // Set error for invalid or less than $500
    } else {
      setUsdAmountError(false); // Clear error if valid
    }

    setUsdAmount(value); // Update state regardless
  };

  const handleSubmit = async () => {
    setLoadings(true);
    let hasError = false;

    // Validate amount (minimum is 500 USD)
    if (!usdAmount || isNaN(usdAmount) || usdAmount < 500) {
      setUsdAmountError(true);
      hasError = true;
    }

    // Validate payment method
    if (!paymentMethod) {
      setPaymentMethodError(true);
      hasError = true;
    }

    // Transform selectedCoins to match the expected structure
    const cryptocurrencies = selectedCoins.map((coin) => ({
      token: coin.name,
      percentage: coin.percentage,
      name: coin.fullName,
    }));

    try {
      let newPlanName = planName + ' Smart Crypto Ripple';
      setPlanName(newPlanName);
      let createPlan = await insertNewSmartCryptoPlan(
        newPlanName,
        email,
        usdAmount,
        cryptocurrencies,
        new Date().toISOString(),
        '',
        'Smart Crypto Ripple',
        'Ripple',
        email
      );
      console.log(createPlan);
      setLoadings(false);
    } catch (error) {
      console.error('Error creating plan:', error);
      setLoadings(false);
    }

    // Stop if there are errors
    if (hasError) return;

    if (paymentMethod) {
      setPaymentMethod('');
      await confirmPayment();
    } else {
      setPaymentMethod('Select Method*');
    }
  };

  const confirmPayment = async () => {
    try {
      if (paymentMethod === 'Paypal' || paymentMethod === 'Credit Card') {
        await createNewBuyOrder(paymentMethod);
      } else if (paymentMethod === 'USD') {
        // Ensure usdBalance and spendAmount are numbers by removing commas and converting them
        const usdBalanceNumber = parseFloat(usdBalance.replace(/,/g, '')); // Removes commas and converts to number
        const spendAmountNumber = parseFloat(usdAmount.replace(/,/g, '')); // Removes commas (if any) and converts to number

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
        paymentMethod === 'Wire Transfer' ||
        paymentMethod === 'Venmo' ||
        paymentMethod === 'ACH'
      ) {
        const orderId = await createBuyOrderForZelleAndWire(paymentMethod);
        if (orderId) {
          let selectedMethod =
            paymentMethod === 'Wire Transfer'
              ? 'wire'
              : paymentMethod === 'ACH'
              ? 'ACH'
              : String(paymentMethod).toLowerCase();
          navigate(
            `/indexx-exchange/payment-${selectedMethod}?orderId=${orderId}`
          );
        }
      }
    } catch (err) {
      console.log('Err', err);
      setLoadings(false);
    }
  };

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrder = async (paymentMethod) => {
    setLoadings(true);
    let res;
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setGeneralMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setIsModalOpen(true);
        setLoadings(false);
        return;
      }
      console.log('planName', planName);
      res = await createBuyOrderForSmartCrypto(
        planName + ' Smart Crypto Ripple',
        planManagedBy,
        usdAmount,
        0,
        email,
        true,
        paymentMethod
      );
    } else {
      console.log('planName', planName);
      res = await createBuyOrderForSmartCrypto(
        planName + ' Smart Crypto Ripple',
        planManagedBy,
        usdAmount,
        0,
        email,
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

  const createBuyOrderForZelleAndWire = async (paymentMethod) => {
    setLoadings(true);
    setLoadings(true);
    let res;
    console.log('paymentMethod', paymentMethod);
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setGeneralMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setIsModalOpen(true);
        setLoadings(false);
        return;
      }
      res = await createBuyOrderForSmartCrypto(
        planName + ' Smart Crypto Ripple',
        planManagedBy,
        usdAmount,
        0,
        email,
        true,
        paymentMethod
      );
    } else {
      res = await createBuyOrderForSmartCrypto(
        planName + ' Smart Crypto Ripple',
        planManagedBy,
        usdAmount,
        0,
        email,
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

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrderForTygaPay = async () => {
    setLoadings(true);
    let res;
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setGeneralMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setIsModalOpen(true);
        setLoadings(false);
        return;
      }
      res = await createBuyOrderForSmartCrypto(
        planName + ' Smart Crypto Ripple',
        planManagedBy,
        usdAmount,
        0,
        email,
        true,
        'tygapay'
      );
    } else {
      res = await createBuyOrderForSmartCrypto(
        planName + ' Smart Crypto Ripple',
        planManagedBy,
        usdAmount,
        0,
        email,
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

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  const classes = useStyles();
  return (
    <div
      className={`${classes.bnTrans} ${classes.dataShow} ${classes.bnMask} ${classes.bnModal}  ${classes.bidsFullModal}`}
    >
      <div className="bnModalWrap">
        <div className={classes.contentContainer}>
          {/* <img src={passwordChanged} height="100px" /> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: '600' }}>
              Create your plan
            </div>

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
          <div style={{ width: '100%' }}>
            <div className={classes.enterAmountContainer}>
              <label>Plan's Name</label>

              <InputField
                placeholder={'Create a plan name here'}
                type="text"
                value={planName}
                onChange={(e) => {
                  setPlanName(e.target.value);
                }}
                yellowBorders={category !== 'x-Blue'}
                blueBorders={category === 'x-Blue'}
                style={{ marginTop: '0px' }}
              />
            </div>
            <div className={classes.coinAllocationRoot}>
              <div className={classes.selectCoinAndAllocationContainer}>
                <label>
                  {' '}
                  Coin Allocation (
                  {selectedCoins?.reduce(
                    (sum, coin) => sum + coin.percentage,
                    0
                  )}
                  % / 100%)
                </label>
                <NewMultiSelect
                  allTokens={filteredTokens}
                  onChange={handleTokenChange}
                  selectedTokens={selectedCoins}
                />
              </div>
              <div className={classes.inputContainer}>
                {selectedCoins.map((coin, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      margin: '10px 0px',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <InputField
                        type="text"
                        value={coin.percentage}
                        onChange={(e) =>
                          handlePercentageChange(index, e.target.value)
                        }
                        yellowBorders={category !== 'x-Blue'}
                        blueBorders={category === 'x-Blue'}
                        className={classes.coinAllocationInput}
                        style={{ marginTop: '0px' }}
                        startAdornment={
                          <InputAdornment position="start">
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '10px',
                              }}
                            >
                              <img
                                src={getImage(coin.name)}
                                alt={coin.name}
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  marginRight: 8,
                                }}
                              />
                              <span>{coin.name}</span>
                            </div>
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">%</InputAdornment>
                        }
                        fullWidth
                      />
                    </div>

                    <IconButton
                      aria-label="delete"
                      sx={{
                        width: 'auto',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '5px',
                        padding: '0px 20px',
                        height: '50px',
                      }}
                      onClick={() => handleRemoveCoin(index)}
                    >
                      -
                    </IconButton>
                  </Box>
                ))}
              </div>
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <div className={classes.enterAmountContainer}>
              <label>Amount Per Period</label>
              <InputField
                placeholder={'The minimum amount is 500 USD'}
                type="text"
                style={{ marginTop: '0px', marginBottom: '10px' }}
                value={usdAmount}
                onChange={handleAmountChange}
                error={usdAmountError} // Highlight error
                helperText={
                  usdAmountError &&
                  'Please enter a valid amount of at least 500 USD'
                }
                yellowBorders={category !== 'x-Blue'}
                blueBorders={category === 'x-Blue'}
                endAdornment={
                  <InputAdornment position="end">USD</InputAdornment>
                }
              />
            </div>
          </div>
          <div className={classes.selectTypeContainer}>
            <label>Select Payment Option</label>
            <CustomSelectBox
              items={[
                { name: 'Credit Card', value: 'Credit Card' },
                { name: 'Paypal', value: 'Paypal' },
                { name: 'ACH', value: 'ACH' },
                { name: 'Wire transfer', value: 'Wire transfer' },
                { name: 'Zelle', value: 'Zelle' },
                { name: 'TygoPay', value: 'TygoPay' },
              ]}
              value={paymentMethod}
              onChange={handleChange}
              hasborder
            />
          </div>

          <div className={classes.btnContainer}>
            <GenericButton
              className={classes.greyButton}
              text="Cancel"
              onClick={onClose}
            />

            <GenericButton
              text="Create a plan"
              className={
                category === 'x-Blue'
                  ? classes.blueButton
                  : classes.yellowButton
              }
              onClick={handleSubmit}
              disabled={!usdAmount || usdAmount < 500 || !paymentMethod} // Disable if invalid
              loading={loadings}
            />
          </div>
        </div>
      </div>
      {showPopup && (
        <GeneralPopup
          message={popupMessage}
          onClose={handlePopupClose}
          width={popupMessage.length > 100 ? '600px' : '360px'}
        />
      )}
    </div>
  );
};

export default CreateOwnPlan;
