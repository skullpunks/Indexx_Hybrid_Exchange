import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import loadingGif from '../../assets/beeloade.gif';

import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { baseAPIURL, getAllAffiliateUser } from '../../services/api';
import AWS from 'aws-sdk';
import { Country, State } from 'country-state-city';
import { useTheme } from '@emotion/react';

import currencyCodes from 'currency-codes';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'react-router-dom';
import frame from '../../assets/hive-dashboard/frame.svg';
import PackPurchase from './PackPurchase';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import './Signup.css';
import OpenNotification from '../OpenNotification/OpenNotification';
import InputField from '../updated/shared/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomSelectBox from './CustomSelect';
const S3_BUCKET = 'indexx-exchange';
const REGION = 'ap-northeast-1';
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: REGION,
});
var s3 = new AWS.S3();

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200, // Adjust the width as needed
  },
  select: {
    fontSize: 16, // Adjust the font size as needed
    height: 40, // Adjust the height as needed
  },
  customTooltip: {
    backgroundColor: 'red', // Change this to your desired background color
    color: 'white', // Change this to the text color you prefer
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#FFB300',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

const Signup = () => {
  const [referral] = useSearchParams();
  const refcode = String(referral.get('referral'));

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [Email, setEmail] = useState('');
  const [ssn, setssn] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [Phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [states, setStates] = useState([]);
  const [Zip, setZip] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [countryCodes, setCountryCodes] = useState([]);

  const [country, setCountry] = useState('United States');
  const [code, setCode] = useState('+1'); // United States country code
  const [Currency, setCurrency] = useState('USD'); // Default currency
  const [accname, setAccname] = useState('');
  const [Website, setWebsite] = useState('');
  const [protocol, setProtocol] = useState('');
  const countries = Country.getAllCountries();
  const currencies = currencyCodes.codes();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [ssnError, setSSNError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [frontFile, setFrontFile] = useState(null);
  const [frontFileurl, setFrontFileurl] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [backFileurl, setBackFileurl] = useState(null);
  const [photoIdFile, setPhotoIdFile] = useState(null);
  const [photoIdFileurl, setPhotoIdFileurl] = useState(null);
  // const [profile, setProfile] = useState(null)

  // const [referralCode, setreferralCode] = useState(refcode);
  const [Captain, setCaptain] = useState('');
  const [captainbees, setCaptainBees] = useState();
  const [ein, setein] = useState('');
  // const [showEIN, setShowEIN] = useState(false);
  const [einError, setEINError] = useState('');
  const [selnumber, setSelnumber] = useState('SSN');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [seltheme, setSeltheme] = useState(
    localStorage.getItem('selectedTheme') || 'dark'
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      setSeltheme(event.currentTarget.localStorage.selectedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    getAllAffiliateUser().then((data) => {
      setCaptainBees(data);
    });
  }, []);

  useEffect(() => {
    if (refcode !== 'null' || refcode !== 'undefined') {
      if (captainbees !== undefined) {
        const filter = captainbees?.filter((item) => {
          return item?.userData?.referralCode === refcode;
        });
        setCaptain(filter[0]?.userData?.referralCode);
      }
    }
  }, [refcode, captainbees]);

  const handleDropFront = (e) => {
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
        OpenNotification('error', 'File must be a JPEG or PNG image or PDF');
        return;
      }

      setFrontFile(file);
      uploadToS3(file, 'front');
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const handleDropBack = (e) => {
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
        OpenNotification('error', 'File must be a JPEG or PNG image or PDF');
        return;
      }

      setBackFile(file);
      uploadToS3(file, 'back');
    }
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
      const allowedExtensions = ['jpeg', 'jpg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        OpenNotification('error', 'File must be a JPEG or PNG image');
        return;
      }

      setPhotoIdFile(file);
      uploadToS3(file, 'photoId');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowSSN = () => {
    setShowSSN(!showSSN); // Toggle the showSSN state
  };

  // Helper function to format SSN with hyphens
  const formatSSN = (ssn) => {
    if (ssn.length === 9) {
      return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`;
    }
    return ssn;
  };

  const formatEIN = (ein) => {
    if (ein.length === 9) {
      return `${ein.slice(0, 2)}-${ein.slice(2)}`;
    }
    return ein;
  };

  const validateEmail = async (mail) => {
    // console.log(Email, "email");
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    setEmailError(isValid ? '' : 'Invalid email address');
    // if email is valid then we go and check that email is already used
    // if(isValid){
    // await checkEmailExist(mail);
    // }
    return isValid;
  };

  const validateUsername = async (usname) => {
    console.log(usname, Username, 'username');
    const isValid = usname.trim() !== '';
    setUsernameError(isValid ? '' : 'Username cannot be empty');
    // if(isValid){
    //   await checkUserNameExist(usname);
    //   }
    return isValid;
  };

  const validatePassword = (passwd) => {
    const isValid = passwd.length >= 8;
    setPasswordError(isValid ? '' : 'Password must be at least 8 characters');
    return isValid;
  };

  const validateConfirmPassword = (confpass) => {
    const isValid = confpass === password;
    setConfirmPasswordError(isValid ? '' : 'Passwords do not match');
    return isValid;
  };

  const validateSSN = (vssn) => {
    const ssnWithoutHyphens = vssn.replace(/-/g, ''); // Remove hyphens
    const isValid = /^\d{9}$/.test(ssnWithoutHyphens);
    if (!isValid) {
      setSSNError('Invalid SSN (9 digits)');
    } else {
      setSSNError('');
      // Add hyphens back if they are missing
      setssn(formatSSN(ssnWithoutHyphens));
    }
    if (vssn === '' && validateEIN(ein)) {
      setSSNError('');
      return true;
    }
    return isValid;
  };

  const validateEIN = (vein) => {
    const einWithoutHyphens = vein.replace(/-/g, ''); // Remove hyphens
    const isValid = /^\d{9}$/.test(einWithoutHyphens);
    if (!isValid) {
      setEINError('Invalid EIN (9 digits)');
    } else {
      setEINError('');
      // Add hyphens back if they are missing
      setein(formatEIN(einWithoutHyphens));
    }
    return isValid;
  };

  useEffect(() => {
    if (country) {
      const countryInfo = countries.find((c) => c.name === country);
      const countryStates = State.getStatesOfCountry(countryInfo.isoCode);
      setStates(countryStates);
    }
  }, [country, countries]);

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
      if (fileType === 'front') {
        setFrontFileurl(url);
      } else if (fileType === 'back') {
        setBackFileurl(url);
      } else {
        setPhotoIdFileurl(url);
      }
    } catch (error) {
      console.log('Error here', error);
      alert('Error uploading file:', error);
    }
  };

  const resetForm = () => {
    setFirstname('');
    setLastname('');
    setUsername('');
    setEmail('');
    setssn('');
    setein('');
    setCode('');
    setPhone('');
    setCountry('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setZip('');
    setPassword('');
    setConfirmpass('');
    setCurrency('');
    setFrontFile(null);
    setBackFile(null);
    setPhotoIdFile(null);
    setFrontFileurl(null);
    setBackFileurl(null);
    setPhotoIdFileurl(null);
    setAccname('');
    setWebsite('');
    setProtocol('');
    // setreferralCode("");
    setCaptain('');
    // If you're also fetching states dynamically based on the country, you might want to reset that as well
    setStates([]);
    // Similarly for country codes, if you're fetching them dynamically:
    //setCountryCodes([]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Validate input fields before submitting
    const isEmailValid = validateEmail(Email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmpass);
    const isSSNValid = validateSSN(ssn) || validateEIN(ein);

    console.log(
      firstname.trim() === '' ||
      lastname.trim() === '' ||
      //Email.trim() === '' ||
      //(ssn.trim() === '' && ein.trim() === '') ||
      password.trim() === '' ||
      confirmpass.trim() === '' ||
      //country.trim() === '' ||
      //Phone.trim() === '' ||
      //Currency.trim() === '' ||
      isChecked === false ||
      Captain === ''
    )
    if (
      firstname.trim() === '' ||
      lastname.trim() === '' ||
      //Email.trim() === '' ||
      //(ssn.trim() === '' && ein.trim() === '') ||
      password.trim() === '' ||
      confirmpass.trim() === '' ||
      //country.trim() === '' ||
      //Phone.trim() === '' ||
      //Currency.trim() === '' ||
      isChecked === false ||
      Captain === ''
    ) {
      alert(
        'Please fill in all required fields and check the checkbox before submitting.'
      );
      setIsLoading(false);
    } else if (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isSSNValid &&
      isChecked
    ) {
      try {
        const response = await axios.post(
          `${baseAPIURL}/api/v1/affiliate/convertnormalUser`,
          {
            firstname,
            lastname,
            Username,
            Email,
            ssn,
            code,
            Phone,
            country,
            address1,
            address2,
            city,
            state,
            Zip,
            password,
            confirmpass,
            Currency,
            photoIdFileurl,
            frontFileurl,
            backFileurl,
            accname,
            Website,
            protocol,
            referralCode: Captain,
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          setIsModalOpen(true);
          // alert('User Created');
          resetForm();
        }
      } catch (err) {
        alert(err.response.data.message);
        setIsLoading(false);
      }
    } else {
      alert('Please fix the validation errors before submitting.');
      setIsLoading(false);
    }
  };

  const handleCaptainChange = (event) => {
    setCaptain(event.target.value);
  };

  const items = captainbees?.map((bee) => ({
    name: (
      <LightTooltip
        title={
          <a
            href={`https://hive.indexx.ai/captainbee/${bee.Username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textTransform: 'none',
              color: 'var(--main_body)',
              fontSize: 15,
            }}
          >
            Click to view {bee.accname}
          </a>
        }
        placement="right"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            minWidth: '100%',
          }}
        >
          <Box
            sx={{
              minWidth: '40px',
              minHeight: '40px',
              backgroundImage: `url(${frame})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            {bee?.photoIdFileurl && (
              <Box className="drop-hexagon">
                <img
                  alt=""
                  src={bee?.photoIdFileurl}
                  width={'30px'}
                  height={'31px'}
                  style={{ border: 'none' }}
                />
              </Box>
            )}
          </Box>
          <Box alignSelf={'center'} ml={2}>
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              textAlign={'center'}
            >
              {bee?.accname}
            </Typography>
          </Box>
          <Box alignSelf={'center'} ml={'auto'}>
            <Typography
              variant="text"
              fontSize={'15px'}
              fontWeight={400}
              textAlign={'center'}
            >
              Referral Code : {bee?.userData?.referralCode}
            </Typography>
          </Box>
        </Box>
      </LightTooltip>
    ),
    value: bee?.userData?.referralCode,
  }));

  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          maxWidth: '1520px',
          margin: '50px auto',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            maxWidth: '1000px',
            margin: 'auto',
          }}
        >
          <Typography
            variant="text"
            fontSize={isMobile ? '20px' : '30px'}
            fontWeight={600}
          >
            Captain Bee Information
          </Typography>

          <Box
            sx={{
              my: 2,
              width: '100%',
            }}
          >
            <div style={{ width: '100%' }}>
              {' '}
              <Typography
                variant="text"
                fontSize={isMobile ? '15px' : '18px'}
                fontWeight={400}
                textAlign={'left'}
              >
                First Name
              </Typography>
              <InputField
                placeholder="First Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
                size="small" // Make the input box smaller
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div>
              <Typography
                variant="text"
                fontSize={isMobile ? '15px' : '18px'}
                fontWeight={400}
                textAlign={'left'}
              >
                Last Name
              </Typography>
              <InputField
                placeholder="Last Name"
                sx={{ mb: 2 }}
                size="small" // Make the input box smaller
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
          </Box>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Typography
              variant="text"
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              textAlign={'left'}
            >
              Password
            </Typography>

            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              size="small"
              value={password}
              error={passwordError !== ''}
              sx={{ mb: 2 }}
              helperText={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <span
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </span>
                </InputAdornment>
              }
            />
          </Box>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Typography
              variant="text"
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              textAlign={'left'}
            >
              Password (Confirm)
            </Typography>
            <InputField
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Password (Confirm)"
              size="small"
              value={confirmpass}
              error={confirmPasswordError !== ''}
              helperText={confirmPasswordError}
              onChange={(e) => {
                setConfirmpass(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <span
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </span>
                </InputAdornment>
              }
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: 7,
            maxWidth: '1000px',
            margin: '50px auto',
          }}
        >
          <Typography
            variant="text"
            fontSize={isMobile ? '20px' : '30px'}
            fontWeight={600}
            mb={2}
          >
            HoneyComb/Franchise Information
          </Typography>

          <Box
            sx={{
              width: '100%',
              my: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Account Display Name
            </Typography>
            <InputField
              placeholder="Brian’s HoneyComb"
              sx={{ mb: 2 }}
              size="small" // Make the input box smaller
              value={accname}
              onChange={(e) => {
                setAccname(e.target.value);
              }}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              mb: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Personal Website (Optional)
            </Typography>

            <InputField
              placeholder="www.yourwebsite.com"
              sx={{ mb: 2 }}
              size="small" // Make the input box smaller
              value={Website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </Box>

          <Box
            sx={{
              width: '100%',
              mb: 2,
            }}
          >
            <Typography
              variant="text"
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              textAlign={'left'}
            >
              Select your Captain Bee
            </Typography>
            <div style={{ margin: '15px' }}></div>
            <CustomSelectBox
              items={items}
              type="Select Captain Bee"
              onChange={handleCaptainChange}
              value={Captain}
              isCurrency={false}
              hasborder={true}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            }
            label=<Typography
              textAlign={'left'}
              fontSize={isMobile ? '14px' : '16px'}
              variant="text"
            >
              I have carefully reviewed the{' '}
              <a
                href="https://docdro.id/Qq6OhD4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{' '}
              as well as the{' '}
              <a
                href="https://docdro.id/j3fmLQe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rules and Regulations
              </a>
              , and I hereby express my agreement with all stipulations outlined
              therein.
            </Typography>
            sx={{ mb: 8 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked2}
                onChange={(e) => setIsChecked2(e.target.checked)}
              />
            }
            label=<Typography
              variant="text"
              textAlign={'left'}
              fontSize={isMobile ? '14px' : '16px'}
            >
              By proceeding with our services, you affirm that you are at least
              18 years old and meet the required age for engaging in activities
              such as purchasing cryptocurrencies or stocks.
            </Typography>
            sx={{ mb: 8 }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disableTouchRipple
            disabled={
              !isChecked ||
              !isChecked2 ||
              // !frontFile ||
              // !backFile ||
              // !photoIdFile ||
              isLoading
            }
            sx={{
              backgroundColor: '#FFB300',
              borderRadius: '2px',
              color: '#282828',
              width: '100%',
              px: 10,
              py: 1,
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 700,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#FFD000',
                boxShadow: 'none',
              },
            }}
          >
            Submit
          </Button>
          {isLoading && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 995,
                pointerEvents: 'none',
              }}
            >
              <img src={loadingGif} alt="Loading" />
              <p
                style={{
                  marginTop: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Please wait while the form submits
                <span className="dots-animation"></span>
              </p>
            </div>
          )}
        </Box>
        <div>
          <PackPurchase
            isVisible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </Box>
    </>
  );
};

export default Signup;
