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
import wire from '../../assets/arts/pay/wire.svg';
import zelle_qr from '../../assets/arts/pay/zel-qr_white.svg';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import OpenNotification from '../OpenNotification/OpenNotification';
import tick from '../../assets/arts/pay/tick.svg';
import upload from '../../assets/arts/pay/upload 1.svg';
import fortune from '../../assets/arts/pay/fortune-10 1.svg';
import { TextField, useTheme } from '@mui/material';
import {
  createFiatDepositForOrder,
  decodeJWT,
  getOrderDetails,
} from '../../services/api';
import AWS from 'aws-sdk';
import GenericButton from '../updated/shared/Button';
import InputField from '../updated/shared/TextField';

const S3_BUCKET = 'indexx-exchange';
const REGION = 'ap-northeast-1';
AWS.config.update({
  accessKeyId: process?.env?.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process?.env?.REACT_APP_SECRET_ACCESS_KEY,
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
      const res = await createFiatDepositForOrder(
        email,
        orderData?.orderId,
        fromDetails,
        toDetails,
        photoIdUrl
      );
    }
    finalDetails();
  }, [fromDetails, toDetails, photoIdUrl]);

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
          style={{ color: theme.palette.text.primary, textAlign: 'center' }}
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
            text="Go to Exchange"
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
  const [name, setName] = useState('');
  const [Bank, setBank] = useState('');
  const [accno, setaccno] = useState();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);

  const [fromDetails, setFromDetails] = useState({
    name: '',
    bankName: '',
    bankAccountNumber: '',
    address: '',
    phoneNumber: '',
  });

  const toDetails = {
    recipientName: 'Indexx.ai',
    recipientAddress: '41775 Elm St, ste. 202 Murrieta CA 92562 USA',
    bankName: 'Wells Fargo Bank, NA',
    bankAccountNumber: '1793811546',
    bankAddress: '420 Montgomery Street, San Francisco, CA 94104',
    wireRoutingNumber: '121000248',
    swiftCode: 'WFBIUS6S',
  };

  const validatePhone = (phoneNumber) => {
    // Implement your phone number validation logic here
    // For simplicity, let's assume it should be a 10-digit number
    const isValid = /^\d{10}$/.test(phoneNumber);
    return isValid;
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    console.log(phoneNumber);
    setPhone(phoneNumber);
    handleInputChange(e, 'phoneNumber');
    // Validate the phone number and update the state accordingly
    setIsValidPhone(validatePhone(phoneNumber));
  };

  const handleInputChange = (e, field) => {
    setFromDetails((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onFromDetailsChange(fromDetails); // Pass the state up to the parent component
    onToDetailsChange(toDetails); // Pass the state up to the parent component
    onNext(); // Go to the next step
  };

  const isAnyInputBlank = (name, bankName, bankAccNo, address, phoneNumber) => {
    return (
      !name ||
      name.trim() === '' ||
      name === null ||
      name === undefined ||
      !bankName ||
      bankName.trim() === '' ||
      bankName === null ||
      bankName === undefined ||
      !bankAccNo ||
      bankAccNo.trim() === '' ||
      bankAccNo === null ||
      bankAccNo === undefined ||
      !address ||
      address.trim() === '' ||
      address === null ||
      address === undefined ||
      !phoneNumber ||
      phoneNumber.trim() === '' ||
      phoneNumber === null ||
      phoneNumber === undefined ||
      !validatePhone(phoneNumber)
    );
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
      <div className="font_15x text-left mt-4">
        <h1 className="font_30x text-left mb-5">
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
        <WarningAmberIcon /> Kindly transfer the exact amount specified above
        using the provided recipient details
      </div>
      <Box className="mt-5 w-100">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            mt: 7,
            maxWidth: '1520px',
          }}
        >
          <Typography variant="text" fontSize={'25px'} fontWeight={500} mb={2}>
            Recipient Information
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              For Domestic wire transfers
            </Typography>
            <Box
              sx={{ mb: 2, width: '64%', fontSize: '15px', fontWeight: 'bold' }}
            >
              Wire Routing Transit Number (ABA / RTN) 121000248
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              For International wire transfers
            </Typography>
            <Box
              sx={{ mb: 2, width: '64%', fontSize: '15px', fontWeight: 'bold' }}
            >
              SWIFT / BIC code WFBIUS6S
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Recipient Name
            </Typography>
            <Box
              sx={{ mb: 2, width: '64%', fontSize: '15px', fontWeight: 'bold' }}
            >
              Indexx.ai
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Recipient Address
            </Typography>
            <Box
              sx={{ mb: 2, width: '64%', fontSize: '15px', fontWeight: 'bold' }}
            >
              41775 Elm St, ste. 202 Murrieta CA 92562 USA
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Bank Name
            </Typography>
            <Box
              sx={{ mb: 2, width: '64%', fontSize: '15px', fontWeight: 'bold' }}
            >
              Wells Fargo Bank, NA
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Bank Account Number
            </Typography>
            <Box
              sx={{ mb: 2, width: '64%', fontSize: '15px', fontWeight: 'bold' }}
            >
              1793811546
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Bank Address
            </Typography>
            <Box
              sx={{ mb: 2, width: '64%', fontSize: '15px', fontWeight: 'bold' }}
            >
              420 Montgomery Street, San Francisco, CA 94104
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            mt: 7,
            maxWidth: '1520px',
          }}
        >
          <Typography variant="text" fontSize={'25px'} fontWeight={500} mb={2}>
            Customer Information (For Verification)
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              my: 2,
              gap: '10px',
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Full Name
            </Typography>
            <InputField
              //   label="First Name"
              placeholder="Name"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange(e, 'name');
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              mb: 2,
              gap: '10px',
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Bank Name
            </Typography>
            <InputField
              //   label="Account Name"
              variant="outlined"
              placeholder="Add bank name"
              value={Bank}
              onChange={(e) => {
                setBank(e.target.value);
                handleInputChange(e, 'bankName');
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              mb: 2,
              gap: '10px',
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Bank Account Number
            </Typography>
            <InputField
              //   label="Account Name"
              variant="outlined"
              placeholder="Add bank account number"
              value={accno}
              onChange={(e) => {
                setaccno(e.target.value);
                handleInputChange(e, 'bankAccountNumber');
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              mb: 2,
              gap: '10px',
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Address
            </Typography>
            <InputField
              //   label="Account Name"
              variant="outlined"
              placeholder="Add address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                handleInputChange(e, 'address');
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              width: '100%',
              mb: 2,
              gap: '10px',
            }}
          >
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Phone Number
            </Typography>
            <InputField
              variant="outlined"
              placeholder="Add phone number"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              error={!isValidPhone} // Highlight the input if the phone number is not valid
              helperText={!isValidPhone ? 'Invalid phone number' : ''}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Box>
        </Box>
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
            disabled={isAnyInputBlank(name, Bank, accno, address, phone)}
            onClick={handleSubmit}
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
  const [photoIdUrl, setPhotoIdUrl] = useState(null);
  const [photoIdFileerror, setPhotoIdFileerror] = useState(null);
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
    console.log('e', e);
    const file = e.dataTransfer.files[0];
    console.log('file', file);
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
      uploadToS3(file, 'Receipt');
      setPhotoIdFileerror('');
      // uploadToS3(file, 'photoId');
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

export default function PaymentWire() {
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
      label: 'Fill in the information',
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
      label: 'Upload proof of Payment',
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
        <Box component={'img'} src={wire} alt="logo" width={'110px'} />
      </Box>
      <Box sx={{ padding: '24px' }}>
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
