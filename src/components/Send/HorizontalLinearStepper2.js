import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import people from '../../assets/arts/people.svg';
import check from '../../assets/arts/check 2 3.svg';
import wallet from '../../assets/BSheader/funding grey 1.svg';
import './HorizontalLinearStepper2.css';
import '../BuySell/BuySellDummy.css';
import '../BSDepositWithdraw/BSWithdraw.css';
import { Select } from 'antd';
import initialTokens from '../../utils/Tokens.json';

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
        
        <img src={check} alt="check" style={{width: "128px"}}/>
        <br />
        <h1 className="font_30x">Send Successful</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{minWidth:"100%"}}>
          <Button
            className="continue-btn"
            variant="contained"
            onClick={() => window.location.reload()}
            disableTouchRipple
            style={{minWidth:"100%"}}
          >
            Done
          </Button>
        </div>
      </Box>
    </Box>
  );
};

const FileComponent1 = ({ onNext }) => {
  const [type, setType] = useState('mail');
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState('');
  const [username, setUserName] = useState();
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValid ? '' : 'Invalid email address');
    return isValid;
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
        <h1 className="font_30x">Send to</h1>
        <br />
        <div className="font_13x">
          Send fiat or crypto to hive users via email or user name
        </div>
        <br />
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

        <br />
        <br />
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
                <Box className="d-flex" sx={{ gap: 3, mt: 1 }}>
                  <TextField
                    variant="outlined"
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
                    // onBlur={validateEmail}
                  />
                </Box>
              </>
            ) : (
              <>
                <Typography variant="text" fontSize={'13px'} textAlign={'left'}>
                  Recipient's User Name
                </Typography>
                <Box className="d-flex" sx={{ gap: 3, mt: 1 }}>
                  <TextField
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
              </>
            )}
          </Box>
          <br />
          <Button
            className="continue-btn"
            variant="contained"
            onClick={onNext}
            disabled={(username === undefined || username.trim() === '' || username === null) && (email === undefined || email.trim() === '' || email === null || emailError !== '')}
            disableTouchRipple
          >
            Continue
          </Button>
        </div>
      </Box>
    </Box>
  );
};

