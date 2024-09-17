import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../shared/TextField';
import GenericButton from '../shared/Button';
import CustomTextField from './CustomTextField';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import IconicHeader from './IconicHeader';
import CoinsPopup from './CoinsPopup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  confirmConvertOrder,
  createConvertOrder,
  decodeJWT,
  getCoinPriceByName,
  getUserWallets,
} from '../../../services/api';
import ConversionPreviewModal from './ConversionPreviewModal';
import OpenNotification from '../../OpenNotification/OpenNotification';
import Inex from '../../../assets/updated/buySell/INEX.svg'; // Default image
const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1280px',
    margin: '50px auto',
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
}));

const ConvertCrypto = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [fromToken, setFromToken] = useState({ title: 'INEX', image: 'INEX' }); // Default to INEX
  const [toToken, setToToken] = useState({ title: 'IUSD+', image: 'IUSD+' });
  const [fromBalance, setFromBalance] = useState(0);
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

  const createProcessOrder = async () => {
    setLoading(true); // Set loading true when API call starts
    try {
      const basecoin = fromToken.title;
      const quotecoin = toToken.title;
      let res=  await createConvertOrder(basecoin, quotecoin, Number(amount), receiveAmount);

      if (res.status === 200) {
        await processConvertOrder(res.data); // Process the order
        setLoading(false); // Stop loading
        OpenNotification('success', "Conversion successful!");
        setOpenModal(false); // Close the modal
      } else {
        throw new Error('Failed to Process Convert Order. Please check balance on the wallet');
      }
    } catch (error) {
      setLoading(false); // Stop loading
      OpenNotification('error', error.message || 'Failed to process conversion');
    }
  };

  const processConvertOrder = async (order) => {
    const res = await confirmConvertOrder(order.user.email, order.orderId);

    if (res.status === 200) {
      setLoading(false);
      OpenNotification('success', 'Successfully Processed Convert Order');
    } else {
      setLoading(false);
      OpenNotification('error', "Failed to Process Convert Order. Please check balance on the wallet");
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
    if (balance < 0.001) {
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

  // Fetch user wallets to set balances
  useEffect(() => {
    const fetchUserWallets = async () => {
      const token = localStorage.getItem('access_token');
      const decodedToken = decodeJWT(String(token)); // Decode JWT

      const userWallets = await getUserWallets(decodedToken?.email);
      setUsersWallets(userWallets.data);
      setFromBalance(
        formatBalance(userWallets.data.find((x) => x.coinSymbol === fromToken.title)
          ?.coinBalance || 0
      ));
      setToBalance(
        formatBalance(userWallets.data.find((x) => x.coinSymbol === toToken.title)
          ?.coinBalance || 0
      ));
    };

    fetchUserWallets();
  }, [fromToken, toToken]);

  // Fetch conversion rate when token changes
  useEffect(() => {
    fetchConversionRate();
  }, [fromToken, toToken]);

  // Handle From Amount Change
  const handleFromAmountChange = (value) => {
    setAmount(value);
    if (finalRate) {
      const calculatedToAmount = (value * finalRate).toFixed(2);
      setReceiveAmount(calculatedToAmount);
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

  // Handle token swapping
  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setAmount('');
    setReceiveAmount('');
    fetchConversionRate();
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
    const userWallet = usersWallets.filter((x) => x.coinSymbol === token);
    setFromBalance(formatBalance(userWallet[0]?.coinBalance || 0)); // Update balance for new 'fromToken'
    setFromTokenImage(getImage(token.image)); // Set the image when token changes
  };

  const handlePreviewConversion = () => {
    formik.handleSubmit();
    // Perform necessary checks before opening modal
    setOpenModal(true);
  };

  const handleToTokenChange = (token) => {
    setToToken(token);
    const userWallet = usersWallets.filter((x) => x.coinSymbol === token);
    setToBalance(formatBalance(userWallet[0]?.coinBalance || 0)); // Update balance for new 'toToken'
    setToTokenImage(getImage(token.image)); // Set the image when token changes
  };

  return (
    <div className={classes.Container}>
      <div className={classes.header}>
        <Link className={classes.link} to="/">
          <ArrowBackIcon /> Buy Sell
        </Link>
      </div>
      <div className={classes.contentContent}>
        <div className={classes.rightContainer}>
          <h2 className={classes.mainHeading}>Convert</h2>
          <IconicHeader />
          <h6 className={classes.heading}>Wallet</h6>
          <div className={classes.rightContentContainer}>
            <CustomTextField
              label="From"
              placeholder="Enter amount"
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
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ImportExportIcon
                onClick={handleSwapTokens} // Add the click handler here
                style={{ cursor: 'pointer' }}
              />
            </div>
            <CustomTextField
              label="To"
              placeholder="Enter amount"
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
            />
            <div style={{ margin: '25px 0px' }}></div>
            <GenericButton
              text="Preview Conversion"
              //onClick={formik.handleSubmit}
              onClick={handlePreviewConversion}
            />
            {/* Conversion Preview Modal */}
            <ConversionPreviewModal
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
            />
          </div>
        </div>
      </div>
      {showCoinsDropdown && (
        <CoinsPopup
          onClose={() => setShowCoinsDropdown(false)}
          onTokenSelect={handleTokenSelection}
        />
      )}
    </div>
  );
};

export default ConvertCrypto;
