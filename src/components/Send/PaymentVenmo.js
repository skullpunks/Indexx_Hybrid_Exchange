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
import venmo from '../../assets/arts/pay/venmo.svg';
import venmo_qr_light from '../../assets/arts/pay/venmo_qr.svg';
import venmo_qr_dark from '../../assets/arts/pay/venmo_qr_dark.svg';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import OpenNotification from '../OpenNotification/OpenNotification';
import tick from '../../assets/arts/pay/tick.svg';
import upload from '../../assets/arts/pay/upload 1.svg';
import fortune from '../../assets/arts/pay/fortune-10 1.svg';
import {
  createFiatDepositForOrder,
  decodeJWT,
  getOrderDetails,
} from '../../services/api';
import AWS from 'aws-sdk';
import { useTheme } from '@mui/material';
import GenericButton from '../updated/shared/Button';

const S3_BUCKET = 'indexx-exchange';
const REGION = 'ap-northeast-1';
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: REGION,
});
var s3 = new AWS.S3();
const Final = ({
  orderData,
  fromDetails,
  toDetails,
  photoIdFile,
  photoIdUrl,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleWallet = () => {
    if (orderData?.orderType === 'SmartCryptoBuy') {
      navigate('/smart-crypto');
    } else if (orderData?.orderType === 'SmartAPY') {
      navigate('/smart-apy-calculator');
    } else {
      navigate('/wallet/overview');
    }
  };

  const handleExchange = () => {
    navigate('/update/home');
  };
  // Add this inside your component to log the data when it's rendered
  useEffect(() => {
    async function finalDetails() {
      const access_token = String(localStorage.getItem('access_token'));
      const decoded = await decodeJWT(access_token);
      let email = String(decoded.email);
      fromDetails = email;
      toDetails = 'lili@Indexx500Graph.ai';
      if (photoIdUrl) {
        let res = await createFiatDepositForOrder(
          email,
          orderData?.orderId,
          fromDetails,
          toDetails,
          photoIdUrl
        );
      }
    }
    finalDetails();
  }, [photoIdUrl]);

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        className="d-flex flex-direction-column align-items-center"
        style={{
          width: '100%',
          maxWidth: '460px',
          margin: '50px auto',
          padding: '24px',
        }}
      >
        <img src={fortune} alt="check" style={{ width: '60%' }} />
        <div className="font_60x">Thank you</div>
        <div
          className="font_17x"
          style={{
            // width: '350px',
            color: theme.palette.text.primary,
            textAlign: 'center',
          }}
        >
          for choosing Indexx for your{' '}
          {orderData?.orderType === 'SmartCryptoBuy'
            ? 'Smart Crypto'
            : orderData?.orderType === 'SmartAPY'
            ? 'Smart APY'
            : 'Crypto'}{' '}
          purchase!
        </div>
        <div className="font_10x mt-4">
          Our team is diligently verifying your order, and your tokens will be
          in your wallet within 1-2 business days. We appreciate your trust and
          patience!
        </div>
        <br />
        <div className="d-flex mb-2" style={{ gap: 10, minWidth: '100%' }}>
          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={handleWallet}
            disableTouchRipple
            text={'Go to Wallet'}
          />

          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={handleExchange}
            disableTouchRipple
            text={'Go to Exchange'}
          />
        </div>
      </Box>
    </Box>
  );
};

