import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme, InputAdornment } from '@mui/material';
import InputField from '../shared/TextField';
import iusd from '../../../assets/updated/buySell/usd.svg';
import GenericButton from '../shared/Button';
import {
  baseURL,
  createBuyOrderForSmartAPY,
  decodeJWT,
  getOrderDetails,
  getUserWallets,
  loginWithToken,
} from '../../../services/api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import tokensList from '../../../utils/Tokens.json';
import Inex from '../../../assets/updated/buySell/INEX.svg';
import { title } from 'process';
import smartApyCalImage from '../../../assets/updated/SmartApy/smartApyCalRight.png';
import smartAPYLogo from '../../../assets/updated/SmartApy/smartApyLogo.svg';
import CustomSelectBox from './CustomSelectBox';
import iusdIcon from '../../../assets/updated/SmartApy/iUSD+.svg';
import usd from '../../../assets/token-icons/USD.png';
import ViewAllPlansPopup from './ViewAllPlansPopup';
import PaymentMethodSelection from './SelectPaymentMethod';
import Popup from './PaymentPopup';
import step1Img from '../../../assets/updated/SmartApy/step1Img.svg';
import step2Img from '../../../assets/updated/SmartApy/step2Img.svg';
import step3Img from '../../../assets/updated/SmartApy/step3Img.svg';
import step4Img from '../../../assets/updated/SmartApy/step4Img.svg';
import GeneralPopup from '../BuySell/Popup';
import ProcessingFailedPopup from '../SmartCrypto/ProcessingFailedPopup';
import CongratulationsPopup from './Congratulations';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    maxWidth: '1200px',
    width: '100%',
    '&>div': { flex: 1 },
    gap: '20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  item: {
    padding: '20px',
    width: '100%',
    flex: 1,
  },
  flexContainerRoot: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    '& h2': {
      margin: 0,
      fontSize: '38px',
      fontWeight: '500',
      fontStyle: 'italic',
    },
  },

  selectContainer: {
    display: 'flex',
    marginBottom: '15px',
    gap: '10px',
    '& > *': {
      flex: 1,
    },
  },
  balanceContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    padding: '20px',
    width: '100%',
    marginBottom: '15px',
  },

  label: {
    fontSize: '30px',
    fontWeight: '500',
    lineHeight: '36.31px',
    color: theme.palette.text.primary,
    marginBottom: '30px',
  },
  dropDownIconContainer: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '32px',
      height: '32px',
    },
    '& p': {
      fontSize: '20px',
      marginLeft: '5px',
      fontWeight: '200',
      color: `${theme.palette.text.primary} !important`,
    },
  },
  lockUpHeading: {
    fontSize: '25px',
    fontWeight: 300,
    display: 'flex',
    gap: '10px',
    color: theme.palette.text.secondary,
    margin: '15px 0px',
  },
  howStackWorksText: {
    marginBottom: '30px',
    '& h3': {
      fontSize: '14px',
      fontWeight: '600',
    },
    '& p': {
      fontSize: '12px',
      fontWeight: '300',
    },
  },
  buttonTabContainer: {
    display: 'flex',
    gap: '15px',
    flexDirection: 'column',
    marginBottom: '15px',
    '& > button': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > button': {
        width: '100%',
        maxWidth: '100%',
      },
    },
  },
  rewardContainer: {
    fontSize: '18px',
    fontWeight: 300,
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
  },
  fullWidthButton: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: 'black !important',
  },
  inactiveButton: {
    border: `1px solid ${theme.palette.primary.main} !important`,
    background: 'none !important',
    color: `${theme.palette.primary.main} !important`,
  },
  borderNoneBtn: {
    border: 'none !important',
    background: 'none !important',
    width: 'fit-content',
    color: `${theme.palette.primary.main} !important`,
    margin: 'auto',
  },
  inputFieldContainer: {
    display: 'grid',
    gridTemplateColumns: '43% 26.5% 26.5%',
    gap: '10px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      '& > :nth-child(1)': {
        gridColumn: '1 / 2',
      },
      '& > :nth-child(2)': {
        gridColumn: '1 / 2',
      },
      '& > :nth-child(3)': {
        gridColumn: '1 / 2',
      },
    },
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '10px',
  },
  selectTypeContainer: {
    marginBottom: '20px',
    '& label': {
      fontSize: '11px',
      marginBottom: '10px',
    },
  },

  helpContainer: {
    margin: 'auto',
  },
  stepImg: {
    width: '70px',
    flexGrow: 0,
    flexShrink: 0,
  },
  heading: {
    fontSize: '22px',
    fontWeight: 500,
    marginBottom: '16px',
    '& span': {
      fontSize: '32px',
      fontWeight: 600,
    },
  },
  step: {
    marginBottom: '30px',
    '& span': {
      fontSize: '20px',
      fontWeight: 500,
      paddingTop: '15px',
    },
  },
  note: {
    fontStyle: 'italic',
    fontSize: '14px',
    marginTop: '4px',
    color: '#a0a0a0', // Lighter gray for the note
  },
  disclaimerText: {
    color: theme.palette.primary.main,
    fontStyle: 'italic',
  },
}));

