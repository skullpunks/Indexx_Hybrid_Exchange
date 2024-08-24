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
} from '@mui/material';
import banner from '../../assets/Registration.svg';
import loadingGif from '../../assets/beeloade.gif';
import tick from '../../assets/arts/pay/tick.svg';
import banner_dark from '../../assets/Registration_dark.svg';
import banner_mobile from '../../assets/Registration_mobile.svg';
import banner_mobile_dark from '../../assets/Registration_mobile_dark.svg';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { baseAPIURL } from '../../services/api';
import AWS from 'aws-sdk';
import { Country, State } from 'country-state-city';
import { useTheme } from '@emotion/react';
// import metadata from 'libphonenumber-js/metadata.min.json';
// import { getCountryCallingCode } from 'libphonenumber-js';
import currencyCodes from 'currency-codes';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'react-router-dom';
import frame from '../../assets/hive-dashboard/frame.svg';
import PackPurchase from './PackPurchase';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import './Signup.css';
import OpenNotification from '../OpenNotification/OpenNotification';
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

  // useEffect(() => {
  //   getAllAffiliateUser().then((data) => {
  //     setCaptainBees(data);
  //   })
  // }, [])

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

  // const handleShowEIN = () => {
  //   setShowEIN(!showEIN); // Toggle the showSSN state
  // };

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

  const handleFrontFileChange = (event) => {
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
        OpenNotification('error', 'File must be a JPEG or PNG image or PDF');
        return;
      }

      setFrontFile(file);
      uploadToS3(file, 'front');
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

  const handleBackFileChange = (event) => {
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
        OpenNotification('error', 'File must be a JPEG or PNG image or PDF');
        return;
      }

      setBackFile(file);
      uploadToS3(file, 'back');
    }
  };

  // useEffect(() => {
  //   const supportedCountries = Object.keys(metadata.countries);

  //   const phoneCodes = supportedCountries.map(country => ({
  //     code: '+' + getCountryCallingCode(country),
  //     country: country
  //   }));

  //   setCountryCodes(phoneCodes);
  // }, []);

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

  // const checkUserNameExist = async (usname) => {
  //   const res = await checkUserName(String(usname).toLowerCase());
  //   console.log(res);

  //   if (res && !res.success) {
  //     // Set the error message if username check fails
  //     setUsernameError(res.data);
  //   } else {
  //     // Clear any existing error message if the username check is successful
  //     setUsernameError('');
  //   }
  // }

  // const checkEmailExist = async (mail) => {
  //   const res = await checkEmail(String(mail).toLowerCase());
  //   console.log(res);

  //   if (res && !res.success) {
  //     console.log("res.data", res.data)
  //     // Set the error message if username check fails
  //     setEmailError(res.data);
  //   } else {
  //     // Clear any existing error message if the username check is successful
  //     setEmailError('');
  //   }
  // }

  const handleSubmit = async () => {
    setIsLoading(true);
    // Validate input fields before submitting
    const isEmailValid = validateEmail(Email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmpass);
    const isSSNValid = validateSSN(ssn) || validateEIN(ein);

    if (
      firstname.trim() === '' ||
      lastname.trim() === '' ||
      Username.trim() === '' ||
      Email.trim() === '' ||
      (ssn.trim() === '' && ein.trim() === '') ||
      password.trim() === '' ||
      confirmpass.trim() === '' ||
      country.trim() === '' ||
      Phone.trim() === '' ||
      Currency.trim() === '' ||
      isChecked === false ||
      Captain === ''
    ) {
      alert(
        'Please fill in all required fields and check the checkbox before submitting.'
      );
    } else if (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isSSNValid &&
      isChecked
    ) {
      try {
        const response = await axios.post(
          `${baseAPIURL}/api/v1/affiliate/adduser`,
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

  const classes = useStyles();

  return (
    <>
      <Box
        mt={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // maxWidth:"1520px",
        }}
      >
        {/* <Box
          component="img"
          src={
            isMobile
              ? seltheme === 'dark'
                ? banner_mobile_dark
                : banner_mobile
              : seltheme === 'dark'
              ? banner_dark
              : banner
          }
          width={isMobile ? '100%' : 'auto'}
          alt=""
          mt={8}
          mb={4}
        /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: `${isMobile ? '85%' : '48%'}`,
            // width:"48%",
            maxWidth: '1520px',
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
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Name
            </Typography>
            <TextField
              //   label="First Name"
              placeholder="First Name"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2, width: '31.2%' }}
              size="small" // Make the input box smaller
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
            <TextField
              //   label="Last Name"
              placeholder="Last Name"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2, width: '31.2%' }}
              size="small" // Make the input box smaller
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
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
            }}
          >
            <Typography
              variant="text"
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Password
            </Typography>

            <TextField
              //   label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              InputLabelProps={{ shrink: true }}
              sx={{
                mb: 2,
                width: '54.27%',
                '& input:invalid': {
                  borderColor: 'red',
                },
              }}
              size="small"
              value={password}
              error={passwordError !== ''}
              helperText={passwordError}
              // onBlur={validatePassword}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
            />
            <Button
              onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
              variant="text"
              disableTouchRipple
              sx={{
                color: '#FFB300',
                textTransform: 'none',
                fontSize: '13px',
                backgroundColor: 'none',
                '&:hover': {
                  backgroundColor: 'none',
                },
                // border:"1px solid black",
                py: 1,
                width: '9%',
                minWidth: `${isMobile ? '25px' : '64px'}`,
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
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
              Password (Confirm)
            </Typography>
            <TextField
              //   label="Password (Confirm)"
              variant="outlined"
              placeholder="Password (Confirm)"
              type={showConfirmPassword ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              sx={{
                mb: 2,
                width: '54.27%',
                '& input:invalid': {
                  borderColor: 'red',
                },
              }}
              size="small" // Make the input box smaller
              value={confirmpass}
              error={confirmPasswordError !== ''}
              helperText={confirmPasswordError}
              // onBlur={validateConfirmPassword}
              onChange={(e) => {
                setConfirmpass(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
            />
            <Button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle show/hide confirm password
              variant="text"
              disableTouchRipple
              sx={{
                color: '#FFB300',
                textTransform: 'none',
                fontSize: '13px',
                backgroundColor: 'none',
                '&:hover': {
                  backgroundColor: 'none',
                },
                // border:"1px solid black",
                py: 1,
                width: '9%',
                minWidth: `${isMobile ? '25px' : '64px'}`,
              }}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Button>
          </Box>
          {/* <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "100%",
        mb: 2
      }}>
        <Typography variant="text" fontSize={isMobile ? "15px" : "18px"} fontWeight={400} width={"35%"} textAlign={"left"}>
          Employer Identification Number
        </Typography>
        <TextField
          variant="outlined"
          placeholder='Enter EIN here'
          type={showEIN ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2, width: '54.27%' }}
          size="small"
          value={showEIN ? formatEIN(ein) : ein}
          error={einError !== ''}
          helperText={einError}
          onBlur={validateEIN}
          onChange={(e) => {
            setein(e.target.value);
          }}
        />
        <Button
          onClick={handleShowEIN} // Toggle show/hide SSN
          variant="text"
          disableTouchRipple
          sx={{
            color: "#FFB300",
            textTransform: "none",
            fontSize: "13px",
            backgroundColor:"transparent",
            // border:"1px solid black",
            py:1,
            width:"9%",
            minWidth :  `${isMobile ? "25px" : "64px"}`,
          }}
        >
          {showEIN ? 'Hide' : 'Show'}
        </Button>
      </Box> */}

          {/* <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "100%",
            mb: 2,
            gap: 1
          }}>
            <Typography variant="text" fontSize={isMobile ? "15px" : "18px"} fontWeight={400} width={"100%"} textAlign={"left"}>
              Attach Photo ID (jpeg, png, pdf)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '550px' }}
                size="small"
                value={photoIdFile?.name || ''}
                readOnly // Prevent users from editing the filename
              />
              <Input
                type="file"
                onChange={handlePhotoIdFileChange}
                style={{ display: 'none' }}
                id="photoFileInput"
              />
              <label htmlFor="photoFileInput">
                <Button variant="outlined" component="span"
                  disableTouchRipple
                  sx={{
                    borderColor: "#FFB300",
                    borderRadius: "4px",
                    color: "#282828",
                    px: 10,
                    py: 1,
                    textTransform: "none",
                    fontSize: "13px",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      borderColor: "#FFA200",
                      boxShadow: "none",
                    },
                  }}
                >
                  Browse Photo ID
                </Button>
              </label>
            </Box>

          </Box> */}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: `${isMobile ? '85%' : '48%'}`,
            // width: "48%",
            mt: 7,
            maxWidth: '1520px',
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
              fontSize={isMobile ? '15px' : '18px'}
              fontWeight={400}
              width={'35%'}
              textAlign={'left'}
            >
              Account Display Name
            </Typography>
            <TextField
              //   label="Account Name"
              variant="outlined"
              placeholder="Brian’s HoneyComb"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2, width: '64%' }}
              size="small" // Make the input box smaller
              value={accname}
              onChange={(e) => {
                setAccname(e.target.value);
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
            {/* <Select
            value={protocol}
            onChange={(e) => {
              setProtocol(e.target.value);
            }}
            sx={{ mb: 2, width: '15%' }}
            className={classes.select}
          >
            <MenuItem value="">Select protocol</MenuItem>
            <MenuItem value="http">http</MenuItem>
            <MenuItem value="https">https</MenuItem>
          </Select> */}
            <TextField
              //   label="Website Link"
              variant="outlined"
              placeholder="www.yourwebsite.com"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2, width: '64%' }}
              size="small" // Make the input box smaller
              value={Website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </Box>

          {/* <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "100%",
            mb: 2
          }}>

          <Typography variant="text" fontSize={isMobile ? "15px" : "18px"} fontWeight={400} width={"35%"} textAlign={"left"}>
            Captain Bee Referral Code
          </Typography>
          <TextField
            //   label="Email"
            placeholder='Referral Code'
            type='email'
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={{ mb: 2, width: '64%' }}
            size="small" // Make the input box smaller
            value={referralCode === "null" ? "" : referralCode}
            onChange={(e) => {
              setreferralCode(e.target.value);
            }}
          />
        </Box> */}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
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
              Select your Captain Bee
            </Typography>
            <Select
              value={Captain}
              onChange={(e) => {
                setCaptain(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 6, width: '64%' }}
              size="small" // Make the input box smaller
              required={true}
              MenuProps={{ classes: { paper: 'custom-sel' } }}
            >
              <MenuItem value="">Select Captain Bee</MenuItem>
              {captainbees?.map((bee, id) => (
                <MenuItem key={id} value={bee?.userData?.referralCode}>
                  <LightTooltip
                    title={
                      <a
                        href={`/captainbee/${bee.Username}`}
                        target="blank"
                        style={{
                          textTransform: 'none',
                          color: 'var(--main_body)',
                          fontSize: 15,
                        }}
                        classes={{ tooltip: classes.customTooltip }}
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
                          // border:"none"
                        }}
                      >
                        {bee?.photoIdFileurl === null ||
                        bee?.photoIdFileurl === undefined ? null : (
                          <Box className="drop-hexagon">
                            <img
                              alt=""
                              // src={abcd}
                              src={bee?.photoIdFileurl}
                              // src={(collection?.photoIdFileurl === undefined || collection?.photoIdFileurl === null) ? frame : collection?.photoIdFileurl}
                              width={'30px'}
                              height={'31px'}
                              ml={'-2px'}
                              border={'none'}
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
                          style={{ verticalAlign: 'center' }}
                        >
                          {bee?.accname}

                          {/* {bee?.firstname + " " + bee?.lastname} */}
                        </Typography>
                      </Box>
                      <Box alignSelf={'center'} ml={'auto'}>
                        <Typography
                          variant="text"
                          fontSize={'15px'}
                          fontWeight={400}
                          textAlign={'center'}
                          style={{ verticalAlign: 'center' }}
                        >
                          Referral Code : {bee?.userData?.referralCode}
                        </Typography>
                      </Box>
                    </Box>
                  </LightTooltip>
                </MenuItem>
              ))}
            </Select>
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

          {/* <Button
            variant='contained'
            onClick={handleSubmit}
            disableTouchRipple
            disabled={!isChecked || !isChecked2 || !frontFile || !backFile || !photoIdFile} // Disable if frontFile is null
            sx={{
              backgroundColor: "#FFB300",
              borderRadius: "2px",
              color: "#282828",
              width: "100%",
              px: 10,
              py: 1,
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 700,
              boxShadow: "none",
              //   mt:3,
              "&:hover": {
                backgroundColor: "#FFD000",
                boxShadow: "none",
              },
            }}
          >
            Submit
          </Button> */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disableTouchRipple
            disabled={
              !isChecked ||
              !isChecked2 ||
              !frontFile ||
              !backFile ||
              !photoIdFile ||
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
