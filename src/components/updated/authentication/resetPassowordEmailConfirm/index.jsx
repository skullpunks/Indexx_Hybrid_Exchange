import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import InputField from '../../shared/TextField';
import GenericButton from '../../shared/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validateForgotOtp } from '../../../../services/api';

const useStyles = makeStyles((theme) => ({
  Container: {
    maxWidth: '1280px',
    margin: '50px auto',
    padding: '10px 20px',
  },
  header: {
    height: '80px',
    padding: '0px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      padding: '0px 0px',
    },
  },
  link: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '28px',
    color: `${theme.palette.text.secondary} !important`,
    '&:hover': {
      color: `${theme.palette.text.primary} !important`,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  contentContent: {
    display: 'flex',
  },
  leftEmpty: {
    flexBasis: '20%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  rightContainer: {
    flexBasis: '80%',
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  rightContentContainer: {
    maxWidth: '384px',
    '& h3': {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
      color: `${theme.palette.text.primary} !important`,
      [theme.breakpoints.down('sm')]: {
        fontSize: '26px',
      },
    },
    '& h4': {
      color: `${theme.palette.text.secondary} !important`,
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      marginBottom: '50px',
    },
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '8px',
  },
}));

const obfuscateEmail = (email) => {
  const [localPart, domain] = email.split('@');
  const visibleChars = Math.min(3, localPart.length);
  const obfuscatedLocalPart =
    localPart.slice(0, visibleChars) +
    '*'.repeat(localPart.length - visibleChars);
  const [domainName, domainExtension] = domain.split('.');
  const obfuscatedDomain =
    domainName.slice(0, visibleChars) +
    '*'.repeat(domainName.length - visibleChars) +
    '.' +
    domainExtension;
  return `${obfuscatedLocalPart}@${obfuscatedDomain}`;
};

const ResetPasswordEmailConfirm = ({ email, onOtpVerified }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    verificationCode: Yup.number()
      .test(
        'len',
        'Must be exactly 6 digits',
        (val) => val && val.toString().length === 6
      )
      .required('Verification code is required'),
  });

  const obfuscatedEmail = obfuscateEmail(email);

  const formik = useFormik({
    initialValues: {
      verificationCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await validateForgotOtp(email, values.verificationCode);
      if (res.status === 200) {
        onOtpVerified();
      } else {
        setErrorMessage('Your email verification code is wrong');
      }
    },
  });

  return (
    <div className={classes.Container}>
      <div className={classes.header}>
        <Link className={classes.link} to="/auth/login-password">
          &lt; Back
        </Link>
      </div>
      <div className={classes.contentContent}>
        <div className={classes.leftEmpty}></div>
        <div className={classes.rightContainer}>
          <div className={classes.rightContentContainer}>
            <h3>Email Verification</h3>
            <h4>Enter the 6-digit code sent to {obfuscatedEmail}</h4>
            <InputField
              label={'Email Verification Code'}
              {...formik.getFieldProps('verificationCode')}
              error={
                formik.touched.verificationCode &&
                formik.errors.verificationCode
              }
              helperText={formik.errors.verificationCode}
            />
            {errorMessage && (
              <p className={classes.errorText}>{errorMessage}</p>
            )}
            <div style={{ margin: '25px 0px' }}></div>
            <GenericButton text="Submit" onClick={formik.handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordEmailConfirm;
