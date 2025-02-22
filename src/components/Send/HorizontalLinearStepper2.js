import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import people from '../../assets/arts/people.svg';
import people_green from '../../assets/arts/man_icon.svg';
import check from '../../assets/arts/check 2 3.svg';
import wallet from '../../assets/BSheader/funding grey 1.svg';
import './HorizontalLinearStepper2.css';
import '../BuySell/BuySellDummy.css';
import '../BSDepositWithdraw/BSWithdraw.css';
import { Select } from 'antd';
import initialTokens from '../../utils/Tokens.json';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import {
  createSendTxByEmail,
  createSendTxByUsername,
  decodeJWT,
  getWalletBalance,
  validateUserEmail,
  validateUsername,
} from '../../services/api';
import '../BSDepositWithdraw/BSWithdraw.css';
import '../BuySell/BuySellDummy.css';
import './HorizontalLinearStepper2.css';
import Header from './Header';
import InputField from '../updated/shared/TextField';
import GenericButton from '../updated/shared/Button';
import CustomSelectBox from './CustomSelect';

const Final = () => {
  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box className="send-box d-flex flex-direction-column align-items-center">
        <br />
        <br />

        <img src={check} alt="check" style={{ width: '128px' }} />
        <br />
        <h1 className="font_30x">Send Successful</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ minWidth: '100%' }}>
          <Button
            className="continue-btn"
            variant="contained"
            onClick={() => window.location.reload()}
            disableTouchRipple
            style={{ minWidth: '100%' }}
          >
            Done
          </Button>
        </div>
      </Box>
    </Box>
  );
};