const FileComponent2 = ({ onNext, onStateChange }) => {
  const [token, setToken] = useState('crypto');
  const [filteredtokens, setFilteredtokens] = useState();
  const [receiveAmountt, setReceiveAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('IN500');
  const [selectedCoinObj, setSelectedCoinObj] = useState({
    address: '0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A',
    title: '',
  });
  const handleChangeCurrency = async (value) => {
    let getRequiredCoin = filteredtokens.find((x) => x.address === value);
    setSelectedCoin(String(getRequiredCoin?.title));
    // setSelectedCoinObj(String(getRequiredCoin?.title));
    setSelectedCoinObj(getRequiredCoin);   
  };

  const handleChangeType =  (value) => {
    setToken(value);   
  };

  const onChangeReceiveAmt = (e) => {
    // if (e.currentTarget.value) {
    let val = e.currentTarget.value;
    setReceiveAmount(val + '');
  };
  const { Option } = Select;

  useEffect(() => {
    if(token === 'crypto'){
      const filter =  initialTokens.filter((x) => x.isStock === false && x.isETF === false);
      setFilteredtokens(filter);
      setSelectedCoin(filter[0].title);
      setSelectedCoinObj(filter[0]);   
    }
    else if(token === 'stocktokens'){
      const filter =  initialTokens.filter((x) => x.isStock === true);
      setFilteredtokens(filter);
      setSelectedCoin(filter[0].title);
      setSelectedCoinObj(filter[0]);   
    }
    else if(token === 'etf'){
      const filter =  initialTokens.filter((x) => x.isETF === true);
      setFilteredtokens(filter);
      setSelectedCoin(filter[0].title);
      setSelectedCoinObj(filter[0]);   
    }
  }, [token])
  
  React.useEffect(() => {
    onStateChange({ selectedCoin, receiveAmountt });
    console.log('changing');
  }, [selectedCoin, receiveAmountt]);


  
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
        <div className="font_13x">
          Send to
        </div>
        <div className='d-flex padding-t-1x align-items-center'>
          <img src={people} alt="people" style={{marginRight:"10px"}}/>
          <div className="font_13x">
          willie@sample.com
        </div>
        </div>
        <br />
        <Box className="d-flex justify-content-between padding-t-1x">
          <Box minWidth={"49%"}>
          <label>Type</label>
          <div className=" d-flex flex-justify-between flex-align-center">
            <Select
              dropdownStyle={{ width: '300px', maxHeight: '400px', overflow: 'auto' }}
              className="width-100"
              onChange={handleChangeType}
              defaultValue="Select a Coin to Withdraw"
              value={token}
            >
            <Option key="crypto" value="crypto">
              Crypto
            </Option>
            <Option key="stocktokens" value="stocktokens">
              Stock Tokens
            </Option>
            <Option key="etf" value="etf">
              ETF
            </Option>
            </Select>
            {/* <div className='d-flex'><img src={IN500} alt="IN500" width="38"   /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div> */}
            {/* <CaretDownOutlined /> */}

            {/* <RightOutlined /> */}
          </div>
          </Box>
          <Box minWidth={"49%"}>
          <label>Currency</label>
          <div className=" d-flex flex-justify-between flex-align-center">
            <Select
              dropdownStyle={{ width: '300px', maxHeight: '400px', overflow: 'auto' }}
              className="width-100"
              onChange={handleChangeCurrency}
              defaultValue="Select a Coin to Withdraw"
              value={selectedCoinObj?.address}
            >
              {filteredtokens?.filter(
                  (seltoken) => seltoken.title !== 'BTC' && seltoken.title !== 'LTC'
                )
                .map((seltoken, index) => {
                  return (
                    <Option
                      key={index}
                      value={seltoken.address}
                      type="link"
                      className="common__token d-flex bs_token_container"
                      data-address={seltoken.address}
                    >
                      <div className="d-flex">
                        <img
                          src={
                            require(`../../assets/token-icons/${seltoken.image}.png`)
                              .default
                          }
                          alt="IN500"
                          width="27"
                          height="27"
                        />
                        <div className="font_20x padding-l-1x d-flex flex-align-center">
                          {seltoken.title}
                        </div>
                      </div>
                    </Option>
                  );
                })}
            </Select>
            {/* <div className='d-flex'><img src={IN500} alt="IN500" width="38"   /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div> */}
            {/* <CaretDownOutlined /> */}

            {/* <RightOutlined /> */}
          </div>
          </Box>
</Box>
        <br />
        <div className="padding-t-1x">
            <label>Amount</label>
            <br />
            <div
              className="select_container d-flex flex-justify-between flex-align-center"
              style={{ paddingLeft: 10 }}
            >
              <input
                type="number"
                placeholder="Enter Amount"
                className="width-100 font_13x outline-none"
                style={{ border: 'none' }}
                value={receiveAmountt}
                onChange={onChangeReceiveAmt}
              />
              <div className="d-flex">
                <span className="padding-l-1x">{selectedCoin}</span>
              </div>
            </div>
          </div>
          <div className="font_15x padding-t-1x">
            Balance : 500 {selectedCoin}
            </div>
          <br />
        <div className="">
          
          <br />
          <Button
            className="continue-btn"
            variant="contained"
            onClick={onNext}
            disabled={receiveAmountt === undefined || receiveAmountt.trim() === '' || receiveAmountt === null}
            disableTouchRipple
          >
            Continue
          </Button>
        </div>
      </Box>
    </Box>
  );
};

