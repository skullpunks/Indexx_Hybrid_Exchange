import React, { useEffect, useRef, useState } from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  resendEmailCode,
  sendOtp,
  validateOtp,
} from '../../../../../services/api';
import { useNavigate } from 'react-router-dom';

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
    '& h4': {
      color: `${theme.palette.text.secondary} !important`,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      marginBottom: '50px',
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
  messageText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
  successText: {
    color: theme.palette.success.main,
    marginTop: '8px',
  },
}));

const SignUpEmailVerification = ({ email }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const isEffectRun = useRef(false);

  const validationSchema = Yup.object({
    verificationCode: Yup.number()
      .test(
        'len',
        'Must be exactly 6 digits',
        (val) => val && val.toString().length === 6
      )
      .required('Verification code is required'),
  });

  const formik = useFormik({
    initialValues: {
      verificationCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await validateOtpCode(values.verificationCode, email);
    },
  });

  useEffect(() => {
    if (isEffectRun.current) return;
    async function sendOtpCode() {
      setLoadings(true);
      const res = await sendOtp(email);
      if (res.status === 200) {
        setOtpSent(true);
        setMessage('Verification code sent.');
      } else {
        setMessage('Failed to send verification code.');
      }
      setLoadings(false);
    }
    sendOtpCode();
    isEffectRun.current = true;
  }, [email]);

  async function validateOtpCode(code, email) {
    try {
      setLoadings(true);
      let res = await validateOtp(email, code);
      if (res.status === 200) {
        setMessage('Email verified successfully.');
        setLoadings(false);
        navigate('/auth/signup-create-password', { state: { email } });
      } else {
        setMessage('Failed to verify email.');
        setLoadings(false);
      }
    } catch (err) {
      setMessage('Failed to verify email.');
      setLoadings(false);
    }
  }

  const otpResend = async () => {
    try {
      setLoadings(true);
      const res = await sendOtp(email);
      if (res.status === 200) {
        setOtpSent(true);
        setMessage('Verification code resent.');
      } else {
        setMessage('Failed to resend verification code.');
      }
      setLoadings(false);
    } catch (err) {
      setMessage('Failed to resend verification code.');
      setLoadings(false);
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.logoContainer}>
        <img
          src={theme.palette.mode === 'light' ? lightModeLogo : darkModeLogo}
          style={{ width: '40px' }}
        />
        <h2 className={classes.logoText}>Indexx Exchange</h2>
      </div>

      <h3 className={classes.loginText}>Verify your email</h3>
      <h4>
        Please enter the 6-digit verification code that was sent to {email}. The
        code is valid for 30 minutes.
      </h4>
      <div style={{ margin: '15px auto 25px auto' }}>
        <InputField
          label={'Verification Code'}
          type="text"
          {...formik.getFieldProps('verificationCode')}
          error={
            formik.touched.verificationCode && formik.errors.verificationCode
          }
          helperText={formik.errors.verificationCode}
        />
        {message && (
          <p
            className={
              message.includes('Failed')
                ? classes.messageText
                : classes.successText
            }
          >
            {message}
          </p>
        )}
      </div>

      <GenericButton
        onClick={formik.handleSubmit}
        text={'Next'}
        loading={loadings}
      />
      <div style={{ margin: '20px auto' }}></div>

      <GenericButton
        text={'Didn’t receive the code?'}
        className={classes.createLink}
        onClick={otpResend}
        loading={loadings}
      />
    </div>
  );
};

export default SignUpEmailVerification;
