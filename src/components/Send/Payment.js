import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import './HorizontalLinearStepper2.css';
import '../BuySell/BuySellDummy.css';
import '../BSDepositWithdraw/BSWithdraw.css';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import zelle from '../../assets/arts/pay/zelle.svg';
import zelle_qr from '../../assets/arts/pay/zel-qr.svg';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import OpenNotification from '../OpenNotification/OpenNotification';
import tick from "../../assets/arts/pay/tick.svg";
import upload from "../../assets/arts/pay/upload 1.svg";
import fortune from "../../assets/arts/pay/fortune-10 1.svg";

const Final = () => {

  const navigate = useNavigate();
  const handleWallet = () =>{
    navigate('/indexx-exchange/buy-sell/wallet');
  }
  const handleExchange = () =>{
    navigate('/');
  }

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box className="d-flex flex-direction-column align-items-center" width={"55%"}>
        <br />
        <br />

        <img src={fortune} alt="check" 
        // style={{ width: "128px" }} 

        />
        <br />
        <div className="font_60x">
        Thank you
        </div>
        <div className="font_17x" style={{width:"350px"}}>
        for choosing Indexx for your crypto purchase! 
        </div>
        <div className="font_10x mt-4">
        Our team is diligently verifying your order, and your tokens will be in your wallet within 1-2 business days. We appreciate your trust and patience!
        </div>
        <br />
        <br />
        <div className='d-flex mb-2' style={{ gap: 10, minWidth: "100%" }}>
            <Button
              className="continue-btn"
              variant="contained"
              onClick={handleWallet}
              disableTouchRipple
            >
              Go to Wallet
            </Button>
            <Button
              className="continue-btn"
              variant="contained"
              onClick={handleExchange}
              disableTouchRipple
            >
              Go to Exchange
            </Button>
          </div>
      </Box>
    </Box>
  );
};

const FileComponent1 = ({ onNext, onStateChange }) => {

  const navigate = useNavigate();
  const handlePrev = () =>{
    navigate('/')
  }
  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"column"
      }}
    >
        <div className="font_15x mt-4">
        <WarningAmberIcon/>
        Kindly transfer the exact amount specified above using the provided recipient details
        <h1 className="font_30x text-center mt-5">
        Order Amount: 200 USD
        </h1>
        </div>
      <Box className="send-box mt-5">
        <Box
          component={"img"}
          src={zelle_qr}
          alt="logo"
          width={"100%"}
        />
        <div className='d-flex mt-4 mb-2' style={{ gap: 10 }}>
            <Button
              className="continue-btn"
              variant="contained"
              onClick={handlePrev}
              disableTouchRipple
            >
              Cancel
            </Button>
            <Button
              className="continue-btn"
              variant="contained"
              onClick={onNext}
              disableTouchRipple
            >
              Confirm payment
            </Button>
          </div>
      </Box>
    </Box>
  );
};