const FileComponent1 = ({ onNext, onStateChange }) => {
  const [type, setType] = useState('mail');
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState('');
  const [username, setUserName] = useState();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [apiError, setApiError] = useState('');
  const handleChange = (event) => {
    setType(event.target.value);
    setApiError('');
  };

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValid ? '' : 'Invalid email address');
    return isValid;
  };

  // Retrieve current user's email and username from localStorage
  const currentUserEmail =
    localStorage.getItem('user') !== null ? localStorage.getItem('user') : '';
  const currentUsername =
    localStorage.getItem('username') !== null
      ? localStorage.getItem('username')
      : '';

  const validateEmailAPI = async () => {
    try {
      if (email === currentUserEmail) {
        setApiError('Payment to your own wallet is not supported.');
        return false;
      }

      const response = await validateUserEmail(email);
      const data = await response;

      if (data.status === 200) {
        if (data?.data?.profilePic) {
          setProfilePhoto(data.data.profilePic);
        }
        return true;
      } else {
        setApiError(data.message || 'An error occurred');
        return false;
      }
    } catch (error) {
      setApiError('Error during email validation');
      return false;
    }
  };

  const validateUsernameAPI = async () => {
    try {
      if (username === currentUsername) {
        setApiError('Payment to your own wallet is not supported.');
        return false;
      }
      const response = await validateUsername(username);
      const data = await response;
      if (data.status === 200) {
        if (data?.data?.profilePic) {
          setProfilePhoto(data.data.profilePic);
        }
        return true;
      } else {
        setApiError(data.message || 'An error occurred');
        return false;
      }
    } catch (error) {
      setApiError('Error during username validation');
      return false;
    }
  };

  const validateInput = async () => {
    if (type === 'mail') {
      return await validateEmailAPI();
    } else if (type === 'usname') {
      return await validateUsernameAPI();
    }
    return false;
  };

  const handleNext = async () => {
    const isValid = await validateInput();
    if (isValid) {
      onStateChange({ email, username, profilePic: profilePhoto });
      onNext();
    } else {
      console.log('Invalid input');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box className="send-box staking-toggle">
        <h1 className="font_30x" style={{ marginBottom: '25px' }}>
          Send to
        </h1>

        <div className="font_13x" style={{ marginBottom: '25px' }}>
          Send fiat or crypto to hive users via email or user name
        </div>

        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{
            width: '100%',
            gap: 1,
            justifyContent: 'space-between',
          }}
        >
          <ToggleButton
            value="mail"
            disableTouchRipple
            sx={{
              color: 'var(--primary-color)',
              borderRadius: '2px',
              height: '44px',
              width: '49%',
              border: '1px solid var(--border-color)',
              '&:hover': {
                background: 'var(--staking-color)',
              },
              '&:active': {
                borderColor: 'var(--secondary-color)',
                color: 'var(--secondary-color)',
                boxShadow: 'none',
                background: 'transparent',
              },
              '&:focus': {
                borderColor: 'var(--secondary-color)',
                color: 'var(--secondary-color)',
                boxShadow: 'none',
                background: 'transparent',
              },
              '&.Mui-selected': {
                color: '#fff',
                background: 'var(--primary-color)',
                '&:hover': {
                  background: 'var(--primary-color)',
                },
              },
            }}
          >
            Email
          </ToggleButton>

          <ToggleButton
            value="usname"
            disableTouchRipple
            sx={{
              color: 'var(--primary-color)',
              borderRadius: '2px',
              height: '44px',
              width: '49%',
              border: '1px solid var(--border-color)',
              '&:hover': {
                background: 'var(--staking-color)',
              },
              '&:active': {
                borderColor: 'var(--secondary-color)',
                color: 'var(--secondary-color)',
                boxShadow: 'none',
                background: 'transparent',
              },
              '&:focus': {
                borderColor: 'var(--secondary-color)',
                color: 'var(--secondary-color)',
                boxShadow: 'none',
                background: 'transparent',
              },
              '&.Mui-selected': {
                color: '#fff',
                background: 'var(--primary-color)',
                '&:hover': {
                  background: 'var(--primary-color)',
                },
              },
            }}
          >
            User Name
          </ToggleButton>
        </ToggleButtonGroup>

        <div className="">
          <Box
            className="d-flex flex-direction-column"
            sx={{
              my: 1,
              pt: 1,
            }}
          >
            {type === 'mail' ? (
              <>
                <Typography variant="text" fontSize={'13px'} textAlign={'left'}>
                  Recipient's Email
                </Typography>
                <Box className="d-flex" sx={{ gap: 3 }}>
                  <InputField
                    placeholder="Enter recipient’s email"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '100%' }}
                    size="small" // Make the input box smaller
                    value={email}
                    onChange={(e) => {
                      validateEmail();
                      setEmail(e.target.value);
                    }}
                    error={emailError !== ''}
                    helperText={emailError}
                  />
                </Box>
                {apiError && <Typography color="error">{apiError}</Typography>}
              </>
            ) : (
              <>
                <Typography variant="text" fontSize={'13px'} textAlign={'left'}>
                  Recipient's User Name
                </Typography>
                <Box className="d-flex" sx={{ gap: 3, mt: 1 }}>
                  <InputField
                    variant="outlined"
                    placeholder="Enter recipient’s User Name"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2, width: '100%' }}
                    size="small" // Make the input box smaller
                    value={username}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    // error={!!error}
                    // helperText={error}
                  />
                </Box>
                {apiError && <Typography color="error">{apiError}</Typography>}
              </>
            )}
          </Box>
          <br />
          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={handleNext}
            disabled={
              (username === undefined ||
                username.trim() === '' ||
                username === null) &&
              (email === undefined ||
                email.trim() === '' ||
                email === null ||
                emailError !== '')
            }
            text={'Continue'}
          />
        </div>
      </Box>
    </Box>
  );
};