const FileComponent3 = ({ onPrev, onNext, selectedCoin, receiveAmountt }) => {
  const [selectedCoinObj, setSelectedCoinObj] = useState({
    address: '0xf58e5644a650C0e4db0d6831664CF1Cb6A3B005A',
    title: '',
  });
  // const handleChangeCurrency = async (value) => {
  //   let getRequiredCoin = initialTokens.find((x) => x.title === selectedCoin);
  //   setSelectedCoinObj(String(getRequiredCoin?.title));   
  // };
  const { Option } = Select;
  useEffect(() => {
    let getRequiredCoin = initialTokens.find((x) => x.title === selectedCoin);
    setSelectedCoinObj(getRequiredCoin);   
  }, [selectedCoin])
  
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
        <div className="font_15x">
          Send to
        </div>
        <div className='d-flex padding-t-1x'>
          <img src={people} alt="people" style={{marginRight:"10px"}}/>
          <div className="font_13x">
          willie@sample.com
          <br />
          willie12345
          </div>
        </div>
      
        <br />
        <div className="padding-t-1x">
            <div className="font_15x  fw-bold">
            Amount
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className="font_13x">
              Payee receives
              </div>
              <div className="font_20x fw-bold">
              {receiveAmountt} {selectedCoin}
              </div>
        </div>
          </div>
          <br />

          <div className="font_15x fw-bold">
            Payment Method
        </div>
        <div className='d-flex padding-t-1x'>
          <img src={wallet} alt="people" style={{marginRight:"10px", width:"36px"}}/>
          <div className="font_15x">
            Funding Wallet
          <br />
          <span className='font_13x'>Balance: 2000 {selectedCoin}</span>
          </div>
        </div>
        <br />
          <Box className="d-flex justify-content-between padding-t-1x">
          <Box minWidth={"100%"}>
          <label className='font_15x fw-bold'>Sending Asset</label>
          <div className=" d-flex flex-justify-between flex-align-center">
            <Select
              dropdownStyle={{ width: '300px', maxHeight: '400px', overflow: 'auto' }}
              className="width-100"
              // onChange={handleChangeCurrency}
              defaultValue="Select a Coin to Withdraw"
              value={selectedCoinObj?.address}
              disabled
            >
              {initialTokens
                .filter(
                  (seltoken) => seltoken.title !== 'BTC' && seltoken.title !== 'LTC'
                )
                .map((seltoken, index) => {
                  return (
                    <Option
                      key={index}
                      value={seltoken.address}
                      type="link"
                      className="common__token d-flex bs_token_container"
                      data-address={seltoken.address}
                    >
                      <div className="d-flex">
                        <img
                          src={
                            require(`../../assets/token-icons/${seltoken.image}.png`)
                              .default
                          }
                          alt="IN500"
                          width="27"
                          height="27"
                        />
                        <div className="font_20x padding-l-1x d-flex flex-align-center">
                          {seltoken.title}{' '}
                          <span
                            style={{ color: 'rgba(95, 95, 95, 0.5)' }}
                            className="margin-l-0_5x"
                          >
                            {seltoken.subTitle}
                          </span>{' '}
                        </div>
                      </div>
                    </Option>
                  );
                })}
            </Select>
            {/* <div className='d-flex'><img src={IN500} alt="IN500" width="38"   /><div className='font_20x padding-l-1x d-flex flex-align-center'>IN500 <span style={{ color: "rgba(95, 95, 95, 0.5)" }} className="margin-l-0_5x">Indexx 500</span> </div></div> */}
            {/* <CaretDownOutlined /> */}

            {/* <RightOutlined /> */}
          </div>
          </Box>
        </Box>
        <div className="">
        <br />
        <div className="font_13x">
          Please make sure the payee and amount information is correct. Refunds are not supported
        </div>
          <br />
          <div className='d-flex' style={{gap:10}}>
          <Button
            className="continue-outlined-btn"
            variant="outlined"
            onClick={onPrev}
            disableTouchRipple
          >
            Previous step
          </Button>
          <Button
            className="continue-btn"
            variant="contained"
            onClick={onNext}
            disableTouchRipple
          >
            Confirm
          </Button>
          </div>
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

export default function HorizontalLinearStepper2() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [coinFromStep2, setCoinFromStep2] = React.useState({ selectedCoin: '', receiveAmountt:'' });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStateChange = (state) => {
    setCoinFromStep2(state);
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '50%', mb: 5 }}>
        <Typography variant="h3">Send</Typography>
      </Box>
      <Box sx={{ width: '40%' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ fill: 'yellow' }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
        {activeStep === steps.length ? <Final /> : (
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