const FileComponent2 = ({ onPrev, onNext, onStateChange }) => {

  const [photoIdFile, setPhotoIdFile] = useState(null);
  const [photoIdFileerror, setPhotoIdFileerror] = useState(null);

  const preventDefault = (e) => {
    e.preventDefault();
  };
  
  const handleNext = () => {
    if(photoIdFile === null){
      setPhotoIdFileerror("Please add a proof")
      return;
    }
    onNext();
  }

  const handleDropProfile = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Check file size
      if (file.size > 10 * 1024 * 1024) {
        OpenNotification('error', 'File size should be less than 10MB');

        return;
      }

      // Check file extension
      const allowedExtensions = ['jpeg', 'jpg', 'png', 'pdf'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        OpenNotification('error', 'File must be a JPEG or PNG image or a PDF');
        return;
      }

      setPhotoIdFile(file);
      setPhotoIdFileerror("")
      // uploadToS3(file, 'photoId');
    }
  };

  const handlePhotoIdFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size
      if (file.size > 10 * 1024 * 1024) {
        OpenNotification('error', 'File size should be less than 10MB');

        return;
      }

      // Check file extension
      const allowedExtensions = ['jpeg', 'jpg', 'png', 'pdf'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        OpenNotification('error', 'File must be a JPEG or PNG image or a PDF');
        return;
      }

      setPhotoIdFile(file);
      setPhotoIdFileerror("");
      // uploadToS3(file, 'photoId');
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
        <h1 className="font_28x">
        Upload proof of payment
        </h1>
        <br />
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "100%",
            mb: 4,
            gap: 1,
          }}>
            <Typography variant="text" fontSize={"13px"} width={"100%"} textAlign={"left"} mb={2}>
              Upload supporting file
              {photoIdFileerror &&
                <span style={{ color: "#d32f2f", fontSize: "12px", paddingLeft: "20px" }}>
                  {photoIdFileerror}
                </span>
              }
            </Typography>
            <div
              onDrop={handleDropProfile}
              onDragOver={preventDefault}
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: '4px',
                width: '100%',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              {photoIdFile ? (
                <div>
                  <p>
                  <img  src={tick} alt="tick" style={{marginRight : "10px", width:"40px"}}/>
                    {photoIdFile.name}
                    <Button
                      onClick={() => setPhotoIdFile(null)}
                      disableTouchRipple
                      sx={{width:"auto", color:"var(--body_color)", boxShadow:"none"}}
                    >
                      <CloseIcon
                        fontSize={'1rem'}
                        color='#171c26'
                      />
                    </Button>
                  </p>
                </div>
              ) : (
                <p>
                <Box
                  component={"img"}
                  src={upload}
                  alt="logo"
                  width={"50px"}
                  mt={2}
                />
                <br />
                Drag and drop a file here or</p>
              )}
              <label htmlFor="profileInput">
                <Button
                  variant="outlined"
                  component="span"
                  disableTouchRipple
                  sx={{
                    borderColor: 'var(--border-color)',
                    borderRadius: '4px',
                    color: 'var(--body_color)',
                    px: 10,
                    py: 1,
                    my:3,
                    textTransform: 'none',
                    fontSize: '13px',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderColor: 'var(--border-color)',
                      boxShadow: 'none',
                      borderWidth:"4px",
                    },
                  }}
                >
                  Browse File
                </Button>
                <input
                  type="file"
                  onChange={handlePhotoIdFileChange}
                  style={{ display: 'none' }}
                  id="profileInput"
                  accept='image/*'
                />
              </label>
            </div>
          </Box>
        <div className='d-flex mt-4 mb-2' style={{ gap: 10 }}>
            <Button
              className="continue-btn"
              variant="contained"
              onClick={onPrev}
              disableTouchRipple
            >
              Cancel
            </Button>
            <Button
              className="continue-btn"
              variant="contained"
              onClick={handleNext}
              disabled={photoIdFile === null}
              disableTouchRipple
            >
              Confirm payment
            </Button>
          </div>
      </Box>
    </Box>
  );
};

const steps = [
  { label: 'Scan QR Code', component: <FileComponent1 /> },
  { label: 'Upload proof of Payment', component: <FileComponent2 /> },
  { label: ' Payment Confirmation', component: <Final /> },
];

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
  checkIcon: {
    color: 'white',
    width:'5px',
    height:'5px',
  },
}));

export default function Payment() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [coinFromStep2, setCoinFromStep2] = React.useState({ selectedCoin: '', receiveAmount: '', email: '', username: '', profilePic: '', userBalance: 0 });

  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStateChange = (newState) => {
    setCoinFromStep2(prevState => ({ ...prevState, ...newState }));
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
      <Box className="d-flex justify-content-center" sx={{ width: '50%', mb: 5 }}>
        <Typography variant="h3"></Typography>
        <Box
          component={"img"}
          src={zelle}
          alt="logo"
          width={"110px"}
        />
      </Box>
      <Box sx={{ width: '40%' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ fill: 'var(--primary_color)' }}
        >
        {localStorage.getItem("userlogged") === 'normal' ? 
          (steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          )))
          :
          (steps.map((step, index) => (
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
          )))
        }
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