const FileComponent1 = ({
  orderData,
  onNext,
  onStateChange,
  onFromDetailsChange,
  onToDetailsChange,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handlePrev = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="font_15x mt-4" style={{ padding: '24px' }}>
        <WarningAmberIcon /> Kindly transfer the exact amount specified above
        using the provided recipient details
        <h1 className="font_30x text-center mt-5">
          <span style={{ color: theme.palette.text.primary }}>
            Order Amount:{' '}
          </span>
          {String(orderData?.orderType)?.includes('Pack')
            ? orderData?.breakdown?.finalAmountAfterDiscount?.toLocaleString(
                'en-US',
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              )
            : orderData?.breakdown?.inAmount?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
          {orderData?.breakdown?.inCurrenyName}
        </h1>
      </div>
      <Box className="send-box mt-5">
        <Box
          component={'img'}
          src={theme.palette.mode === 'light' ? venmo_qr_light : venmo_qr_dark}
          alt="logo"
          width={'100%'}
        />
        <div className="d-flex mt-4 mb-2" style={{ gap: 10 }}>
          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={handlePrev}
            disableTouchRipple
            text={'Cancel'}
          />

          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={onNext}
            disableTouchRipple
            text={'Confirm payment'}
          />
        </div>
      </Box>
    </Box>
  );
};

const FileComponent2 = ({
  orderData,
  fromDetails,
  toDetails,
  onPrev,
  onNext,
  onStateChange,
  onPhotoIdUrlChange,
}) => {
  const [photoIdFile, setPhotoIdFile] = useState(null);
  const [photoIdFileerror, setPhotoIdFileerror] = useState(null);
  const [photoIdUrl, setPhotoIdUrl] = useState(null);
  const theme = useTheme();
  const preventDefault = (e) => {
    e.preventDefault();
  };

  const handleNext = () => {
    if (photoIdFile === null) {
      setPhotoIdFileerror('Please add a proof');
      return;
    }
    onNext();
  };

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
      setPhotoIdFileerror('');
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
      setPhotoIdFileerror('');
      uploadToS3(file, 'Receipt');
    }
  };

  const uploadToS3 = async (file, fileType) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    try {
      await s3.putObject(params).promise();
      // Construct and set the file URL
      const url = `https://${params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${params.Key}`;

      console.log('url', url);
      setPhotoIdUrl(url);
      onPhotoIdUrlChange(url);
    } catch (error) {
      console.log('Error here', error);
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
          <span style={{ color: theme.palette.text.primary }}>
            {' '}
            Upload proof of payment
          </span>
        </h1>
        <br />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            width: '100%',
            mb: 4,
            gap: 1,
          }}
        >
          <Typography
            variant="text"
            fontSize={'13px'}
            width={'100%'}
            textAlign={'left'}
            mb={2}
          >
            Upload supporting file (jpeg, png, pdf, Maximum 10MB file size)
            {photoIdFileerror && (
              <span
                style={{
                  color: theme.palette.text.primary,
                  fontSize: '12px',
                  paddingLeft: '20px',
                }}
              >
                {photoIdFileerror}
              </span>
            )}
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
                  <img
                    src={tick}
                    alt="tick"
                    style={{ marginRight: '10px', width: '40px' }}
                  />
                  {photoIdFile.name}
                  <span
                    onClick={() => setPhotoIdFile(null)}
                    disableTouchRipple
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    <CloseIcon
                      fontSize={'1rem'}
                      color={theme.palette.text.primary}
                    />
                  </span>
                </p>
              </div>
            ) : (
              <p>
                <Box
                  component={'img'}
                  src={upload}
                  alt="logo"
                  width={'50px'}
                  mt={2}
                />
                <br />
                Drag and drop a file here or
              </p>
            )}
            <label htmlFor="profileInput">
              <Button
                variant="outlined"
                component="span"
                disableTouchRipple
                sx={{
                  borderColor: 'var(--border-color)',
                  borderRadius: '4px',
                  color: theme.palette.text.primary,
                  px: 10,
                  py: 1,
                  my: 3,
                  textTransform: 'none',
                  fontSize: '13px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor: 'var(--border-color)',
                    boxShadow: 'none',
                    borderWidth: '4px',
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
                accept="image/*"
              />
            </label>
          </div>
        </Box>
        <div className="d-flex mt-4 mb-2" style={{ gap: 10 }}>
          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={onPrev}
            disableTouchRipple
            text={'Cancel'}
          />

          <GenericButton
            className="continue-btn"
            variant="contained"
            onClick={handleNext}
            disabled={photoIdFile === null}
            disableTouchRipple
            text={'Confirm payment'}
          />
        </div>
      </Box>
    </Box>
  );
};

