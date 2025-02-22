import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

import { Link, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../shared/TextField';
import GenericButton from '../shared/Button';
import CustomTextField from './CustomTextField';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import IconicHeaders from './IconicHeader';
import CoinsPopup from './CoinsPopup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  confirmConvertOrder,
  createConvertOrder,
  decodeJWT,
  getAppSettings,
  getCaptainBeeByEmail,
  getCoinPriceByName,
  getUserWallets,
  loginWithToken,
  validateUserEmail,
} from '../../../services/api';
import ConversionPreviewModal from './ConversionPreviewModal';
import OpenNotification from '../../OpenNotification/OpenNotification';
import Inex from '../../../assets/updated/buySell/INEX.svg'; // Default image
import PreviewConversionpopup from './PreviewConversionpopup';
import SuccessPopup from './SuccessfulConvertPopup';
import GeneralPopup from '../BuySell/Popup';
import IconicHeader from '../shared/IconicHeader';

const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1400px',
    margin: '80px auto',
    padding: '10px 20px',
  },
  header: {
    height: '80px',
    padding: '0px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      padding: '0px 0px',
    },
  },
  heading: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.text.primary,
    textAlign: 'left',
    background: 'none',
  },
  link: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '28px',
    color: `${theme.palette.text.secondary} !important`,
    '&:hover': {
      color: `${theme.palette.text.primary} !important`,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  contentContent: {
    display: 'flex',
    justifyContent: 'center',
  },

  rightContainer: {},
  rightContentContainer: {
    maxWidth: '584px',
    width: '100%',
    '& h3': {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      color: `${theme.palette.text.primary} !important`,
      [theme.breakpoints.down('sm')]: {
        fontSize: '26px',
      },
    },
    '& h4': {
      color: `${theme.palette.text.secondary} !important`,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      marginBottom: '50px',
    },
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
  mainHeading: {
    fontSize: '20px',
    fontWeight: '600px',
    color: theme.palette.text.primary,
  },
  swapIconHover: {
    transition: 'all .2s linear',
    '&:hover': {
      transition: 'all .2s linear',

      transform: 'scale(1.2)',
    },
  },
}));