const SmartApyTop = ({ onStakeSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState({
    title: 'USD',
    image: 'USD',
    stakingPercentage6months: 20,
    stakingPercentage1year: 30,
    stakingPercentage18months: 40,
    chain: 'Binance Smart Chain',
  });
  const [value, setValue] = useState('Bronze');
  const [amt, setAmt] = useState();
  const [formattedAmt, setFormattedAmt] = useState(''); // Formatted value for display
  const [type, setType] = useState('Short');
  const [honeyBeeId, setHoneyBeeId] = useState('');
  const [honeyBeeEmail, setHoneyBeeEmail] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);
  const [error, setError] = useState('');
  const [loadings, setLoadings] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [viewAllPlansPopup, setViewAllPlansPopup] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('Credit Card');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [paymentMethodError, setPaymentMethodError] = useState('');
  const [usdBalance, setUsdBalance] = useState('0.00'); // State to store USD balance
  const [usdAmount, setUsdAmount] = useState();
  const theme = useTheme();
  const { id } = useParams();
  const [congratulationsPopup, setCongratulationsPopup] = useState(false);
  const [failedPopup, setFailedPopup] = useState(false);

  const [searchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState('6 Months (20%)');
  const defaultSignInToken = searchParams.get('signInToken');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsgOpen, setPopupMsgOpen] = useState(false);
  const [permissionData, setPermissionData] = useState();

  const [orderID, setOrderId] = useState('');
  const [orderData, setOrderData] = useState('');
  const [orderId] = useSearchParams();
  const [success] = useSearchParams();

  useEffect(() => {
    const orderIdParam = orderId.get('orderId');
    const successParam = success.get('success');

    // Ensure both orderId and success are available
    if (orderIdParam && successParam) {
      setOrderId(String(orderIdParam));
      console.log('success', successParam);

      if (successParam === 'true') {
        setCongratulationsPopup(true);
      } else {
        setFailedPopup(true);
      }

      if (orderIdParam !== undefined) {
        let access_token = String(localStorage.getItem('access_token'));
        let decoded = decodeJWT(access_token);

        getOrderDetails(decoded.email, String(orderIdParam)).then((res) => {
          const userEmail = decoded.email;
          const userKey = localStorage.getItem('userkey');
          const userType = localStorage.getItem('userType');
          console.log('userEmail', userEmail);
          console.log('userKey', userKey);

          console.log(res);
          let orderData = res;
          if (res.status === 200) {
            console.log('orderData', orderData);
            setOrderData(orderData.data);
          }
        });
      }
    } else {
      console.log(
        'Missing orderId or success parameter. Skipping state updates.'
      );
    }
  }, [orderId, success]);

  const handleButtonClick = async (button) => {
    setActiveButton(button);
    console.log('Button', button);
    if (button === '12 Months') {
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage1year / 100));
    } else if (button === '6 Months') {
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage6months / 100));
    } else if (button === '18 Months') {
      setFinalAmount(amt * (1 + selectedToken.stakingPercentage6months / 100));
    }
  };

  useEffect(() => {
    const redirectFlag = localStorage.getItem('redirected');

    if (defaultSignInToken && !redirectFlag) {
      console.log('I am here ', defaultSignInToken);
      checkLogin(defaultSignInToken);
    } else {
      const email = localStorage.getItem('email');
      if (!email) {
        window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
      }
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
        localStorage.setItem('refresh_token', resObj?.refresh_token);
        localStorage.setItem('userType', resObj?.userType);
        localStorage.setItem('redirected', 'true'); // Set flag
        window.location.reload();
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  useEffect(() => {
    const percentage =
      activeButton === '6 Months (20%)'
        ? selectedToken.stakingPercentage6months
        : activeButton === '12 months (30%)'
        ? selectedToken.stakingPercentage1year
        : selectedToken.stakingPercentage18months;

    const profit = amt * (percentage / 100);
    setFinalAmount(profit ? profit : 0);
  }, [amt, activeButton, selectedToken]);

  const formattedProfit = new Intl.NumberFormat('en-US').format(finalAmount); // Format profit for display

  const handleAmountChange = (e) => {
    // Remove non-numeric characters and restrict to whole numbers
    const rawValue = e.target.value.replace(/[^0-9]/g, '');

    if (!isNaN(rawValue) && rawValue >= 0) {
      setAmt(rawValue); // Set raw value for API
      setFormattedAmt(
        rawValue
          ? new Intl.NumberFormat('en-US').format(rawValue) // Format as a whole number with commas
          : ''
      ); // Format value for display
    }
  };

  const formatPrice = (value) =>
    value < 1 ? value.toFixed(5) : value.toFixed(2);

  const submitStake = async () => {
    try {
      await confirmPayment();
    } catch (err) {
      console.log('Err', err);
      setLoadings(false);
    }
  };

  const confirmPayment = async () => {
    try {
      console.log('paymentMethod', paymentMethod);
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
          setPopupMessage('Insufficient Balance');
          setLoadings(false);
          setPopupMsgOpen(true);
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
    const email = localStorage.getItem('email');
    let res;
    const duration =
      activeButton.split(' ')[0] + ' ' + activeButton.split(' ')[1];
    const percentage =
      activeButton === '6 Months (20%)'
        ? selectedToken.stakingPercentage6months
        : activeButton === '12 months (30%)'
        ? selectedToken.stakingPercentage1year
        : selectedToken.stakingPercentage18months;

    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setPopupMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setPopupMsgOpen(true);
        setLoadings(false);
        return;
      }
      res = await createBuyOrderForSmartAPY(
        'IUSD+',
        activeButton,
        percentage,
        duration,
        parseFloat(amt),
        email,
        false,
        paymentMethod
      );
    } else {
      res = await createBuyOrderForSmartAPY(
        'IUSD+',
        activeButton,
        percentage,
        duration,
        parseFloat(amt),
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
        setPopupMsgOpen(true);
        setPopupMessage('Order Completed');
      }
      //getStripePaymentIntent(res.data.orderId, res.data.user.email);
    } else {
      setLoadings(false);
      setPopupMsgOpen(true);
      setPopupMessage('Failed to create order. Please try again!');
    }
  };

  const createBuyOrderForZelleAndWire = async (paymentMethod) => {
    setLoadings(true);
    const email = localStorage.getItem('email');
    let percentage =
      type === 'Short'
        ? selectedToken.stakingPercentage6months
        : selectedToken.stakingPercentage1year;
    let res;
    const duration =
      activeButton.split(' ')[0] + ' ' + activeButton.split(' ')[1];
    console.log('paymentMethod', paymentMethod);
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setPopupMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setPopupMsgOpen(true);
        setLoadings(false);
        return;
      }
      res = await createBuyOrderForSmartAPY(
        'IUSD+',
        type,
        percentage,
        duration,
        parseFloat(amt),
        email,
        false,
        paymentMethod
      );
    } else {
      res = await createBuyOrderForSmartAPY(
        'IUSD+',
        type,
        percentage,
        duration,
        parseFloat(amt),
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
      setPopupMessage(res.data);
      setPopupMsgOpen(true);
      return null;
    }
  };

  // Create an order and PaymentIntent as soon as the confirm purchase button is clicked
  const createNewBuyOrderForTygaPay = async () => {
    setLoadings(true);
    const email = localStorage.getItem('email');
    const percentage =
      activeButton === '6 Months (20%)'
        ? selectedToken.stakingPercentage6months
        : activeButton === '12 months (30%)'
        ? selectedToken.stakingPercentage1year
        : selectedToken.stakingPercentage18months;
    let res;
    const duration =
      activeButton.split(' ')[0] + ' ' + activeButton.split(' ')[1];
    if (id) {
      if (!permissionData?.permissions?.buy) {
        // OpenNotification('error', "As Hive Captain, Please apply for buy approval from Hive Member");
        setPopupMessage(
          'As Hive Captain, Please apply for buy approval from Hive Member'
        );
        setPopupMsgOpen(true);
        setLoadings(false);
        return;
      }
      res = await createBuyOrderForSmartAPY(
        'IUSD+',
        activeButton,
        percentage,
        duration,
        parseFloat(amt),
        email,
        false,
        paymentMethod
      );
    } else {
      res = createBuyOrderForSmartAPY(
        'IUSD+',
        activeButton,
        percentage,
        duration,
        parseFloat(amt),
        email,
        false,
        paymentMethod
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
      setPopupMsgOpen(true);
      setPopupMessage(res.data);
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handlePopuMsgpClose = () => {
    setPopupMsgOpen(false);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handlePaymentMethodClick = async () => {
    setPopupOpen(true);
  };
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);
    handlePopupClose();
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '50px',
        }}
      >
        <div className={classes.flexContainerRoot}>
          <img src={smartAPYLogo} alt="" />
          <h2>Smart APY</h2>
        </div>
        <p>Maximize your rewards by Staking your money in indexx Smart APY</p>
      </div>
      <div className={classes.container}>
        <div className={classes.item}>
          <div className={classes.balanceContainer}>
            <InputField
              label="Enter amount"
              type="text"
              placeholder="0.0"
              value={formattedAmt}
              onChange={handleAmountChange}
              endAdornment={
                <InputAdornment position="end">
                  <div className={classes.dropDownIconContainer}>
                    <img src={usd} alt={'usdIcon'} />
                    <p>{selectedToken?.title}</p>
                  </div>
                </InputAdornment>
              }
            />
            {error && <div className={classes.errorText}>{error}</div>}

            <div className="lockup-container">
              <div className={classes.lockUpHeading}>Lock-up Period</div>
              <div className={classes.buttonTabContainer}>
                {['6 Months (20%)', '12 months (30%)', '18 months (40%)'].map(
                  (period) => (
                    <GenericButton
                      key={period}
                      text={`${period}`}
                      onClick={() => handleButtonClick(period)}
                      className={
                        activeButton === period
                          ? classes.activeButton
                          : classes.inactiveButton
                      }
                    />
                  )
                )}
              </div>
              <div className={classes.rewardContainer}>
                <InputField
                  label="Expected profit in Smart APY"
                  type="text"
                  placeholder="0.0"
                  value={formattedProfit}
                  endAdornment={
                    <InputAdornment position="end">
                      <div className={classes.dropDownIconContainer}>
                        <img src={usd} alt={'usdIcon'} />
                        <p>{selectedToken?.title}</p>
                      </div>
                    </InputAdornment>
                  }
                />
              </div>
              {/* Pay with */}
              <div>
                <PaymentMethodSelection
                  onClick={handlePaymentMethodClick}
                  errorMsg={paymentMethodError}
                  buttonText={
                    selectedPaymentMethod || 'Select Transaction Method'
                  }
                  type={`${'Buy'}`}
                />
              </div>

              <div className={classes.fullWidthButton}>
                <GenericButton
                  text="Stake Now"
                  disabled={
                    loadings ||
                    !!error ||
                    amt < 5000 ||
                    !activeButton ||
                    !selectedPaymentMethod
                  }
                  loading={loadings}
                  onClick={submitStake}
                />
              </div>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            {/* <GenericButton
              text="Buy IUSD+"
              className={classes.inactiveButton}
              onClick={() => navigate('/update/home?buyToken=IUSD%2B')}
            /> */}
            <GenericButton
              text="View all Plans"
              className={classes.borderNoneBtn}
              onClick={() => setViewAllPlansPopup(true)}
            />
          </div>
        </div>
        <div className={classes.item} style={{ alignSelf: 'flex-start' }}>
          <div className={classes.helpContainer}>
            <p className={classes.heading}>
              How does <br /> <span>Smart APY Staking works</span>
            </p>
            <div className={classes.howStackWorksText}>
              <h3>What does Stake means?</h3>
              <p>
                To lock up cryptocurrency in a network to support it and earn
                rewards.
              </p>
            </div>
            <div
              style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
            >
              <img
                className={classes.stepImg}
                src={step1Img}
                alt="step 1 img"
              />
              <p className={classes.step}>
                <span>1. SelectLock-in Period and Investment Amount</span>
                <div style={{ margin: '10px 0px' }}>
                  Select a lock-in period of 6, 12, or 18 months based on your
                  financial goals and the initial investment amount. Then click
                  “Stake Now”
                </div>
              </p>
            </div>
            <div
              style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
            >
              <img src={step2Img} alt="" className={classes.stepImg} />

              <p className={classes.step}>
                <span>2. Confirm your investment</span>
                <div style={{ margin: '10px 0px' }}>
                  To proceed with staking your investment, you need to confirm
                  your action. You will be redirect to the payment option you
                  choose. Once the lock-in period is complete, your yield will
                  be available in IUSD+.
                </div>
              </p>
            </div>

            <div
              style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
            >
              <img src={step3Img} alt="" className={classes.stepImg} />
              <p className={classes.step}>
                <span>3. Successful Staking Acknowledgment</span>
                <div style={{ margin: '10px 0px' }}>
                  Once the payment process goes through, your funds are
                  converted to IUSD+ and are now earning guaranteed returns.
                </div>
              </p>
            </div>

            <div
              style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
            >
              <img src={step4Img} alt="" className={classes.stepImg} />
              <p className={classes.step}>
                <span>4.View Staking Dashboard</span>
                <div style={{ margin: '10px 0px' }}>
                  On your dashboard inside the Asset Wallet, you will see the
                  Staking Overview.
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>

      {viewAllPlansPopup && (
        <ViewAllPlansPopup onClose={() => setViewAllPlansPopup(false)} />
      )}

      {popupMsgOpen && (
        <GeneralPopup
          message={popupMessage}
          onClose={handlePopuMsgpClose}
          width={popupMessage.length > 100 ? '600px' : '360px'}
        />
      )}

      <Popup
        open={popupOpen}
        onClose={handlePopupClose}
        amount={''}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        type={`${'Buy'}`}
        token={'inex'}
        spendToken={'wibs'}
      />

      {failedPopup && (
        <ProcessingFailedPopup
          onClose={() => setFailedPopup(false)}
          category={'x-Bitcoin'}
        />
      )}

      {congratulationsPopup && (
        <CongratulationsPopup
          onClose={() => setCongratulationsPopup(false)}
          category={'x-Bitcoin'}
          userSellPlanReformed={'userSellPlanReformed'}
          userSellPlan={'userSellPlan'}
          orderData={orderData}
        />
      )}
    </div>
  );
};

export default SmartApyTop;