const steps = [
  {
    label: 'Scan QR Code',
    component: (orderData) => <FileComponent1 orderData={orderData} />,
  },
  {
    label: 'Upload Proof of Payment',
    component: (orderData) => <FileComponent2 orderData={orderData} />,
  },
  {
    label: 'Payment Confirmation',
    component: (orderData) => <Final orderData={orderData} />,
  },
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
    width: '5px',
    height: '5px',
  },
}));

export default function PaymentVenmo() {
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
  const [orderData, setOrderData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromDetails, setFromDetails] = useState({});
  const [toDetails, setToDetails] = useState({});
  const [photoIdFile, setPhotoIdFile] = useState(null);
  const [photoIdUrl, setPhotoIdUrl] = useState(null);

  // Define handler functions
  const handleFromDetailsChange = (details) => {
    setFromDetails(details);
  };

  const handleToDetailsChange = (details) => {
    setToDetails(details);
  };

  const handlePhotoIdFileChange = (file) => {
    console.log('I am here', file);
    setPhotoIdFile(file);
  };

  useEffect(() => {
    const orderIdFromParam = searchParams.get('orderId');
    if (orderIdFromParam !== undefined) {
      let access_token = String(localStorage.getItem('access_token'));
      let decoded = decodeJWT(access_token);
      getOrderDetails(decoded.email, orderIdFromParam).then((res) => {
        if (res.status === 200) {
          let orderData = res.data;
          setOrderData(orderData);
        } else {
          console.log('Something went wrong. Please try again.');
        }
      });
    }
  }, [searchParams]);

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
    setCoinFromStep2((prevState) => ({ ...prevState, ...newState }));
  };

  const steps = [
    {
      label: 'Scan QR Code',
      component: () => (
        <FileComponent1
          orderData={orderData}
          onNext={handleNext}
          onFromDetailsChange={handleFromDetailsChange}
          onToDetailsChange={handleToDetailsChange}
        />
      ),
    },
    {
      label: 'Upload Proof of Payment',
      component: () => (
        <FileComponent2
          orderData={orderData}
          fromDetails={fromDetails}
          toDetails={toDetails}
          onPrev={handleBack}
          onNext={handleNext}
          onPhotoIdFileChange={handlePhotoIdFileChange}
          onPhotoIdUrlChange={setPhotoIdUrl}
        />
      ),
    },
    {
      label: 'Payment Confirmation',
      component: () => (
        <Final
          orderData={orderData}
          fromDetails={fromDetails}
          toDetails={toDetails}
          photoIdFile={photoIdFile}
          photoIdUrl={photoIdUrl}
        />
      ),
    },
  ];

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
      <Box
        className="d-flex justify-content-center"
        sx={{ width: '50%', mb: 5 }}
      >
        <Typography variant="h3"></Typography>
        <Box component={'img'} src={venmo} alt="logo" width={'110px'} />
      </Box>
      <Box sx={{ width: '100%', maxWidth: '650px' }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ fill: 'var(--primary_color)' }}
        >
          {localStorage.getItem('userlogged') === 'normal'
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
            <Final
              orderData={orderData}
              fromDetails={fromDetails}
              toDetails={toDetails}
              photoIdFile={photoIdFile}
            />
          ) : (
            steps[activeStep].component()
          )}
        </Box>
        {/* <Box>
          {activeStep === steps.length ? <Final orderData={orderData} /> : (
            React.cloneElement(
              steps[activeStep].component(orderData), {
              onNext: handleNext,
              onPrev: handleBack,
              onStateChange: handleStateChange,
              ...coinFromStep2,
            })
          )}
        </Box> */}
      </Box>
    </Box>
  );
}