const FileComponent2 = ({
  onNext,
  onStateChange,
  email,
  username,
  profilePic,
}) => {
  const [token, setToken] = useState('crypto');
  const [currentUserEmail, setCurrentUserEamil] = useState('');
  const [filteredtokens, setFilteredtokens] = useState();
  const [receiveAmount, setReceiveAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('INEX');
  const [userBalance, setUserBalance] = useState(0);
  const [balanceError, setBalanceError] = useState('');
  const [showUserBalance, setShowUserBalance] = useState(false);
  const [selectedCoinObj, setSelectedCoinObj] = useState({
    address: '0x9Be6B3a0Aa74f0b012c47E05Be253F9608F8c6E7',
    title: '',
  });
  const handleChangeCurrency = async (value) => {
    let getRequiredCoin = filteredtokens.find((x) => x.address === value);
    setSelectedCoin(String(getRequiredCoin?.title));
    // setSelectedCoinObj(String(getRequiredCoin?.title));
    setSelectedCoinObj(getRequiredCoin);
  };

  const user_img =
    localStorage.getItem('userlogged') === 'normal' ? people_green : people;
  const recipient = email || username;
  const recipientProfilePic = profilePic || user_img;

  const validateBalanceOfCurrentUser = async () => {
    if (currentUserEmail && currentUserEmail.trim() !== '') {
      const res = await getWalletBalance(currentUserEmail, selectedCoin);
      setSelectedCoin(selectedCoin);
      if (res.status === 200) {
        setUserBalance(res.data.balance);
        setShowUserBalance(true);
      } else {
        setUserBalance(0);
        setShowUserBalance(true);
      }
    }
  };

  useEffect(() => {
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
      let decoded = decodeJWT(access_token);
      // Check if the email is actually different to avoid unnecessary updates
      if (decoded.email !== currentUserEmail) {
        setCurrentUserEamil(decoded.email);
      }
    }
  }, []);

  useEffect(() => {
    // Define an async function to validate the balance
    const validateBalance = async () => {
      if (selectedCoin && currentUserEmail) {
        await validateBalanceOfCurrentUser();
      }
    };

    // Call the validate balance function
    validateBalance();
  }, [selectedCoin, currentUserEmail]);

  const { Option } = Select;

  useEffect(() => {
    if (token === 'crypto') {
      const filter = initialTokens.filter(
        (x) => x.isStock === false && x.isETF === false
      );
      setFilteredtokens(filter);
      setSelectedCoin(filter[0].title);
      setSelectedCoinObj(filter[0]);
    } else if (token === 'stocktokens') {
      const filter = initialTokens.filter((x) => x.isStock === true);
      setFilteredtokens(filter);
      setSelectedCoin(filter[0].title);
      setSelectedCoinObj(filter[0]);
    } else if (token === 'etf') {
      const filter = initialTokens.filter((x) => x.isETF === true);
      setFilteredtokens(filter);
      setSelectedCoin(filter[0].title);
      setSelectedCoinObj(filter[0]);
    }
  }, [token, selectedCoinObj]);

  React.useEffect(() => {
    onStateChange({
      selectedCoin,
      receiveAmount,
      currentUserBalance: userBalance,
    });
  }, [selectedCoin, receiveAmount]);

  const onChangeReceiveAmt = (e) => {
    const amount = e.target.value;
    setReceiveAmount(amount + '');
    if (amount > userBalance) {
      setBalanceError('Insufficient balance');
    } else {
      setBalanceError('');
    }
  };

  const handleContinue = () => {
    if (balanceError) {
      // Optionally, show an alert or a modal
      return;
    }
    onNext(); // Continue to the next step
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box className="send-box staking-toggle">
        <h1 className="font_30x">Enter Amount</h1>
        <br />
        <div className="font_13x">Send to</div>
        <div className="d-flex padding-t-1x align-items-center">
          <img
            src={recipientProfilePic}
            alt="Profile"
            style={{ marginRight: '10px', width: '32px' }}
          />
          <div className="font_13x">{recipient}</div>
        </div>
        <br />
        <Box
          className="d-flex justify-content-between padding-t-1x "
          style={{ gap: '5px' }}
        >
          <Box minWidth={'49%'}>
            <label>Type</label>
            <CustomSelectBox
              items={[
                { name: 'Crypto', value: 'crypto' },
                { name: 'Stock Tokens', value: 'stocktokens' },
                { name: 'ETF', value: 'etf' },
              ]}
              type={'Type'}
              onCurrencyChange={handleChangeType}
              value={token}
            />
          </Box>
          <Box minWidth={'49%'}>
            <label>Currency</label>
            <CustomSelectBox
              items={filteredtokens?.filter(
                (seltoken) =>
                  seltoken.title !== 'BTC' && seltoken.title !== 'LTC'
              )}
              type={'Currency'}
              onCurrencyChange={handleChangeCurrency}
              value={selectedCoinObj?.address}
              isCurrency={true}
            />
          </Box>
        </Box>
        <br />
        <div className="padding-t-1x">
          <label>Amount</label>

          <div
            className=" d-flex flex-justify-between flex-align-center"
            style={{ margin: '-15px 0px' }}
          >
            <InputField
              type="number"
              placeholder="Enter Amount"
              value={receiveAmount}
              onChange={onChangeReceiveAmt}
            />
          </div>

          {showUserBalance && (
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
              Your balance: {userBalance} {selectedCoin}
            </Typography>
          )}
          {balanceError && (
            <Typography color="error" style={{ marginTop: '15px' }}>
              {balanceError}
            </Typography>
          )}
        </div>
        <br />
        <div className="">
          <br />
          {/* <Button
            className="continue-btn"
            variant="contained"
            onClick={handleContinue}
            disabled={receiveAmount === undefined || receiveAmount.trim() === '' || receiveAmount === null}
            disableTouchRipple
          >
            Continue
          </Button> */}

          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={handleContinue}
            disabled={!!balanceError || !receiveAmount}
            disableTouchRipple
            text={'Continue'}
          />
        </div>
      </Box>
    </Box>
  );
};

