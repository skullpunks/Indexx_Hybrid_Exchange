import React from 'react';

import { makeStyles } from '@mui/styles';
import InputField from '../../../shared/TextField';
import GenericButton from '../../../shared/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import darkModeLogo from '../../../../../assets/authentication/darkMode_logo.svg';
import lightModeLogo from '../../../../../assets/authentication/lightMode_logo.svg';

import googleLogo from '../../../../../assets/authentication/logogoogle.svg';
import appleLogo from '../../../../../assets/authentication/ios.svg';
import iosDark from '../../../../../assets/authentication/ios-dark.svg';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
}));

const SignUpEmail = () => {
  const classes = useStyles();
  const theme = useTheme();
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
          label={'Email/Phone number'}
          type="text"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.errors.email}
        />
      </div>
      <p className={classes.termsAndCondition}>
        By creating an account, I agree to Indexx's{' '}
        <Link>Terms of Service</Link> and <Link>Privacy Policy.</Link>
      </p>

      <GenericButton text={'Next'} onClick={formik.handleSubmit} />
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
      />
      <div style={{ margin: '20px auto' }}></div>

      <p className={classes.alreadyAccount}>
        Already have an account? <Link>Login</Link>
      </p>
    </div>
  );
};

export default SignUpEmail;