const ConvertCrypto = () => {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const [fromToken, setFromToken] = useState({ title: 'INEX', image: 'INEX' }); // Default to INEX
  const [toToken, setToToken] = useState({ title: 'IUSD+', image: 'IUSD+' });
  const [fromBalance, setFromBalance] = useState();
  const [toBalance, setToBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCoinsDropdown, setShowCoinsDropdown] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState(''); // To amount
  const [amount, setAmount] = useState(''); // From amount
  const [usersWallets, setUsersWallets] = useState([]);
  const [activeTokenType, setActiveTokenType] = useState(null);
  const [rateData1, setRateData1] = useState(0); // Rate for "From" token
  const [rateData2, setRateData2] = useState(0); // Rate for "To" token
  const [finalRate, setFinalRate] = useState(0); // Final rate between "From" and "To"
  const [adminFee, setAdminFee] = useState(0); // Admin fee (if applicable)
  const [loadingRate, setLoadingRate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // Global loading state if needed
  const [fromTokenImage, setFromTokenImage] = useState(Inex); // Default image
  const [toTokenImage, setToTokenImage] = useState(Inex); // Default image
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Convert');
  const defaultSignInToken = searchParams.get('signInToken');

  let appSettingArr = [];

  // Utility function to check if a token is an Indexx token
  const isIndexxToken = (tokenTitle) => {
    const indexxTokens = [
      'IN500',
      'INEX',
      'INXC',
      'IUSD+',
      'ALCRYP',
      'AMZN',
      'APPL',
      'WIBS',
      'BCM',
      'CRYC10',
      'EQSTK',
      'GOOGL',
      'INDXXF',
      'META',
      'DaCrazy',
      'MSFT',
      'NVDA',
      'PEP',
      'SNP500',
      'TSLA',
      'TOB',
    ];
    return indexxTokens.includes(tokenTitle);
  };

  const createProcessOrder = async () => {
    setLoading(true); // Set loading true when API call starts
    try {
      const basecoin = fromToken.title;
      const quotecoin = toToken.title;
      const userEmail = localStorage.getItem('user');
      // Check for disallowed selling of Indexx Tokens
      if (
        isIndexxToken(String(basecoin)) &&
        !isIndexxToken(String(quotecoin)) &&
        userEmail !== 'chrishumpherys@yahoo.com'
      ) {
        //alert("Selling of Indexx tokens is not allowed.");
        OpenNotification(
          'error',
          'Feature of Converting Indexx tokens is coming soon.'
        );
        return;
      }

      let res = await createConvertOrder(
        basecoin,
        quotecoin,
        Number(amount),
        receiveAmount
      );

      if (res.status === 200) {
        await processConvertOrder(res.data); // Process the order
        setLoading(false); // Stop loading
        setOpenModal(false); // Close the modal
        setOpenSuccessPopup(true);
      } else {
        throw new Error(
          'Failed to Process Convert Order. Please check balance on the wallet'
        );
      }
    } catch (error) {
      setLoading(false); // Stop loading
      OpenNotification(
        'error',
        error.message || 'Failed to process conversion'
      );
    }
  };

  const processConvertOrder = async (order) => {
    const res = await confirmConvertOrder(order.user.email, order.orderId);

    if (res.status === 200) {
      setLoading(false);
      setOpenSuccessPopup(true);
      setLoading(false);
      // After successful conversion, re-fetch user wallet balances and conversion rates
      await fetchUserWallets(); // Fetch updated wallet balances
      await fetchConversionRate(); // Fetch updated conversion rates
    }
  };

  const fetchUserWallets = async () => {
    const token = localStorage.getItem('access_token');
    const decodedToken = decodeJWT(String(token)); // Decode JWT

    try {
      const userWallets = await getUserWallets(decodedToken?.email);
      setUsersWallets(userWallets.data);

      // Function to filter out invalid balances based on notes
      const filterValidBalance = (wallets, token) => {
        return wallets
          .filter((wallet) => {
            const note = wallet.notes ? wallet.notes.toLowerCase() : '';
            return (
              wallet.coinSymbol === token &&
              (!wallet.notes ||
                note.includes('gift card') ||
                note.includes('received from'))
            );
          })
          .reduce((sum, wallet) => sum + wallet.coinBalance, 0);
      };

      // Update from and to balances after filtering
      setFromBalance(
        formatBalance(filterValidBalance(userWallets.data, fromToken.title))
      );
      setToBalance(
        formatBalance(filterValidBalance(userWallets.data, toToken.title))
      );
    } catch (error) {
      console.error('Error fetching user wallets:', error);
    }
  };

  // Fetch prices and calculate conversion rate
  const fetchConversionRate = async () => {
    setLoadingRate(true);
    try {
      const fromTokenPrice = await getCoinPriceByName(fromToken.title);
      const toTokenPrice = await getCoinPriceByName(toToken.title);
      setRateData1(fromTokenPrice.data.results.data);
      setRateData2(toTokenPrice.data.results.data);
      const rate =
        fromTokenPrice.data.results.data / toTokenPrice.data.results.data;
      setFinalRate(rate);
      // Recalculate the amounts based on the new rates
      if (amount) {
        const calculatedToAmount = (amount * rate).toFixed(8);
        setReceiveAmount(
          (calculatedToAmount * (1 - Number(adminFee) / 100)).toFixed(8)
        );
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setLoadingRate(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(0.0001, 'Amount must be greater than 0')
      .required('Amount is required'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Submit form
      console.log('Form submitted with values:', values);
    },
  });

  // Handle token selection from popup
  const handleTokenSelection = (token) => {
    if (activeTokenType === 'from') {
      handleFromTokenChange(token);
    } else if (activeTokenType === 'to') {
      handleToTokenChange(token);
    }
    setShowCoinsDropdown(false); // Close the dropdown after selecting the token
  };

  // Function to format the balance based on its value
  const formatBalance = (balance) => {
    if (!balance) return '0.00';
    if (balance < 0.0001) {
      // Format to 5 or 6 decimal places if balance is less than 0.001
      return balance.toLocaleString('en-US', {
        minimumFractionDigits: 5,
        maximumFractionDigits: 6,
      });
    } else {
      // Otherwise, format to 2 decimal places
      return balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };

  useEffect(() => {
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
        console.log(res.data.access_token, 'res.data.access_token');
        let resObj = await decodeJWT(res.data.access_token);
        localStorage.setItem('email', resObj?.email);
        localStorage.setItem('user', resObj?.email);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        if (resObj?.userType === 'CaptainBee') {
          let resObj2 = await getCaptainBeeByEmail(String(resObj?.email));
          console.log(resObj2);
          let username = resObj2?.data.Username;
          localStorage.setItem('username', username);
        }
        searchParams.delete('signInToken');
        setSearchParams(searchParams);
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  // Fetch user wallets to set balances
  useEffect(() => {
    fetchUserWallets();
    getAllSetting();
  }, [fromToken, toToken]);

  const getAllSetting = async () => {
    const res = await getAppSettings();
    appSettingArr = res.data;
    console.log('fromToken', fromToken.title);
    if (
      fromToken.title === 'INEX' ||
      fromToken.title === 'IUSD+' ||
      fromToken.title === 'IN500' ||
      fromToken.title === 'INXC' ||
      fromToken.title === 'WIBS' ||
      fromToken.title === 'DaCrazy'
    ) {
      let adminFees = appSettingArr.find(
        (item) => item.key === 'IndexxTokensAdminFees'
      );
      setAdminFee(adminFees.value);
      console.log(adminFees.value, 'adminFees.value');
    } else {
      let adminFees = appSettingArr.find((item) => item.key === 'AdminFees');
      setAdminFee(adminFees.value);
    }
    return;
  };

  // Fetch conversion rate when token changes
  useEffect(() => {
    fetchConversionRate();
    getAllSetting();
  }, [fromToken, toToken]);

  // Handle From Amount Change
  const handleFromAmountChange = (value) => {
    setAmount(value);
    if (finalRate) {
      const calculatedToAmount = (value * finalRate).toFixed(8);
      setReceiveAmount(
        (calculatedToAmount * (1 - Number(adminFee) / 100)).toFixed(8)
      );
    }
  };

  // Handle To Amount Change
  const handleToAmountChange = (value) => {
    setReceiveAmount(value);
    if (finalRate) {
      const calculatedFromAmount = (value / finalRate).toFixed(2);
      setAmount(calculatedFromAmount);
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setAmount('');
    setReceiveAmount('');
    //fetchConversionRate();
  };

  // Fetch token image paths dynamically based on the selected token
  const getImage = (tokenImage) => {
    try {
      return require(`../../../assets/token-icons/${tokenImage}.png`).default;
    } catch {
      return Inex; // Fallback image
    }
  };

  const handleFromTokenChange = (token) => {
    setFromToken(token);
    setFromBalance(
      formatBalance(
        usersWallets
          .filter((wallet) => {
            const note = wallet.notes ? wallet.notes.toLowerCase() : '';
            return (
              wallet.coinSymbol === token &&
              (!wallet.notes ||
                note.includes('gift card') ||
                note.includes('received from'))
            );
          })
          .reduce((sum, wallet) => sum + wallet.coinBalance, 0)
      )
    );
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  const handlePreviewConversion = async () => {
    const selectedCoinPrice = await getCoinPriceByName(fromToken.title);
    let usdAmount = amount * selectedCoinPrice.data.results.data;
    if (usdAmount > 500) {
      // ask for KYC if the converted final amount is greater 500 usd
      const email = localStorage.getItem('email');
      const response = await validateUserEmail(email);
      const data = response;

      if (data.status === 200) {
        console.log('data', data);
        if (!data.data.isKYCPass && data.data.kycStatus !== 'Completed') {
          setShowPopup(true);
          setPopupMessage('Please Complete KYC first');
          return;
        }
      }
    }

    formik.handleSubmit();
    // Perform necessary checks before opening modal
    setOpenModal(true);
  };

  const handleToTokenChange = (token) => {
    setToToken(token);
    setToBalance(
      formatBalance(
        usersWallets
          .filter((wallet) => {
            const note = wallet.notes ? wallet.notes.toLowerCase() : '';
            return (
              wallet.coinSymbol === token &&
              (!wallet.notes ||
                note.includes('gift card') ||
                note.includes('received from'))
            );
          })
          .reduce((sum, wallet) => sum + wallet.coinBalance, 0)
      )
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div className={classes.Container}>
      <IconicHeader selectedTab={selectedTab} onChange={handleTabChange} />

      {/* <div className={classes.header}>
        <Link className={classes.link} to="/">
          <ArrowBackIcon /> Buy and Sell
        </Link>
      </div> */}
      <div className={classes.contentContent}>
        <div className={classes.rightContainer}>
          <h2 className={classes.mainHeading}>Convert</h2>
          <IconicHeaders />

          <div className={classes.rightContentContainer}>
            <CustomTextField
              label="From"
              placeholder={`${
                fromBalance > 0.01 ? '0.01' : 0
              } - ${fromBalance}`}
              tokenType="from"
              setShowCoinsDropdown={(isOpen) => {
                setShowCoinsDropdown(isOpen);
                setActiveTokenType('from');
              }}
              onAmountChange={handleFromAmountChange}
              onSelectToken={handleFromTokenChange}
              balance={fromBalance} // Pass the 'fromToken' balance to the field
              defaultReceiveToken={fromToken} // Pass default token for "From"
              amount={amount} // From amount
              rate={rateData1}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ImportExportIcon
                onClick={handleSwapTokens} // Add the click handler here
                style={{ cursor: 'pointer', width: '32px', fontSize: '32px' }}
                className={classes.swapIconHover}
              />
            </div>
            <CustomTextField
              label="To"
              placeholder="0"
              tokenType="to"
              setShowCoinsDropdown={(isOpen) => {
                setShowCoinsDropdown(isOpen);
                setActiveTokenType('to');
              }}
              amount={receiveAmount} // Pass the calculated receiveAmount
              onAmountChange={handleToAmountChange} // Use the updated handler
              onSelectToken={handleToTokenChange}
              balance={toBalance}
              defaultReceiveToken={toToken}
              rate={rateData2}
            />
            <div style={{ margin: '25px 0px' }}></div>
            {amount && (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px',
                  }}
                >
                  <span>Rate </span>1 {fromToken.title} ≈{' '}
                  {(rateData1 / rateData2).toFixed(4)} {toToken.title}
                </div>
                <div style={{ margin: '25px 0px' }}></div>
              </>
            )}

            <GenericButton
              text="Preview Conversion"
              //onClick={formik.handleSubmit}
              onClick={handlePreviewConversion}
              disabled={!amount}
            />
            {/* Conversion Preview Modal */}
            {/* <ConversionPreviewModal
              open={openModal}
              onClose={handleCloseModal}
              fromToken={fromToken}
              toToken={toToken}
              amount={amount}
              onAmountChange={handleToAmountChange}
              totalAmountToPay={receiveAmount}
              rateData1={rateData1}
              rateData2={rateData2}
              insufficientBalance={fromBalance < Number(amount)} // Check for insufficient balance
              createProcessOrder={createProcessOrder}
              fromTokenImage={fromTokenImage}
              toTokenImage={toTokenImage}
            /> */}
          </div>
        </div>
      </div>
      {showCoinsDropdown && (
        <CoinsPopup
          onClose={() => setShowCoinsDropdown(false)}
          onTokenSelect={handleTokenSelection}
        />
      )}
      {openModal && (
        <PreviewConversionpopup
          onClose={() => handleCloseModal(false)}
          fromTokenImage={fromTokenImage}
          toTokenImage={toTokenImage}
          fromToken={fromToken}
          toToken={toToken}
          amount={amount}
          onAmountChange={handleToAmountChange}
          totalAmountToPay={receiveAmount}
          rateData1={rateData1}
          rateData2={rateData2}
          createProcessOrder={createProcessOrder}
          insufficientBalance={
            Number(fromBalance?.replace(/,/g, '') ?? 0) < Number(amount)
          }
          adminFee={adminFee}
        />
      )}
      {openSuccessPopup && (
        <SuccessPopup onClose={() => setOpenSuccessPopup(false)} />
      )}
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

export default ConvertCrypto;
