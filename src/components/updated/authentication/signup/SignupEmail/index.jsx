import React from 'react';
import { makeStyles } from '@mui/styles';
import InputField from '../../../shared/TextField';
import GenericButton from '../../../shared/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import darkModeLogo from '../../../../../assets/authentication/darkMode_logo.svg';
import lightModeLogo from '../../../../../assets/authentication/lightMode_logo.svg';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../../../../assets/authentication/logogoogle.svg';
import appleLogo from '../../../../../assets/authentication/ios.svg';
import iosDark from '../../../../../assets/authentication/ios-dark.svg';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleLogin } from '@react-oauth/google';
import { baseURL, checkEmail, signupWithGoogle } from '../../../../../services/api';

const useStyles = makeStyles((theme) => ({
  Container: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '24px',
    minHeight: '580px',
    padding: '40px',
    maxWidth: '425px',
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
    fontSize: '28px',
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
  termsAndCondition: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
    '& a': {
      color: `${theme.palette.text.primary} !important`,
      fontSize: '14px',
      textDecoration: 'underline',
    },
    marginBottom: '15px',
  },
  alreadyAccount: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: '14px',
    textAlign: 'center',
    '& a': {
      color: `${theme.palette.primary.main} !important`,
      fontSize: '14px',
      // textDecoration: 'underline',
    },
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
}));

const SignUpEmail = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loadings, setLoadings] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

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
      setLoadings(true);
      await checkEmailIfRegister(values.email);
    },
  });

  const checkEmailIfRegister = async (emailid) => {
    const res = await checkEmail(String(emailid).toLowerCase());
    console.log(res);
    if (res.status === 200 && !res.success) {
      setErrorMessage('This account already exists. please log in.');
      setLoadings(false);
      return;
    }
    setLoadings(false);
    console.log('res', res.status);
    navigate('/auth/signup-email-verification', {
      state: { email: emailid },
    });
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    console.log('Google signup tokenResponse received:', tokenResponse);
    
    try {
      console.log('Sending Google token to backend for signup:', tokenResponse?.access_token);
      const res = await signupWithGoogle(tokenResponse?.access_token);
      console.log('Backend response for Google signup:', res);

      if (res.status === 200) {
        console.log('Google signup successful, redirecting to login');
        window.location.href = `${baseURL}/auth/login?redirectWebsiteLink=exchange`;
      } else {
        console.error('Google signup failed with response:', res);
        setErrorMessage(res.data || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during Google signup:', error);
      setErrorMessage('Signup error. Please try again later.');
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => {
      console.error('Google signup error:', error);
      setErrorMessage('Signup Failed: ' + (error.message || 'Unknown error'));
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

      <h3 className={classes.loginText}>Welcome to Indexx Exchange</h3>
      <div style={{ margin: '15px auto' }}>
        <InputField
          label={'Email'}
          type="text"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.errors.email}
        />
        {errorMessage && <p className={classes.errorText}>{errorMessage}</p>}
      </div>
      <p className={classes.termsAndCondition}>
        By creating an account, I agree to Indexx's{' '}
        <Link>Terms of Service</Link> and <Link>Privacy Policy.</Link>
      </p>

      <GenericButton
        text={'Next'}
        onClick={formik.handleSubmit}
        loading={loadings}
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

      <p className={classes.alreadyAccount}>
        Already have an account? <Link to="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUpEmail;