const FileComponent3 = ({
  onPrev,
  onNext,
  selectedCoin,
  receiveAmount,
  email,
  username,
  profilePic,
  currentUserBalance,
}) => {
  const [selectedCoinObj, setSelectedCoinObj] = useState({
    address: '0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A',
    title: '',
  });

  const classes = useStyles();
  const user_img =
    localStorage.getItem('userlogged') === 'normal' ? people_green : people;
  const recipient = email || username;
  const recipientProfilePic = profilePic || user_img;
  const [error, setError] = useState('');

  const { Option } = Select;
  useEffect(() => {
    let getRequiredCoin = initialTokens.find((x) => x.title === selectedCoin);
    setSelectedCoinObj(getRequiredCoin);
  }, [selectedCoin]);

  const currentUserEmail =
    localStorage.getItem('user') !== null ? localStorage.getItem('user') : '';

  const handleResponse = (res) => {
    if (res.status === 200) {
      onNext();
    } else {
      setError(res.data.message || 'An error occurred. Please try again.');
    }
  };

  const sendAmount = async () => {
    setError('');
    let network = selectedCoin === 'INEX' ? 'Binance Smart Chain' : '';
    if (email) {
      const res = await createSendTxByEmail(
        email,
        receiveAmount,
        currentUserEmail,
        selectedCoin,
        network
      );
      handleResponse(res);
    } else if (username) {
      const res = await createSendTxByUsername(
        username,
        receiveAmount,
        currentUserEmail,
        selectedCoin,
        network
      );
      handleResponse(res);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box className="send-box staking-toggle">
        <h1 className="font_30x">Confirm</h1>
        <br />
        <div className="font_15x">Send to</div>
        <div className="d-flex padding-t-1x">
          <img
            src={recipientProfilePic}
            alt="Profile"
            style={{ marginRight: '10px', width: '32px' }}
          />
          <div className="font_13x">{recipient}</div>
        </div>

        <br />
        <div className="padding-t-1x">
          <div className="font_15x  fw-bold">Amount</div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="font_13x">Payee receives</div>
            <div className="font_20x fw-bold">
              {receiveAmount} {selectedCoin}
            </div>
          </div>
        </div>
        <br />

        <div className="font_15x fw-bold">Payment Method</div>
        <div className="d-flex padding-t-1x">
          <img
            src={wallet}
            alt="people"
            style={{ marginRight: '10px', width: '36px' }}
          />
          <div className="font_15x">
            Asset Wallet
            <br />
            <span className="font_13x">
              Balance: {currentUserBalance} {selectedCoin}
            </span>
          </div>
        </div>
        <br />
        <Box className="d-flex justify-content-between padding-t-1x">
          <Box minWidth={'100%'}>
            <label
              className="font_15x fw-bold"
              style={{ marginBottom: '10px' }}
            >
              Sending Asset
            </label>
            <InputField
              type={'Currency'}
              value={selectedCoinObj?.title}
              disabled
            />
          </Box>
        </Box>
        <div className="">
          <br />
          <div className="font_13x">
            Please make sure the payee and amount information is correct.
            Refunds are not supported
          </div>
          <br />
          <div className="d-flex" style={{ gap: 10 }}>
            <GenericButton
              className={classes.outlinedBtn}
              variant="outlined"
              onClick={onPrev}
              disableTouchRipple
              text={' Previous step'}
            />

            <GenericButton
              onClick={sendAmount} //onNext}
              disableTouchRipple
              text={'Confirm'}
            />
          </div>
          {error && (
            <Typography color="error" style={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
        </div>
      </Box>
    </Box>
  );
};

const steps = [
  { label: 'Send to', component: <FileComponent1 /> },
  { label: 'Enter Amount', component: <FileComponent2 /> },
  { label: 'Confirm Payment', component: <FileComponent3 /> },
];

// const useStyles = makeStyles((theme) => ({
//   customIcon: {
//     // backgroundImage: 'url("./HC3.png")', // Replace with your image path
//     backgroundImage: `url(${require('./HC3.png').default})`,
//     backgroundSize: 'cover',
//     width: 24,
//     height: 30,
//   },
// }));

const useStyles = makeStyles((theme) => ({
  customIconContainer: {
    position: 'relative',
    width: 24,
    height: 30,
  },
  activeIcon: {
    // backgroundImage: 'url("./activeIcon.png")', // Replace with your active image path
    backgroundImage: `url(${require('./HC3.png').default})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  inactiveIcon: {
    // backgroundImage: 'url("./inactiveIcon.png")', // Replace with your inactive image path
    backgroundImage: `url(${require('./HC4.png').default})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  completedIcon: {
    // backgroundImage: 'url("./completedIcon.png")', // Replace with your completed image path
    backgroundImage: `url(${require('./HC3.png').default})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  customIcon: {
    // backgroundImage: 'url("./HC3.png")', // Replace with your image path
    backgroundImage: `url(${require('./HC3.png').default})`,
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  stepNumber: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  outlinedBtn: {
    background: 'none !important',
    border: `1px solid ${theme.palette.primary.main} !important`,
    color: `${theme.palette.text.primary} !important`,
  },
  checkIcon: {
    color: 'white',
    width: '5px',
    height: '5px',
  },
  contentWrapper: {
    maxWidth: '1100px',
    margin: '50px auto',
    padding: '20px',
    width: '100%',
  },
}));

export default function HorizontalLinearStepper2() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [coinFromStep2, setCoinFromStep2] = React.useState({
    selectedCoin: '',
    receiveAmount: '',
    email: '',
    username: '',
    profilePic: '',
    userBalance: 0,
  });

  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStateChange = (newState) => {
    setCoinFromStep2((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '70px',
      }}
    >
      <Header />

      <Box className={classes.contentWrapper}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          // sx={{ fill: 'var(--primary_color)' }}
        >
          {localStorage.getItem('userType') !== 'CaptainBee'
            ? steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))
            : steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={({ completed, active }) => (
                      <div className={classes.customIconContainer}>
                        {/* <div
                  className={active ? classes.activeIcon : classes.inactiveIcon}
                /> */}
                        <div
                          className={
                            completed
                              ? classes.completedIcon
                              : activeStep === index
                              ? classes.activeIcon
                              : classes.inactiveIcon
                          }
                        />
                        <div className={classes.stepNumber}>{index + 1}</div>
                      </div>
                    )}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
        </Stepper>
        <Box>
          {activeStep === steps.length ? (
            <Final />
          ) : (
            React.cloneElement(steps[activeStep].component, {
              onNext: handleNext,
              onPrev: handleBack,
              onStateChange: handleStateChange,
              ...coinFromStep2,
            })
          )}
        </Box>
      </Box>
    </Box>
  );
}
