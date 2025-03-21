import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import InputField from '../../shared/TextField';
import GenericButton from '../../shared/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import darkModeLogo from '../../../../assets/authentication/darkMode_logo.svg';
import lightModeLogo from '../../../../assets/authentication/lightMode_logo.svg';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../../../assets/authentication/logogoogle.svg';
import appleLogo from '../../../../assets/authentication/ios.svg';
import iosDark from '../../../../assets/authentication/ios-dark.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  checkEmail,
  decodeJWT,
  loginWithGoogle,
} from '../../../../services/api';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      border: 'none',
      width: '100%',
    },
  },
  socialButton: {
    background: 'none !important',
    border: `1px solid ${theme.palette.divider} !important`,
    margin: '10px 0px !important',
    color: `${theme.palette.text.primary} !important`,
  },
  loginText: {
    fontSize: '32px',
    fontWeight: 600,
    color: `${theme.palette.text.primary} !important`,
    marginBottom: '30px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '15px',
  },
  logoText: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
  },
  createLink: {
    color: `${theme.palette.primary.main} !important`,
    background: `${theme.palette.background.default} !important`,
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
}));

const LoginComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setErrorMessage('');
    console.log('e', e.target.value);
    const value = e.target.value;
    setEmail(value);
    formik.setFieldValue('email', value);
    console.log('validateEmail(value)', validateEmail(value));
    setIsEmailValid(validateEmail(value));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextClick = async () => {
    if (isEmailValid) {
      setLoadings(true);
      localStorage.setItem('email', email);
      const res = await checkEmail(String(email).toLowerCase());
      console.log(res);
      if (res.status === 200 && !res.success) {
        setLoadings(false);
        navigate('/auth/login-password', { state: { email } });
      } else {
        setLoadings(false);
        setErrorMessage('Account not found');
        console.log('res', res.status);
      }
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values: ', values);
    },
  });

  const handleCreateAccountClick = () => {
    navigate('/auth/signup-email');
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    console.log('Google tokenResponse received:', tokenResponse);
    
    try {
      // Add more detailed logging
      console.log('Sending tokenResponse to backend:', tokenResponse?.access_token);
      const res = await loginWithGoogle(tokenResponse?.access_token);
      console.log('Backend response for Google login:', res);

      if (res.status === 200) {
        try {
          let resObj = await decodeJWT(res.data.access_token);
          console.log('Decoded JWT token:', resObj);
          
          // Store authentication data in localStorage
          localStorage.setItem('user', resObj?.email);
          localStorage.setItem('email', resObj?.email);
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          localStorage.setItem('userType', resObj?.userType);
          localStorage.setItem('username', resObj?.username);
          localStorage.setItem(
            'userlogged',
            resObj?.userType === 'Indexx Exchange'
              ? 'normal'
              : resObj?.userType === 'CaptainBee'
              ? 'captain'
              : 'honeyb'
          );

          // Force a page reload to ensure all components re-render with the new state
          window.location.reload();

          // Handle redirects
          let redirectUrl = window.localStorage.getItem('redirect');
          window.localStorage.removeItem('redirect');

          // Check if there's a saved route in localStorage
          const redirectRoute = localStorage.getItem('redirectRoute');
          console.log('Redirect route from localStorage:', redirectRoute);

          if (redirectRoute) {
            // Redirect to the saved route after successful login
            console.log('Redirecting to saved route:', redirectRoute);
            window.location.href = redirectRoute;
          } else {
            console.log('Redirecting to default route');
            if (redirectUrl) {
              navigate(redirectUrl);
            } else {
              window.location.href = '/update/home';
            }
          }
        } catch (jwtError) {
          console.error('Error decoding JWT:', jwtError);
          setErrorMessage('Error processing login data. Please try again.');
        }
      } else {
        console.error('Google login failed with status:', res.status);
        setErrorMessage(res.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during Google authentication:', error);
      setErrorMessage('Authentication error. Please try again later.');
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => {
      console.error('Google login error:', error);
      setErrorMessage('Login Failed: ' + (error.message || 'Unknown error'));
    },
  });

  return (
    <div className={classes.Container}>
      <div className={classes.logoContainer}>
        <img
          src={theme.palette.mode === 'light' ? lightModeLogo : darkModeLogo}
          style={{ width: '40px' }}
        />
        <h2 className={classes.logoText}>Indexx Exchange</h2>
      </div>

      <h3 className={classes.loginText}>Log in</h3>
      <div style={{ margin: '15px auto' }}>
        <InputField
          label={'Email'}
          type="text"
          value={formik.values.email}
          onChange={handleEmailChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.errors.email}
        />
        {errorMessage && <p className={classes.errorText}>{errorMessage}</p>}
      </div>
      <GenericButton
        text={'Next'}
        loading={loadings}
        disabled={!isEmailValid}
        onClick={() => {
          formik.handleSubmit();
          handleNextClick();
        }}
      />

      <div style={{ margin: '10px auto' }}></div>
      <Divider>or</Divider>
      <GenericButton
        text={'Continue with Google'}
        className={classes.socialButton}
        IconComponent={
          <img
            src={googleLogo}
            style={{ width: '100%', height: '100%', marginTop: '-8px' }}
          />
        }
        onClick={() => login()}
      />

      <div style={{ margin: '20px auto' }}></div>

      <GenericButton
        text={'Create an Indexx Account'}
        className={classes.createLink}
        onClick={handleCreateAccountClick}
      />
    </div>
  );
};

export default LoginComponent;
